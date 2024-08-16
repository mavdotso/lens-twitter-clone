import { useFeed, profileId } from '@lens-protocol/react';

export function Feed() {
    const { data, loading, error } = useFeed({
        where: {
            for: profileId('0x28a2')
        },
    });

    if (loading) return <div>Loading...</div>;

    if (error) return <div>Error: {error.message}</div>;

    return (
        <ul>
            {data.map((item, idx) => (
                <li key={`${item.root.id}-${idx}`}>
          // render item details
                </li>
            ))}
        </ul>
    );
}