import { useRecommendedProfiles, profileId } from '@lens-protocol/react-web';
import { ProfileList } from './profile-list';

export function RecommendedProfiles() {
    const { data, error, loading } = useRecommendedProfiles({
        for: profileId('0x24'),
    });

    return (
        <ProfileList
            profiles={data || []}
            loading={loading}
            error={error}
            hasMore={false}
            onLoadMore={() => { }}
        />
    );
}