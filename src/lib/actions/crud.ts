import { GetColumnData, eq } from "drizzle-orm";
import { PgColumn, PgInsertValue, PgTable, PgUpdateSetSource, } from "drizzle-orm/pg-core";
import { z } from "zod";
import { action, authAction } from ".";

type KeyOfType<T, V> = keyof {
    [P in keyof T as T[P] extends V ? P : never]: any
}

export function getCRUDActions<
    TTable extends PgTable,
    TTableSchema extends z.AnyZodObject,
    TPKeyColumn extends TTable[TTableKey] & PgColumn,
    TTableKey extends KeyOfType<TTable, TPKeyColumn>,
    TPKeyType extends GetColumnData<TPKeyColumn, 'query'>>(
        table: TTable,
        tableSchema: TTableSchema,
        tableKey: {
            keyName: TTableKey,
            keySchema: { [k in TTableKey]: z.ZodType<TPKeyType> }
        }) {

    const keyColumn = table[tableKey.keyName] as PgColumn;

    const keySchema = z.object(tableKey.keySchema)

    const findOneSchema = keySchema;
    const findManySchema = z.object({});

    return {
        insert: authAction(tableSchema, async (input, ctx) => {
            const data = tableSchema.parse(input) as PgInsertValue<TTable>;
            const key = (data as any)[tableKey.keyName];
            const rows = await ctx.db
                .insert(table)
                .values(data)
                .returning();
            return rows[0];
        }),

        update: authAction(tableSchema, async (input, ctx) => {
            const data = tableSchema.parse(input) as PgUpdateSetSource<TTable>;
            const key = (data as any)[tableKey.keyName] as TPKeyType;
            const rows = await ctx.db
                .update(table)
                .set(data)
                .where(eq(keyColumn, key))
                .returning();
            return rows[0];
        }),

        upsert: authAction(tableSchema, async (input, ctx) => {
            const data = tableSchema.parse(input) as PgInsertValue<TTable>;
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
            const key = (data as any)[tableKey.keyName] as TPKeyType;
            const rows = await ctx.db
                .delete(table)
                .where(eq(keyColumn, key))
                .returning();
            return rows[0];
        }),

        findOne: action(findOneSchema, async (input, ctx) => {
            const data = findOneSchema.parse(input);
            const key = (data as any)[tableKey.keyName] as TPKeyType;
            const rows = await ctx.db
                .select()
                .from(table)
                .where(eq(keyColumn, key));
            return rows[0];
        }),

        findMany: action(findManySchema, (input, ctx) => {
            return ctx.db
                .select()
                .from(table);
        }),
    }
}