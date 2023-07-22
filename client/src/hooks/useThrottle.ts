import { useCallback, useEffect, useRef } from 'react';

export function useThrottle<T>(
    callback: (...args: T[]) => void,
    delay: number,
) {
    const throttleRef = useRef(false);
    const timeoutRef = useRef<any>(null);

    useEffect(() => clearTimeout(timeoutRef.current), []);

    return useCallback(
        (...args: T[]) => {
            if (!throttleRef.current) {
                callback(...args);
                throttleRef.current = true;

                timeoutRef.current = setTimeout(() => {
                    throttleRef.current = false;
                }, delay);
            }
        },
        [callback, delay],
    );
}
