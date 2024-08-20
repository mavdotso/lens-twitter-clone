import { Profile } from '@lens-protocol/react-web';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

type ProfileAvatarProps = {
    profile: Profile;
    className?: string;
};

export function ProfileAvatar({ profile, className }: ProfileAvatarProps) {
    const fallbackText = profile.handle?.localName?.slice(0, 2).toUpperCase() ||
        profile.ownedBy.address.slice(0, 2).toUpperCase();

    const imageUri = profile.metadata?.picture?.__typename === 'ImageSet'
        ? profile.metadata.picture.optimized?.uri
        : undefined;

    return (
        <Avatar className={className}>
            <AvatarFallback>{fallbackText}</AvatarFallback>
            {imageUri && (
                <AvatarImage
                    src={imageUri}
                    alt={`${profile.handle?.localName || 'Profile'} avatar`}
                />
            )}
        </Avatar>
    );
}