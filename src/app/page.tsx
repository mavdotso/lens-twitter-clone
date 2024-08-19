'use client';

import { WelcomeToLens } from '@/components/welcome-to-lens';
import { ExplorePublications } from '@/components/publications/explore-publications';
import { ExploreProfiles } from '@/components/profile/explore-profiles';
import { Composer } from '@/components/publications/composer';

export default function Home() {
    return (
        <main className="flex flex-col justify-between items-center gap-8 p-8 lg:p-16 min-h-screen">
            <div className="z-10 lg:flex justify-between items-center w-full max-w-5xl font-mono text-sm">
                <h1 className="font-bold text-3xl">Lens Twitter Clone</h1>
            </div>
            <div className="flex flex-col place-items-center my-16 w-full max-w-lg">
                <WelcomeToLens />
                <Composer />
                <div className='flex'>
                    <ExplorePublications />
                    <ExploreProfiles />
                </div>
            </div>
        </main>
    );
}