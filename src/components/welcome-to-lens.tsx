import { SessionType, useSession as useLensSession } from '@lens-protocol/react-web';
import { useAccount as useWagmiAccount } from 'wagmi';
import { ConnectWalletButton } from './connect-wallet-button';
import { resolveIpfsUri, truncateEthAddress } from '@/lib/utils';
import { LoginForm } from './login-form';
import { DisconnectWalletButton } from './disconnect-wallet-button';
import { LogoutButton } from './logout-button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { ProfileAvatar } from './profile/profile-avatar';

export function WelcomeToLens() {
    const { isConnected, address } = useWagmiAccount();
    const { data: session } = useLensSession();

    // step 1. connect wallet
    if (!isConnected) {
        return (
            <>
                <p className="mb-4 text-gray-500">Connect your wallet to get started.</p>
                <ConnectWalletButton />
            </>
        );
    }

    // step 2. connect Lens Profile
    if (!session?.authenticated && address) {
        return (
            <>
                <p className="mb-4 text-gray-500">Connected wallet: {truncateEthAddress(address)}</p>
                <LoginForm owner={address} />

                <div className="mt-2">
                    <DisconnectWalletButton />
                </div>
            </>
        );
    }

    // step 3. show Profile details
    if (session && session.type === SessionType.WithProfile) {
        const profilePicture = resolveIpfsUri(session.profile.metadata?.picture as string | undefined);
        return (
            <>
                <div className="flex items-center gap-2 mb-4">
                    <ProfileAvatar profile={session.profile} />
                    <p className="text-gray-500">
                        You are logged in as <span className="font-semibold text-gray-800">{session.profile.handle?.fullHandle ?? session.profile.id}</span>.
                    </p>
                </div>
                <LogoutButton />
            </>
        );
    }

    // you can handle other session types here
    return null;
}
