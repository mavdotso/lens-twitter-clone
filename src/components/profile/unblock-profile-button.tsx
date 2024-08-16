import { Profile, useUnblockProfiles } from '@lens-protocol/react-web';

export function UnblockButton({ profile }: { profile: Profile }) {
    const { execute, loading } = useUnblockProfiles();

    const unblock = async () => {
        if (profile.operations.isBlockedByMe.isFinalisedOnchain === false) {
            window.alert(
                'You cannot unblock this profile until the pending operation is finalised onchain',
            );
            return;
        }
        const result = await execute({ profiles: [profile] });

        if (result.isFailure()) {
            window.alert(result.error.message);
            return;
        }

        const completion = await result.value.waitForCompletion();

        if (completion.isFailure()) {
            window.alert(completion.error.message);
            return;
        }

        window.alert('Unblocked successfully');
    };

    if (!profile.operations.isBlockedByMe.value) {
        return <p>Not blocked</p>;
    }

    if (!profile.operations.canUnblock) {
        return <p>Cannot unblock</p>;
    }

    return (
        <button onClick={unblock} disabled={loading}>
            Unblock
        </button>
    );
}