import {
    useExploreProfiles,
    ExploreProfilesOrderByType
} from '@lens-protocol/react-web';
import { ProfileList } from './profile-list';

export function ExploreProfiles() {
    const { data, loading, error, next, hasMore } = useExploreProfiles({
        orderBy: ExploreProfilesOrderByType.MostFollowers,
    });

    return (
        <ProfileList
            profiles={data || []}
            loading={loading}
            error={error}
            hasMore={hasMore}
            onLoadMore={next}
        />
    );
}