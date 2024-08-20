import { Profile, UnspecifiedError } from '@lens-protocol/react-web';
import { ProfileAvatar } from './profile-avatar';
import { FollowButton } from '../follow/follow-button';
import { useState } from 'react';
import { Button } from '../ui/button';

interface ProfileListProps {
    profiles: Profile[];
    loading: boolean;
    error: UnspecifiedError | undefined;
    hasMore: boolean;
    onLoadMore: () => void;
}

export function ProfileList({ profiles, loading, error, hasMore, onLoadMore }: ProfileListProps) {
    const [displayCount, setDisplayCount] = useState(5);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    if (!profiles || profiles.length === 0) return <p>No profiles found</p>;

    const handleLoadMore = () => {
        onLoadMore();
        setDisplayCount(prevCount => prevCount + 5);
    };

    return (
        <div className="space-y-4 w-full">
            <ul className="space-y-4">
                {profiles.slice(0, displayCount).map((profile) => (
                    <li key={`${profile.id}-${profile.handle?.fullHandle}`} className="flex justify-between items-center space-x-4">
                        <div className="flex items-center space-x-4">
                            <ProfileAvatar profile={profile} />
                            <span>{profile.handle?.fullHandle}</span>
                        </div>
                        <FollowButton profile={profile} />
                    </li>
                ))}
            </ul>
            {hasMore && displayCount < profiles.length && (
                <Button onClick={handleLoadMore} variant={"secondary"}>
                    Load more
                </Button>
            )}
        </div>
    );
}