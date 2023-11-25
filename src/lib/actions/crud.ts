import { GetColumnData, InferColumnsDataTypes, InferInsertModel, InferModelFromColumns, InferSelectModel, eq } from "drizzle-orm";
import { action, authAction } from ".";
import { BuildInsertSchema, createInsertSchema, createSelectSchema } from "drizzle-zod";
import { PgColumn, PgInsertValue, PgTable, PgUpdateSetSource, } from "drizzle-orm/pg-core";
import { z } from "zod";

type KeyOfType<T, V> = keyof {
    [P in keyof T as T[P] extends V ? P : never]: any
}

export function getCRUDActions<
    TTable extends PgTable,
    TTableKey extends KeyOfType<TTable, TPKeyColumn>,
    TPKeyColumn extends TTable[TTableKey] & PgColumn,
    TPKeyType extends GetColumnData<TPKeyColumn, 'query'>,
    TTableKeySchema extends z.ZodType<TPKeyType>>(
        table: TTable,
        tableKey: TTableKey,
        tableKeySchema: { [k in TTableKey]: TTableKeySchema }) {

    const keyColumn = table[tableKey] as PgColumn;

    const insertSchema = createInsertSchema(table);
    const updateSchema = createSelectSchema(table);

    const keySchema = z.object(tableKeySchema)
    const findManySchema = z.object({});

    return {
        insert: authAction(insertSchema, async (input, ctx) => {
            const data = insertSchema.parse(input);
            const rows = await ctx.db
                .insert(table)
                .values(data)
                .returning();
            return rows[0];
        }),

        update: authAction(updateSchema, (input, ctx) => {
            const data = updateSchema.parse(input);
            const key = (data as any)[tableKey];
            return ctx.db
                .update(table)
                .set(data)
                .where(eq(keyColumn, key))
                .returning();
        }),

        upsert: authAction(insertSchema, async (input, ctx) => {
            const data = insertSchema.parse(input);
            const rows = await ctx.db
                .insert(table)
                .values(data)
                .onConflictDoUpdate({
                    target: keyColumn,
                    set: { ...(data as PgUpdateSetSource<TTable>) }
                })
                .returning();
            return rows[0];
        }),

        delete: authAction(keySchema, async (input, ctx) => {
            const data = keySchema.parse(input);
            const key = (data as any)[tableKey];
            const rows = await ctx.db
                .delete(table)
                .where(eq(keyColumn, key))
                .returning();
            return rows[0];
        }),

        findOne: action(keySchema, async (input, ctx) => {
            const data = keySchema.parse(input);
            const key = (data as any)[tableKey];
            const rows = await ctx.db
                .select()
                .from(table)
                .where(eq(keyColumn, key));
            return rows[0];
        }),

        findMany: action(findManySchema, (_input, ctx) => {
            return ctx.db
                .select()
                .from(table);
        }),
    }
}