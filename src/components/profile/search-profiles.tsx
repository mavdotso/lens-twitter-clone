import { useSearchProfiles } from '@lens-protocol/react-web';

function SearchProfiles() {
    const { data, error, loading } = useSearchProfiles({ query: 'foo' });

    if (loading) return <p>Loading...</p>;

    if (error) return <p>Error: {error.message}</p>;

    if (data.length === 0) return <p>No profiles found</p>;

    return (
        <ul>
            {data.map((profile) => (
                <li key={profile.id}>{profile.handle?.fullHandle ?? profile.id}</li>
            ))}
        </ul>
    );
}