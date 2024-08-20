import { ExploreProfiles } from "../profile/explore-profiles";
import { RecommendedProfiles } from "../profile/recommended-profiles";
import { Input } from "../ui/input";

export default function RightSidebar() {
    return (
        <div className="p-4 w-2/6">
            <div className="mb-4">
                <Input
                    type="text"
                    placeholder="Search on Lens"
                    className="bg-gray-100 p-2 rounded-full w-full"
                />
            </div>
            <div className="bg-gray-100 mb-4 p-4 rounded-xl">
                <h2 className="mb-4 font-bold">Recommended profiles</h2>
                <RecommendedProfiles />
            </div>
            <div className="bg-gray-100 p-4 rounded-xl">
                <h2 className="mb-4 font-bold">Explore profiles</h2>
                <ExploreProfiles />
            </div>
        </div>
    );
}