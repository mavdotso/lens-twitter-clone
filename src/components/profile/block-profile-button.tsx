import { Profile, useBlockProfiles } from '@lens-protocol/react-web';

export function BlockButton({ profile }: { profile: Profile }) {
    const { execute, loading } = useBlockProfiles();

    const block = async () => {
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

        window.alert('Blocked successfully');
    };

    if (profile.operations.isBlockedByMe.value) {
        return <p>Already blocked</p>;
    }

    if (!profile.operations.canBlock) {
        return <p>Cannot block</p>;
    }

    return (
        <button onClick={block} disabled={loading}>
            Block
        </button>
    );
}