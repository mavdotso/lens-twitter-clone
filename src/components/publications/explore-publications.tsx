import {
    useExplorePublications,
    ExplorePublicationsOrderByType,
    PublicationMetadata
} from '@lens-protocol/react-web';
import { useInfiniteScroll } from '@/hooks/use-infinite-scroll';
import { formatDistanceToNow } from 'date-fns';
import { CommentIcon, RetweetIcon } from '../icons';
import { HeartIcon } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';


export function ExplorePublications() {
    const query = useExplorePublications({
        orderBy: ExplorePublicationsOrderByType.LensCurated,
    });

    const { data, hasMore, observeRef } = useInfiniteScroll(query);

    const getPublicationContent = (metadata: PublicationMetadata): string => {
        if (typeof metadata === 'object' && metadata !== null) {
            if ('content' in metadata && typeof metadata.content === 'string') {
                return metadata.content;
            } else if ('title' in metadata && typeof metadata.title === 'string') {
                return metadata.title;
            }
        }
        return 'No content available';
    };

    if (query.loading) return <p>Loading...</p>;
    if (query.error) return <p>Error: {query.error.message}</p>;
    if (!data || data.length === 0) return <p>No publications found</p>;

    return (
        <div className="space-y-4 w-full">
            <h2 className="font-bold text-2xl">Explore Publications</h2>
            <ul className="space-y-4">
                {data.map((publication) => (
                    <li key={publication.id} className="shadow-sm hover:shadow-md p-4 border rounded-lg transition-shadow">
                        <div className="flex items-start space-x-3">
                            {/* <img
                                src={publication.profile.picture?.original?.url || '/default-avatar.png'}
                                alt={`${publication.profile.handle}'s avatar`}
                                className="rounded-full w-12 h-12"
                            /> */}
                            <Avatar>
                                <AvatarImage src={publication.by.metadata?.picture || ''} />
                                <AvatarFallback>{publication.by.handle?.localName?.slice(0, 2).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                                <div className="flex justify-between items-top">
                                    <div className="flex flex-col">
                                        <span className="font-bold">{publication.by.handle?.localName || ''}</span>
                                        <span className="text-gray-500 text-sm">@{publication.by.handle?.fullHandle || ''}</span>
                                    </div>
                                    <span className="text-gray-500 text-xs">{formatDistanceToNow(new Date(publication.createdAt))} ago</span>
                                </div>
                                {/* Publication content */}
                                <p className="mt-2">{getPublicationContent(publication.metadata)}</p>
                                {/* Add interaction buttons */}
                                <div className="flex items-center space-x-6 mt-3 text-gray-500">
                                    <button className="flex items-center space-x-2">
                                        <CommentIcon className="w-5 h-5" />
                                        <span>{publication.stats.comments}</span>
                                    </button>
                                    <button className="flex items-center space-x-2">
                                        <RetweetIcon className="w-5 h-5" />
                                        <span>{publication.stats.mirrors}</span>
                                    </button>
                                    <button className="flex items-center space-x-2">
                                        <HeartIcon className="w-5 h-5" />
                                        <span>{publication.stats.upvotes}</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
            {hasMore && <div ref={observeRef}>Loading more...</div>}
        </div>
    );
}