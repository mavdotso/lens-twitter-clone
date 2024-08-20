'use client';

import MainContent from '@/components/layout/main-content';
import RightSidebar from '@/components/layout/right-sidebar';
import LeftSidebar from '@/components/layout/left-sidebar';

export default function Home() {
    return (
        <div className="flex mx-auto w-full">
            <LeftSidebar />
            <MainContent />
            <RightSidebar />
        </div>
    );
}