import { useRecommendedProfiles, profileId } from '@lens-protocol/react-web';

export function RecommendedProfiles() {
    const { data, error, loading } = useRecommendedProfiles({
        for: profileId('0x24'),
    });

    if (loading) return <p>Loading...</p>;

    if (error) return <p>Error: {error.message}</p>;

    if (data.length === 0) return <p>No profiles found</p>;

    return (
        <ul>
            {data.map((profile) => (
                <li key={profile.id}>{profile.handle?.fullHandle}</li>
            ))}
        </ul>
    );
}