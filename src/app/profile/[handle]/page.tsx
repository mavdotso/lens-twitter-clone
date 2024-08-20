'use client'
import LeftSidebar from "@/components/layout/left-sidebar";
import RightSidebar from "@/components/layout/right-sidebar";
import ProfileCard from "@/components/profile/profile-card";
import { useProfile } from "@lens-protocol/react-web";

export default function Profile({ params }: { params: { handle: string } }) {
    const { data: profile, loading, error } = useProfile({ forHandle: `lens/${params.handle}` });

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    if (!profile) return <div>Profile not found</div>;

    return (
        <div className="flex mx-auto w-full">
            <LeftSidebar />
            <main className="flex-grow">
                <ProfileCard profile={profile} />
            </main>
            <RightSidebar />
        </div>
    );
}