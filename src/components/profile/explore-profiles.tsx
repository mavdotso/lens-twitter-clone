import {
    useExploreProfiles,
    ExploreProfilesOrderByType
} from '@lens-protocol/react-web';
import { useInfiniteScroll } from '@/hooks/use-infinite-scroll';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

export function ExploreProfiles() {
    const query = useExploreProfiles({
        orderBy: ExploreProfilesOrderByType.MostFollowers,
    });

    const { data, hasMore, observeRef } = useInfiniteScroll(query);

    if (query.loading) return <p>Loading...</p>;
    if (query.error) return <p>Error: {query.error.message}</p>;
    if (!data || data.length === 0) return <p>No profiles found</p>;

    return (
        <div className="space-y-4 w-full">
            <h2 className="font-bold text-2xl">Explore Profiles</h2>
            <ul className="space-y-4">
                {data.map((profile) => (
                    <li key={profile.id} className="flex items-center space-x-4">
                        <Avatar>
                            <AvatarImage src={profile.metadata?.coverPicture?.optimized?.uri || ''} />
                            <AvatarFallback>{profile.handle?.localName?.slice(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <span>{profile.handle?.fullHandle}</span>
                    </li>
                ))}
            </ul>
            {hasMore && <div ref={observeRef}>Loading more...</div>}
        </div>
    );
}