'use client'
import { EnableConversations } from "@/components/conversations/enable-conversations";
import { InboxPage } from "@/components/conversations/inbox";
import LeftSidebar from "@/components/layout/left-sidebar";
import RightSidebar from "@/components/layout/right-sidebar";

export default function MessagesPage() {
    return (
        <div className="flex mx-auto w-full">
            <LeftSidebar />
            <EnableConversations>
                <InboxPage />
            </EnableConversations>
            <RightSidebar />
        </div>
    );
}