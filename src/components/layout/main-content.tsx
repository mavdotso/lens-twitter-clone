import { ExploreProfiles } from "../profile/explore-profiles";
import { Composer } from "../publications/composer";
import { ExplorePublications } from "../publications/explore-publications";

export default function MainContent() {
    return (
        <div className="flex-grow border-gray-200 border-x p-4 w-3/6">
            <h1 className="mb-4 font-bold text-3xl">Lens Twitter Clone</h1>
            <Composer />
            <div className="mt-8">
                <ExplorePublications />
            </div>
            <div className="mt-8">
                <ExploreProfiles />
            </div>
        </div>
    );
}