import { MonoTypeOperatorFunction, Observable, combineLatest, map, switchMap } from "rxjs";
import { notEmpty } from "../typeUtils";

export function filterOnObservable<T, O>(itemFn:(item:T) => Observable<O>, filter:(value:O) => boolean) : MonoTypeOperatorFunction<T[] | undefined> {
    return (source:Observable<T[] | undefined>) => source.pipe(
        switchMap(items => {
            const filteredItems = items?.map(item => {
                return itemFn(item).pipe(
                    map(value => filter(value) ? item : undefined)
                )
            }) || [];
            return combineLatest(filteredItems);
        }),
        map(filteredItems => filteredItems?.filter(notEmpty)),
    );
}