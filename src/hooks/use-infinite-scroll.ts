import { useCallback, useEffect, useState } from 'react';
import { PaginatedReadResult } from '@lens-protocol/react-web';
import { useInView } from 'react-cool-inview';

export function useInfiniteScroll<T>(query: PaginatedReadResult<T[]>) {
    const [data, setData] = useState<T[]>([]);
    const { data: queryData, hasMore, next, loading } = query;

    useEffect(() => {
        if (queryData) {
            setData((prev) => [...prev, ...queryData]);
        }
    }, [queryData]);

    const { observe: observeRef } = useInView({
        onEnter: () => {
            if (!loading && hasMore) {
                next();
            }
        },
    });

    return {
        data,
        hasMore,
        observeRef,
    };
}
