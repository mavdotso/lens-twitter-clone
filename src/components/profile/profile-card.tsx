import { Profile } from '@lens-protocol/react-web';
import { ProfileAvatar } from './profile-avatar';
import Image from 'next/image';
import { FollowButton } from '../follow/follow-button';

type ProfileCardProps = {
    profile: Profile;
};

export default function ProfileCard({ profile }: ProfileCardProps) {
    return (
        <div className="bg-white shadow-md mx-auto rounded-lg max-w-2xl overflow-hidden">
            {profile.metadata?.coverPicture?.optimized?.uri ? (
                <Image
                    src={profile.metadata.coverPicture.optimized.uri}
                    alt="Cover"
                    width={672}
                    height={192}
                    className="w-full h-48 object-cover"
                />
            ) : (
                <div className="bg-gradient-to-r from-blue-500 to-blue-300 h-48"></div>
            )}
            <div className="relative px-4 py-3">
                {/* Avatar */}
                <div className="-top-16 left-4 absolute border-4 border-white rounded-full">
                    <ProfileAvatar profile={profile} className="w-32 h-32" />
                </div>

                <div className="top-2 right-4 absolute">
                    <FollowButton profile={profile} />
                </div>

                <div className="mt-16">
                    <h2 className="font-bold text-xl">
                        {profile.metadata?.displayName || profile.handle?.localName || profile.ownedBy.address}
                    </h2>
                    {profile.handle?.localName && (
                        <p className="text-gray-600">@{profile.handle.localName}</p>
                    )}
                </div>

                <p className="mt-2 text-gray-700">
                    {profile.metadata?.bio || 'No bio available'}
                </p>

                <div className="flex space-x-4 mt-4">
                    <p><span className="font-bold">{profile.stats.following}</span> <span className="text-gray-600">Following</span></p>
                    <p><span className="font-bold">{profile.stats.followers}</span> <span className="text-gray-600">Followers</span></p>
                </div>
            </div>

            <div className="mt-4 border-t">
                <nav className="flex">
                    {['Publications', 'Replies', "Mirrors", 'Multimedia', 'Likes'].map((item, index) => (
                        <a key={index} href="#" className="flex-1 hover:bg-gray-100 py-3 text-center">
                            {item}
                        </a>
                    ))}
                </nav>
            </div>
        </div>
    );
}