import { RequireProfileSession } from '@/components/auth/require-profile-session';
import { ConversationCard } from '@/components/conversations/conversation-card';
import { EnableConversations } from '@/components/conversations/enable-conversations';
import { useEnhanceConversations } from '@lens-protocol/react-web/inbox';
import { useConversations } from '@xmtp/react-sdk';
import Link from 'next/link';


function UseEnhanceConversationsInner() {
    const { conversations, error, isLoading } = useEnhanceConversations(useConversations());

    if (error) return <div>Error {error.message}</div>

    if (isLoading) {
        return <p>Loading</p>;
    }

    return (
        <div>
            {conversations?.length === 0 && <p>No items</p>}

            {conversations?.map((conversation) => (
                <ConversationCard key={conversation.topic} conversation={conversation}>
                    <Link href={`/inbox/useEnhanceConversation/${encodeURIComponent(conversation.topic)}`}>
                        Show details
                    </Link>
                </ConversationCard>
            ))}
        </div>
    );
}

export function UseEnhanceConversations() {
    return (
        <>
            <h1>
                <code>useEnhanceConversations</code>
            </h1>
            <RequireProfileSession message="Log in to view this example.">
                <EnableConversations>
                    <UseEnhanceConversationsInner />
                </EnableConversations>
            </RequireProfileSession>
        </>
    );
}