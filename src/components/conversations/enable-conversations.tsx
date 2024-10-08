import { useXmtpClient } from '@lens-protocol/react-web/inbox';
import { ReactNode } from 'react';
import { EnableConversationsButton } from './enable-conversations-button';


type Props = {
    children: ReactNode;
};

export function EnableConversations({ children }: Props) {
    const { client } = useXmtpClient();

    if (!client) {
        return <EnableConversationsButton />;
    }

    return children;
}