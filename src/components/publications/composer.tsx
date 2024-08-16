import { useUploader } from '@/hooks/use-uploader';
import { textOnly } from '@lens-protocol/metadata';
import { useCreatePost } from '@lens-protocol/react-web';
import { useOptimisticCreatePost } from "@lens-protocol/react-web";

// import { uploadJson } from "./my-upload-lib";

export function Composer() {
    const uploader = useUploader();
    const { data, execute, loading, error } = useOptimisticCreatePost(uploader);

    const post = async (content: string) => {
        const metadata = textOnly({ content });

        // invoke the `execute` function to create the post
        const result = await execute({
            metadata,
        });

        // check for failure scenarios
        if (result.isFailure()) {
            window.alert(result.error.message);
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;
        const content = (form.elements.namedItem('content') as HTMLTextAreaElement).value;
        await post(content);
    };

    return (
        <form onSubmit={handleSubmit}>
            <textarea
                name="content"
                minLength={1}
                required
                rows={3}
                placeholder="What's happening?"
                disabled={loading}
            ></textarea>

            <button type="submit" disabled={loading}>
                Post
            </button>

            {!loading && error && <p>{error.message}</p>}
        </form>
    );
}