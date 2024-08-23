import { Profile } from '@lens-protocol/react-web';
import { EnhancedConversation } from '@lens-protocol/react-web/inbox';
import { ReactNode } from 'react';

import { ProfileAvatar } from '../profile/profile-avatar';
import { formatProfileIdentifier } from '@/lib/utils';

type PeerProfileProps = {
    profile: Profile;
};

function PeerProfile({ profile }: PeerProfileProps) {
    return (
        <div>
            <ProfileAvatar profile={profile} />
            <div>{formatProfileIdentifier(profile)}</div>
        </div>
    );
}

type ConversationCardProps = {
    children?: ReactNode;
    conversation: EnhancedConversation;
};

export function ConversationCard({ conversation, children }: ConversationCardProps) {
    return (
        <article>
            <p>Conversation with:</p>
            <div>
                {conversation.peerProfile && <PeerProfile profile={conversation.peerProfile} />}
                {!conversation.peerProfile && <p>Address: {conversation.peerAddress}</p>}
            </div>
            {children && <p>{children}</p>}
        </article>
    );
}