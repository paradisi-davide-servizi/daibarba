import _ from "lodash";
import { EffectCallback, useCallback, useEffect, useRef, useState } from "react";
import { proxy, useSnapshot } from "valtio";

type TypedEffectCallback<T> = (value: T) => void | (() => void);
export function useEffectWhenChanged<T>(effect: TypedEffectCallback<T>, value: T) {
    const [lastValue, setLastValue] = useState<T | undefined>(undefined);
    const callback = useCallback((value: T) => {
        if (!_.isEqual(lastValue, value)) {
            setLastValue(value);
            return effect(value);
        }
        return () => {};
    }, [effect, lastValue]);
    useEffect(() => {
        return callback(value);
    }, [callback, value])
}

export function useKeyboard<const Keys extends readonly string[]>(keys:Keys) {
    type KeyType = Keys[number];
    const [isHeld, setIsHeld] = useState<Set<KeyType>>(new Set<KeyType>());

    useEffect(() => {
        function downHandler(this: Window, ev: KeyboardEvent) {
            setIsHeld(set => {
                for (const key of keys) {
                    if (ev.key === key) {
                        ev.preventDefault();
                        set.add(key)
                    }
                }
                return set;
            });
        }

        function upHandler(this: Window, ev: KeyboardEvent) {
            setIsHeld(set => {
                for (const key of keys) {
                    if (ev.key === key) {
                        set.delete(key)
                    }
                }
                return set;
            });
        }

        window.addEventListener('keydown', downHandler);
        window.addEventListener('keyup', upHandler);
        return () => {
            window.removeEventListener('keydown', downHandler);
            window.removeEventListener('keyup', upHandler);
        };

    }, [keys]);

    return isHeld;
}

export function useKeyboardCallback(keys: string[], callback: (key: string) => void) {
    useEffect(() => {
        function downHandler(this: Window, ev: KeyboardEvent) {
            for (const key of keys) {
                if (ev.key === key) {
                    ev.preventDefault();
                    callback(key)
                }
            }
        }
        window.addEventListener('keydown', downHandler);
        return () => {
            window.removeEventListener('keydown', downHandler);
        };

    }, [callback, keys]);
}