import { BehaviorSubject, Observable, Subscription, Unsubscribable } from "rxjs";

export class ReactiveProperty<T> extends BehaviorSubject<T> implements Unsubscribable {
    private constructor(initialValue: T) {
        super(initialValue);
    }
    get value() {
        return super.value;
    }
    set value(value: T) {
        super.next(value);
    }
    static create<T>(reactiveObject: ReactiveObject, initialValue: T) {
        const reactiveProperty = new ReactiveProperty(initialValue);
        reactiveObject.addSubscription(reactiveProperty);
        return reactiveProperty;
    }
}

export class ObservableProperty<T> extends BehaviorSubject<T> implements Unsubscribable {
    private _subscription: Subscription;
    private constructor(value$: Observable<T>, initialValue: T) {
        super(initialValue);
        this._subscription = value$.subscribe(value => {
            this.next(value)
        })
    }
    unsubscribe(): void {
        super.unsubscribe();
        this._subscription.unsubscribe();
    }
    static create<T>(reactiveObject: ReactiveObject, value$: Observable<T>, initialValue: T) {
        const observableProperty = new ObservableProperty(value$, initialValue);
        reactiveObject.addSubscription(observableProperty);
        return observableProperty;
    }
}

export abstract class ReactiveObject implements Unsubscribable {
    private _subscriptions: Unsubscribable[];
    constructor() {
        this._subscriptions = [];
    }
    reactiveProperty<T>(initialValue: T) {
        return ReactiveProperty.create(this, initialValue);
    }
    observableProperty<T>(value$: Observable<T>, initialValue: T) {
        return ObservableProperty.create(this, value$, initialValue);
    }
    addSubscription(subscription: Unsubscribable) {
        this._subscriptions = [...this._subscriptions, subscription];
    }
    unsubscribe() {
        for (const subscription of this._subscriptions) {
            subscription.unsubscribe();
        }
    }
}