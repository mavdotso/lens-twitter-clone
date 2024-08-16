import { followButtonLabel, isSupportedFollowPolicy } from "@/lib/utils";
import { Profile, resolveFollowPolicy } from "@lens-protocol/react-web";


export function FollowButton({ profile }: { profile: Profile }) {
    const followPolicy = resolveFollowPolicy(profile);

    if (!isSupportedFollowPolicy(followPolicy)) {
        return <p>Cannot follow this profile</p>;
    }

    return <button>{followButtonLabel(followPolicy)}</button>;
}