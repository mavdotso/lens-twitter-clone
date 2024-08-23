import { useEnhanceConversations } from '@lens-protocol/react-web/inbox';
import { ConversationCard } from './conversation-card';

export function ConversationList() {
    const { conversations, isLoading, error } = useEnhanceConversations();

    if (isLoading) return <p>Loading conversations...</p>;
    if (error) return <p>Error loading conversations: {error.message}</p>;

    return (
        <div>
            {conversations.map((conversation) => (
                <ConversationCard key={conversation.id} conversation={conversation} />
            ))}
        </div>
    );
}