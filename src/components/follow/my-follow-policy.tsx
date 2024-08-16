import { formatFollowFee } from '@/lib/utils';
import {
    FollowPolicyType,
    ProfileSession,
    resolveFollowPolicy,
} from '@lens-protocol/react-web';

function MyFollowPolicy({ profileSession }: { profileSession: ProfileSession }) {
    const followPolicy = resolveFollowPolicy(profileSession.profile);

    switch (followPolicy.type) {
        case FollowPolicyType.UNKNOWN:
            return <p>Custom Follow policy: ${followPolicy.contractAddress}</p>;

        case FollowPolicyType.ANYONE:
            return <p>Anyone can follow you</p>;

        case FollowPolicyType.NO_ONE:
            return <p>No one can follow you</p>;

        case FollowPolicyType.CHARGE:
            return (
                <p>
                    You charge {formatFollowFee(followPolicy)}
                    to follow you
                </p>
            );
    }
}