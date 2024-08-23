import { ProfileSession, SessionType } from '@lens-protocol/react-web';
import { useState } from 'react';
import { LoggedInChildren, WhenLoggedIn } from './when-logged-in';
import { RequireConnectedWallet } from './require-connected-wallet';
import { LoginForm } from '../login-form';

export type RequireProfileSessionProps = {
    children: LoggedInChildren<ProfileSession>;
    message?: string;
};

export function RequireProfileSession({ children, message }: RequireProfileSessionProps) {
    const [showForm, setShowForm] = useState(false);
    return (
        <WhenLoggedIn
            with={SessionType.WithProfile}
            fallback={
                <RequireConnectedWallet>
                    {(address) => (
                        <>
                            {message && <p>{message}</p>}
                            {!showForm && <button onClick={() => setShowForm(true)}>Login as Profile</button>}
                            {showForm && <LoginForm owner={address} />}
                        </>
                    )}
                </RequireConnectedWallet>
            }
        >
            {children}
        </WhenLoggedIn>
    );
}