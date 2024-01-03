import { useState, useEffect } from "react";
import { distinctUntilChanged, tap } from "rxjs";
import { ReactiveProperty, ObservableProperty } from "./reactiveObject";

export function useObservableProperty<T>(property?: ReactiveProperty<T> | ObservableProperty<T>, callback?: (value: T) => void) {
    const [state, setState] = useState(property?.value);
    useEffect(() => {
        let observable = property
            ?.pipe(distinctUntilChanged());
        if (callback) {
            observable = observable
                ?.pipe(tap(callback))
        }
        const subscription = observable?.subscribe((value) => {
            setState(value);
        });
        return () => subscription?.unsubscribe();
    }, [callback, property]);
    return state;
}