import { SessionType, useSession as useLensSession } from '@lens-protocol/react-web';
import { useAccount as useWagmiAccount } from 'wagmi';
import { ConnectWalletButton } from './connect-wallet-button';
import { LoginForm } from './login-form';
import { DisconnectWalletButton } from './disconnect-wallet-button';
import { LogoutButton } from './logout-button';
import { ProfileAvatar } from './profile/profile-avatar';
import { truncateEthAddress } from '@/lib/utils';

export default function LoginPage() {
    const { isConnected, address } = useWagmiAccount();
    const { data: session } = useLensSession();

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="shadow-md p-8 rounded-lg w-96">
                <h1 className="mb-6 font-bold text-2xl text-center">Sign in to App</h1>

                <div className="flex flex-col items-center">
                    {!isConnected && (
                        <>
                            <p className="mb-4 text-gray-500">Connect your wallet to get started.</p>
                            <ConnectWalletButton />
                        </>
                    )}

                    {isConnected && !session?.authenticated && address && (
                        <>
                            <p className="mb-4 text-gray-500">Connected wallet: {truncateEthAddress(address)}</p>
                            <LoginForm owner={address} />
                            <div className="mt-2">
                                <DisconnectWalletButton />
                            </div>
                        </>
                    )}

                    {session && session.type === SessionType.WithProfile && (
                        <>
                            <div className="flex items-center gap-2 mb-4">
                                <ProfileAvatar profile={session.profile} />
                                <p className="text-gray-500">
                                    You are logged in as <span className="font-semibold text-gray-800">{session.profile.handle?.fullHandle ?? session.profile.id}</span>.
                                </p>
                            </div>
                            <LogoutButton />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}