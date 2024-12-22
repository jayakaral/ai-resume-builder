import React from 'react'


const useDebounce = <T>(val: T, delay = 1500) => {
    const [debouncedValue, setDebouncedValue] = React.useState<T>(val);

    React.useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(val);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [val, delay]);

    return debouncedValue;
}

export default useDebounce
