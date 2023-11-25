export function registerService<T>(name: string, initFn: () => T): T {
	if (process.env.NODE_ENV === "development") {
		if (!(name in global)) {
			(global as any)[name] = initFn();
		}
		return (global as any)[name] as T;
	}
	return initFn();
};
