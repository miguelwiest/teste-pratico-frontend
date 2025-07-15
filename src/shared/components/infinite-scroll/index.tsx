// React
import React, {useEffect, memo, type CSSProperties} from 'react';

interface InfiniteScrollProps {
    next: () => void;
    hasMore: boolean;
    loader: React.ReactNode;
    isLoading: boolean;
    threshold?: number;
    scrollableTarget?: string;
    style?: CSSProperties;
    children: React.ReactNode;
}

const InfiniteScroll: React.FC<InfiniteScrollProps> = (
    {
        next,
        hasMore,
        loader,
        isLoading,
        threshold = 20,
        scrollableTarget,
        style,
        children
    }
) => {
    useEffect(() => {
        const targetElement = scrollableTarget ? document.getElementById(scrollableTarget) : window;

        const handleScroll = () => {
            const scrollCheckElement = scrollableTarget
                ? document.getElementById(scrollableTarget)
                : document.documentElement;

            if (!scrollCheckElement) {
                return;
            }

            const {scrollTop, clientHeight, scrollHeight} = scrollCheckElement;

            if (hasMore && !isLoading && (scrollTop + clientHeight >= scrollHeight - threshold)) {
                next();
            }
        };

        if (targetElement) {
            targetElement.addEventListener('scroll', handleScroll);
        }

        return () => {
            if (targetElement) {
                targetElement.removeEventListener('scroll', handleScroll);
            }
        };
    }, [next, hasMore, threshold, scrollableTarget]);

    return (
        <div style={style}>
            {children}
            {isLoading && loader}
        </div>
    );
};

export default memo(InfiniteScroll);
