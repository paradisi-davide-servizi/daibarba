import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { ReactiveObject } from "./reactiveObject";

export function viewModelProviderFactory<TViewModel extends ReactiveObject, Args>(
	createViewModel: (args: Args) => TViewModel
) {
	const ViewModelContext = createContext<TViewModel | undefined>(undefined);
	const ViewModelProvider = ({
		children,
		args,
	}: {
		args: Args;
		children?: ReactNode;
	}) => {
		const [viewModel, setViewModel] = useState<TViewModel | undefined>(
			undefined
		);
		useEffect(() => {
			const vm = createViewModel(args);
			setViewModel(vm);
			return () => {
				vm?.unsubscribe();
			};
		}, [args]);
		return (
			<ViewModelContext.Provider value={viewModel}>
				{children}
			</ViewModelContext.Provider>
		);
	};
	const useViewModel = () => {
		return useContext(ViewModelContext);
	};
	return [ViewModelProvider, useViewModel] as const;
}