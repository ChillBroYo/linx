import { useEffect, useRef, useState } from 'react';

export function useInterval(callback, delay) {
    const savedCallback = useRef();

    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
        function intervalCallback() {
            savedCallback.current();
        }

        if (delay != null) {
            const intervalId = setInterval(intervalCallback, delay);

            return () => {
                clearInterval(intervalId);
            }
        }
    }, [callback, delay]);
}

export function useIsMountedRef(){
    const isMountedRef = useRef(null);

    useEffect(() => {
        isMountedRef.current = true;

        return () => isMountedRef.current = false;
    });

    return isMountedRef;
}

