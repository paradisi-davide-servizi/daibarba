export function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
	return !!value
}

export type PropsOfComponent<TComponent extends (...args: any) => any>
	= Parameters<TComponent>[0];
