import {
    ProfileReportReason,
    profileId,
    useReportProfile,
} from '@lens-protocol/react-web';

const { execute: report, loading } = useReportProfile();

const handleSubmit = async () => {
    const result = await report({
        profileId: profileId('0x01'),
        reason: ProfileReportReason.IMPERSONATION,
        additionalComments: 'Human readable comments, if any.',
    });

    if (result.isSuccess()) {
        alert('Profile reported!');
    }
};

<button onClick={handleSubmit} disabled={loading}>
    Report
</button>