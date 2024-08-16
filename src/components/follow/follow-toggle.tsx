import { Profile } from "@lens-protocol/react-web";
import { FollowButton } from "./follow-button";
import { UnfollowButton } from "./unfollow-button";

export function FollowToggle({ profile }: { profile: Profile }) {

    if (profile.operations.isFollowedByMe.value) {
        return <UnfollowButton profile={profile} />;
    }

    return <FollowButton profile={profile} />;
}