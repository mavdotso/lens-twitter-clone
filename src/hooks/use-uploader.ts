import { useMemo } from 'react';
import { Uploader, useIdentityToken } from '@lens-protocol/react-web';

export function useUploader() {
    const idToken = useIdentityToken();

    return useMemo(() => {
        return new Uploader(async (file: File) => {
            const response = await fetch('/api/file', {
                method: 'POST',
                body: file,
                headers: {
                    Authorization: `Bearer ${idToken}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to upload');
            }

            return response.headers.get('Location')!;
        });
    }, [idToken]);
}
