import {
    useAddProfileInterests,
    useRemoveProfileInterests,
    Profile,
    ProfileInterestTypes,
} from '@lens-protocol/react-web';

function ProfileInterests({ profile }: { profile: Profile }) {
    const { execute: addInterests } = useAddProfileInterests();
    const { execute: removeInterests } = useRemoveProfileInterests();

    const handleClick = async (interest: ProfileInterestTypes) => {
        const request = {
            interests: [interest],
        };

        if (profile.interests.includes(interest)) {
            await removeInterests(request);
        } else {
            await addInterests(request);
        }
    };

    return <button onClick={() => handleClick(ProfileInterestTypes.Business)}>Business</button>;
}