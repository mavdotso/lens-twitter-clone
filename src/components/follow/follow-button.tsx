import { followButtonLabel, isSupportedFollowPolicy } from "@/lib/utils";
import { Profile, resolveFollowPolicy, useFollow, useUnfollow, TriStateValue } from "@lens-protocol/react-web";
import { Button } from "../ui/button";
import { DollarSignIcon } from "../icons";
import { useState } from "react";

export function FollowButton({ profile }: { profile: Profile }) {
    const followPolicy = resolveFollowPolicy(profile);
    const { execute: executeFollow, loading: followLoading } = useFollow();
    const { execute: executeUnfollow, loading: unfollowLoading } = useUnfollow();
    const [isFollowing, setIsFollowing] = useState(profile.operations.isFollowedByMe.value);

    if (!isSupportedFollowPolicy(followPolicy)) {
        return <p>Cannot follow this profile</p>;
    }

    const label = followButtonLabel(followPolicy);
    const [followText, additionalText] = label.split(/(?<=Follow)/);

    const handleFollowAction = async () => {
        if (isFollowing) {
            const result = await executeUnfollow({ profile });
            if (result.isSuccess()) {
                setIsFollowing(false);
            }
        } else {
            const result = await executeFollow({ profile });
            if (result.isSuccess()) {
                setIsFollowing(true);
            }
        }
    };

    const isLoading = followLoading || unfollowLoading;
    const buttonText = isFollowing ? "Unfollow" : followText;
    const canFollow = profile.operations.canFollow === TriStateValue.Yes;
    const canUnfollow = profile.operations.canUnfollow === true;

    return (canFollow || (isFollowing && canUnfollow)) ? (
        <div className="flex flex-col text-center">
            <Button
                variant={"secondary"}
                onClick={handleFollowAction}
                disabled={isLoading}
            >
                {!isFollowing && additionalText && <DollarSignIcon className="w-6 h-6" />} {buttonText}
            </Button>
            {!isFollowing && additionalText && <span className="text-xs">{additionalText}</span>}
        </div>
    ) : null;
}