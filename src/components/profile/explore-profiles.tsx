import {
    useExploreProfiles,
    ExploreProfilesOrderByType
} from '@lens-protocol/react-web';

export function ExploreProfiles() {
    const { data, error, loading } = useExploreProfiles({
        orderBy: ExploreProfilesOrderByType.MostFollowers,
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