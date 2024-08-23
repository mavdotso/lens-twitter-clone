import { RequireProfileSession } from '@/components/auth/require-profile-session';
import { ConversationCard } from '@/components/conversations/conversation-card';
import { EnableConversations } from '@/components/conversations/enable-conversations';
import { MessageComposer } from '@/components/conversations/message-composer';
import { MessagesCard } from '@/components/conversations/messages-card';
import { useEnhanceConversation } from '@lens-protocol/react-web/inbox';
import { CachedConversation, useConversations } from '@xmtp/react-sdk';
import { useParams } from 'next/navigation';
import { useMemo } from 'react';


type EnhanceConversationProps = {
    conversation: CachedConversation;
    walletAddress: string;
};

function EnhanceConversation({ conversation, walletAddress }: EnhanceConversationProps) {
    const { conversation: enhancedConversation, isLoading } = useEnhanceConversation({
        conversation,
    });

    if (isLoading) return <p>loading...</p>

    if (enhancedConversation) {
        return (
            <div>
                <ConversationCard conversation={enhancedConversation} />
                <MessageComposer conversation={conversation} />
                <MessagesCard conversation={conversation} walletAddress={walletAddress} />
            </div>
        );
    }

    return <div>Conversation not found</div>;
}

type FetchConversationsProps = {
    conversationId: string;
    walletAddress: string;
};

function FetchConversations({ conversationId, walletAddress }: FetchConversationsProps) {
    const { conversations, isLoading } = useConversations();

    const requestedConversation = useMemo(
        () => conversations?.find((c) => c.topic === conversationId),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [conversations.length, conversationId],
    );

    if (isLoading) return <p>loading...</p>


    if (!requestedConversation) return <div>Conversation with id {conversationId} not found</div>;

    return <EnhanceConversation conversation={requestedConversation} walletAddress={walletAddress} />;
}

export function UseEnhanceConversation() {
    const { conversationId } = useParams();

    if (!conversationId) {
        return <div>conversationId not provided</div>;
    }

    return (
        <>
            <h1>
                <code>useEnhanceConversation</code>
            </h1>
            <RequireProfileSession message="Log in to view this example.">
                {({ address }) => (
                    <EnableConversations>
                        <FetchConversations conversationId={conversationId as string} walletAddress={address} />
                    </EnableConversations>
                )}
            </RequireProfileSession>
        </>
    );
}