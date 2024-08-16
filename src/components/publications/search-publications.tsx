import {
    useSearchPublications,
    LimitType,
    SearchPublicationType,
    appId
} from '@lens-protocol/react-web';

export default function SearchPublications() {
    const { data, error, loading } = useSearchPublications({
        query: 'Hello World',
        limit: LimitType.Ten,
        where: {
            publicationTypes: [SearchPublicationType.Post],
            metadata: {
                publishedOn: [appId('Orb')],
            }
        }
    });

    if (loading) return <p>Loading...</p>;

    if (error) return <p>Error: {error.message}</p>;

    if (data.length === 0) return <p>No publications found</p>;

    return (
        <ul>
            {data.map((publication) => (
                hasContent(publication.metadata) && (
                    <li key={publication.id} style={{ marginBottom: '30px' }}>
                        <p>{publication.metadata.content}</p>
                    </li>
                )
            ))}
        </ul>
    );
}

function hasContent(metadata: any): metadata is { content: string } {
    return 'content' in metadata;
}