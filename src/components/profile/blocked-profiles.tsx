import { useBlockedProfiles } from '@lens-protocol/react-web';

function BlockedProfiles() {
    const { data, loading, error } = useBlockedProfiles();

    if (loading) return <p>Loading...</p>;

    if (error) return <p>Error: {error.message}</p>;

    if (data.length === 0) return <p>No blocked profiles found</p>;

    return (
        <ul>
            {data.map((profile) => (
                <li key={profile.id}>{profile.handle?.fullHandle ?? profile.id}</li>
            ))}
        </ul>
    );
}