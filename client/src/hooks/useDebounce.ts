import { MutableRefObject, useCallback, useEffect, useRef } from 'react';

export function useDebounce(
    callback: (...args: any[]) => void,
    delay: number,
) {
    const timeoutRef = useRef(null) as MutableRefObject<any>;

    useEffect(() => clearTimeout(timeoutRef.current), []);

    return useCallback(
        (...args: any[]) => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            timeoutRef.current = setTimeout(() => {
                callback(...args);
            }, delay);
        },
        [callback, delay],
    );
}
