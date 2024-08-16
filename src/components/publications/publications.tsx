import { usePublications, PublicationType } from '@lens-protocol/react-web';

export function Publications() {
    const { data, loading, error } = usePublications({
        where: {
            publicationTypes: [PublicationType.Post, PublicationType.Mirror],
        },
    });

    if (loading) return <p>Loading...</p>;

    if (error) return <p>Error: {error.message}</p>;

    return (
        <div>
            {data.map((publication) => (
                <div key={publication.id}>{publication.id}</div>
            ))}
        </div>
    );
}