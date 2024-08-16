import {
    FollowPolicyType,
    useUpdateFollowPolicy,
} from '@lens-protocol/react-web';

export function AnyoneCanFollow() {
    const { execute, loading } = useUpdateFollowPolicy();

    const update = async () => {
        const result = await execute({
            followPolicy: {
                type: FollowPolicyType.ANYONE,
            },
        });

        // detect if occurred
        if (result.isFailure()) {
            window.alert(result.error.message);
            return;
        }

        window.alert('Follow policy updated!');
    };

    return (
        <button onClick={update} disabled={loading}>
            Allow anyone to follow me
        </button>
    );
}