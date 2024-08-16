import {
    FollowPolicyType,
    useUpdateFollowPolicy,
} from '@lens-protocol/react-web';

export function DisableFollowing() {
    const { execute, loading } = useUpdateFollowPolicy();

    const update = async () => {
        const result = await execute({
            followPolicy: {
                type: FollowPolicyType.NO_ONE,
            },
        });

        if (result.isFailure()) {
            window.alert(result.error.message);
            return;
        }

        window.alert('Follow policy updated!');
    };

    return (
        <button onClick={update} disabled={loading}>
            Disable following
        </button>
    );
}