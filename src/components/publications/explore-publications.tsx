import {
    useExplorePublications,
    ExplorePublicationsOrderByType,
    PublicationMetadata
} from '@lens-protocol/react-web';
import { useInfiniteScroll } from '@/hooks/use-infinite-scroll';

export function ExplorePublications() {
    const query = useExplorePublications({
        orderBy: ExplorePublicationsOrderByType.LensCurated,
    });

    const { data, hasMore, observeRef } = useInfiniteScroll(query);

    const getPublicationContent = (metadata: PublicationMetadata): string => {
        if (typeof metadata === 'object' && metadata !== null) {
            if ('content' in metadata && typeof metadata.content === 'string') {
                return metadata.content;
            } else if ('title' in metadata && typeof metadata.title === 'string') {
                return metadata.title;
            }
        }
        return 'No content available';
    };

    if (query.loading) return <p>Loading...</p>;
    if (query.error) return <p>Error: {query.error.message}</p>;
    if (!data || data.length === 0) return <p>No publications found</p>;

    return (
        <div className="space-y-4 w-full">
            <h2 className="font-bold text-2xl">Explore Publications</h2>
            <ul className="space-y-4">
                {data.map((publication) => (
                    <li key={publication.id} className="p-4 border rounded-lg">
                        <p>{getPublicationContent(publication.metadata)}</p>
                    </li>
                ))}
            </ul>
            {hasMore && <div ref={observeRef}>Loading more...</div>}
        </div>
    );
}