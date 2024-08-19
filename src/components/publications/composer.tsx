import { textOnly } from '@lens-protocol/metadata';
import { useCreatePost } from '@lens-protocol/react-web';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { useState } from 'react';
import { toast } from 'sonner';

export function Composer() {
    const { execute, loading, error } = useCreatePost();
    const [content, setContent] = useState('');

    const post = async () => {
        if (!content.trim()) {
            toast.error('Please enter some content');
            return;
        }

        const metadata = textOnly({
            content,
            locale: 'en',
            appId: 'https://mav.so'
        });

        try {
            const result = await execute({
                metadata: await uploadJson(metadata),
                sponsored: false,
            });

            if (result.isFailure()) {
                throw new Error(result.error.message);
            }

            console.log('Post created successfully:', result);
            toast.success('Post created successfully!');
            setContent('');
        } catch (err) {
            console.error('Error creating post:', err);
            toast.error('Error creating post: ' + (err instanceof Error ? err.message : String(err)));
        }
    };

    return (
        <div className="space-y-4 w-full">
            <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="What's happening?"
                disabled={loading}
                className="w-full"
            />
            <Button onClick={post} disabled={loading}>
                {loading ? 'Posting...' : 'Post'}
            </Button>
            {error && <p className="text-red-500">{error.message}</p>}
        </div>
    );
}

async function uploadJson(data: any): Promise<string> {
    try {
        const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
        const file = new File([blob], 'metadata.json', { type: 'application/json' });

        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('/api/ipfs', {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        return `ipfs://${result.IpfsHash}`;
    } catch (error) {
        console.error('Error uploading to IPFS:', error);
        throw error;
    }
}