import React from 'react';
import { useXmtpClient } from '@lens-protocol/react-web/inbox';
import { Button } from '../ui/button';

export function XmtpProvider({ children }: { children: React.ReactNode }) {
    const { client, initialize, isLoading, error } = useXmtpClient();

    if (isLoading) return <div>Loading XMTP client...</div>;
    if (error) return <div>Error initializing XMTP client: {error.message}</div>;

    if (!client) {
        return (
            <Button onClick={() => initialize()}>
                Connect to XMTP
            </Button>
        );
    }

    return <>{children}</>;
}