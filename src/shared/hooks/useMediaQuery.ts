import {useEffect, useState} from 'react';

export const useMediaQuery = (query: string): boolean => {
    const [matches, setMatches] = useState(() => window.matchMedia(query).matches);

    useEffect(() => {
        const mediaQueryList = window.matchMedia(query);

        const handler = (event: MediaQueryListEvent) => {
            setMatches(event.matches);
        };

        mediaQueryList.addEventListener('change', handler);

        return () => {
            mediaQueryList.removeEventListener('change', handler);
        };
    }, [query]);

    return matches;
};
