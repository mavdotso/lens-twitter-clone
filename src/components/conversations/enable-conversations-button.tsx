import { useXmtpClient } from '@lens-protocol/react-web/inbox';
import { Loading } from '../loading';
import { Button } from '../ui/button';
import { useState } from 'react';

export function EnableConversationsButton() {
    const { client, error, isLoading, initialize } = useXmtpClient();
    const [isInitializing, setIsInitializing] = useState(false);

    const handleConnect = async () => {
        setIsInitializing(true);
        try {
            await initialize();
        } catch (err) {
            console.error("Failed to initialize XMTP client:", err);
        } finally {
            setIsInitializing(false);
        }
    };

    if (isLoading || isInitializing) return <Loading />;

    if (error) {
        console.log(error);
        return <div>Error: {error.message}</div>;
    }

    if (!client) {
        return (
            <Button onClick={handleConnect}>
                Connect to XMTP
            </Button>
        );
    }

    return null;
}