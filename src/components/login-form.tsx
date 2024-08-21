import { profileId, useLogin, useProfilesManaged } from '@lens-protocol/react-web';
import { Loading } from './loading';
import { Button } from './ui/button';
import { toast } from 'sonner';

export function LoginForm({ owner, onSuccess }: { owner: string; onSuccess?: () => void }) {
    const { execute: login, loading: isLoginPending } = useLogin();
    const { data: profiles, error, loading } = useProfilesManaged({ for: owner, includeOwned: true });

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const form = event.currentTarget;
        const formData = new FormData(form);

        const id = profileId(formData.get('id') as string);

        const result = await login({
            address: owner,
            profileId: id,
        });

        if (result.isSuccess()) {
            toast.success(`Welcome ${String(result.value?.handle?.fullHandle ?? result.value?.id)}`);
            return onSuccess?.();
        }

        toast.error(result.error.message);
    };

    if (loading) {
        return <Loading />;
    }

    if (error) {
        toast.error(`Error: ${error}`);
    }

    if (!profiles || profiles.length === 0) {
        return <p className="mb-4 text-base text-gray-500">No Lens Profiles found in this wallet.</p>;
    }

    return (
        <form onSubmit={onSubmit} className="flex">
            <fieldset className="flex flex-col place-items-center">
                <legend className="text-base text-gray-500">Select a Lens Profile to login with.</legend>
                <div className="space-y-2 my-4">
                    {profiles.map((profile, idx) => (
                        <label
                            key={profile.id}
                            className="items-center border-gray-300 hover:border-gray-500 grid grid-cols-[24px_auto] p-4 border rounded-lg w-full transition-colors cursor-pointer"
                        >
                            <input
                                disabled={isLoginPending}
                                type="radio"
                                defaultChecked={idx === 0}
                                name="id"
                                value={profile.id}
                                className="box-content border-[5px] border-white checked:border-green-500 bg-clip-padding bg-white rounded-full ring-1 ring-gray-950/10 checked:ring-green-500 w-1.5 h-1.5 appearance-none outline-none"
                            />
                            <span className="font-semibold text-gray-800 text-sm">{profile.handle?.fullHandle ?? profile.id}</span>
                        </label>
                    ))}
                </div>

                <div>
                    <Button disabled={isLoginPending} type="submit">
                        {isLoginPending ? 'Sign message in your wallet' : 'Login to Lens'}
                    </Button>
                </div>
            </fieldset>
        </form>
    );
}
