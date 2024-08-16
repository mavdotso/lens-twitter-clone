import { profile } from "@lens-protocol/metadata";
import { useSetProfileMetadata } from "@lens-protocol/react-web";

export function UpdateMyProfile({ metadataURI }: { metadataURI: string }) {
    const { execute, loading } = useSetProfileMetadata();

    const update = async () => {
        const result = await execute({ metadataURI });

        // detect if an early error occurred
        if (result.isFailure()) {
            window.alert(result.error.message);
            return;
        }

        // optional: wait for the transaction to be mined and indexed
        const completion = await result.value.waitForCompletion();

        // detect if a minining/indexing error occurred
        if (completion.isFailure()) {
            window.alert(completion.error.message);
            return;
        }

        // success!
        window.alert("Profile Metadata updated!");
    };

    return (
        <button onClick={update} disabled={loading}>Update</button>
    );
}