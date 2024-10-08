import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Amount, Asset, ChargeFollowPolicy, FollowPolicy, OpenFollowPolicy, FollowPolicyType } from '@lens-protocol/react-web';
import { HandleInfo, Profile } from '@lens-protocol/react-web';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const truncateRegex = /^(0x[a-zA-Z0-9]{4})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/;

export const truncateEthAddress = (address?: string, separator: string = '••••') => {
    if (!address) return '';
    const match = address.match(truncateRegex);
    if (!match) return address;
    return `${match[1]}${separator}${match[2]}`;
};

function formatAmount(amount: Amount<Asset>) {
    return `${amount.toSignificantDigits()} ${amount.asset.symbol}`;
}

export function formatFollowFee({ amount, rate }: ChargeFollowPolicy) {
    if (rate) {
        const fiat = amount.convert(rate);
        return `${formatAmount(amount)} (${formatAmount(fiat)})`;
    }
    return formatAmount(amount);
}

export type SupportedFollowPolicy = ChargeFollowPolicy | OpenFollowPolicy;

export function isSupportedFollowPolicy(policy: FollowPolicy): policy is SupportedFollowPolicy {
    return policy.type === FollowPolicyType.ANYONE || policy.type === FollowPolicyType.CHARGE;
}

export function followButtonLabel(policy: SupportedFollowPolicy): string {
    switch (policy.type) {
        case FollowPolicyType.ANYONE:
            return 'Follow';

        case FollowPolicyType.CHARGE:
            return `Follow for ${formatFollowFee(policy)}`;
    }
}

export function resolveIpfsUri(uri: string | undefined | null): string {
    if (!uri || typeof uri !== 'string') return '';
    if (uri.startsWith('ipfs://')) {
        return `https://ipfs.io/ipfs/${uri.slice(7)}`;
    }
    return uri;
}

export function never(message = 'Unexpected call to never()'): never {
    throw new Error(message);
}

export function invariant(condition: unknown, message: string): asserts condition {
    if (!condition) {
        throw new Error(message);
    }
}

function formatHandle(handle: HandleInfo): string {
    return `@${handle.fullHandle}`;
}

export function formatProfileIdentifier(profile: Profile): string {
    return profile?.metadata?.displayName ?? (profile.handle ? formatHandle(profile.handle) : profile.id);
}
