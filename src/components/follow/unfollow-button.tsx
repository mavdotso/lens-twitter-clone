import { Profile, useUnfollow } from "@lens-protocol/react-web";

export function UnfollowButton({ profile }: { profile: Profile }) {
    const { execute, loading } = useUnfollow();

    const unfollow = async () => {
        const result = await execute({ profile });

        // handle relaying errors
        if (result.isFailure()) {
            window.alert(result.error.message);
            return;
        }

        // optional: wait for the tx to be mined and indexed
        const completion = await result.value.waitForCompletion();

        // handle mining/indexing errors
        if (completion.isFailure()) {
            window.alert(completion.error.message);
            return;
        }

        window.alert("Success! You have unfollowed this profile");
    };

    return (
        <button
            onClick={unfollow}
            disabled={loading || !profile.operations.canUnfollow}
        >
            Unfollow
        </button>
    );
}