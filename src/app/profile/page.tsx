'use client'
import ProfileCard from "@/components/profile/profile-card";
import { RefreshCcw } from "lucide-react";
import { SessionType, useSession } from "@lens-protocol/react-web";
import LeftSidebar from "@/components/layout/left-sidebar";
import RightSidebar from "@/components/layout/right-sidebar";
import LoginPage from "@/components/login-page";

export default function ProfilePage() {
    const { data, error, loading } = useSession();

    if (loading) {
        return <RefreshCcw className="animate-spin" />;
    }

    if (error) {
        console.log(error)
    }

    switch (data?.type) {
        case SessionType.Anonymous:
            return <LoginPage />;

        // case SessionType.JustWallet:
        //     // data is a WalletOnlySession
        //     return <Onboarding address={data.address} />;

        case SessionType.WithProfile:
            return (<div className="flex mx-auto w-full">
                <LeftSidebar />
                <ProfileCard profile={data.profile} />
                <RightSidebar />
            </div>)

        default:
            return <p>Something went wrong.</p>;
    }
}