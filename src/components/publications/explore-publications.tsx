import {
    useExplorePublications,
    ExplorePublicationsOrderByType,
    PublicationMetadata
} from '@lens-protocol/react-web';

export function ExplorePublications() {
    const { data, error, loading } = useExplorePublications({
        orderBy: ExplorePublicationsOrderByType.LensCurated,
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    if (!data || data.length === 0) return <p>No publications found</p>;

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

    return (
        <ul>
            {data.map((publication) => (
                <li key={publication.id}>
                    {getPublicationContent(publication.metadata)}
                </li>
            ))}
        </ul>
    );
}