import {
    Amount,
    Asset,
    Erc20,
    FollowPolicyType,
    useUpdateFollowPolicy,
} from '@lens-protocol/react-web';

export function ChargeToFollow({ amount }: { amount: Amount<Asset> }) {
    const { execute, loading } = useUpdateFollowPolicy();

    const update = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const value = formData.get('value') as string;

        const result = await execute({
            followPolicy: {
                type: FollowPolicyType.CHARGE,
                amount: Amount.erc20(amount.asset as Erc20, value),

                // you can also specify a different recipient, defaults to the Profile owner address
                recipient: '0xDB6501ef5892CcB7531389c5A5aF720C9e0041Af',
            },
        });

        if (result.isFailure()) {
            window.alert(result.error.message);
            return;
        }

        window.alert('Follow policy updated!');
    };

    return (
        <form onSubmit={update}>
            <div>
                <label>Fee Amount</label>
                <input
                    defaultValue={amount.toSignificantDigits(4)}
                    name="value"
                    type="number"
                />
                {amount.asset.symbol}
            </div>
            <button type='submit' disabled={loading}>
                Save
            </button>
        </form>
    );
}