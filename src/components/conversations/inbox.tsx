import { useXmtpClient } from '@lens-protocol/react-web/inbox';
import { EnableConversationsButton } from './enable-conversations-button';
import { ConversationList } from './conversation-list';

export function InboxPage() {
    const { client } = useXmtpClient();

    return (
        <div className="flex-grow border-gray-200 border-x p-4 w-1/2 overflow-hidden">
            <h1>Inbox</h1>
            {!client ? (
                <div>
                    <p>Connect to XMTP to view your conversations</p>
                    <EnableConversationsButton />
                </div>
            ) : (
                <ConversationList />
            )}
        </div>
    );
}