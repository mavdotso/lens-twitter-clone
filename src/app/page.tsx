'use client';

import { WelcomeToLens } from '@/components/welcome-to-lens';

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-8 lg:p-16">
            <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
                <h1 className="text-3xl font-bold">Lens Twitter Clone</h1>
            </div>

            <div className="flex place-items-center flex-col max-w-lg my-16 w-full">
                <WelcomeToLens />
                <CreatePost />
                <Feed />
            </div>
        </main>
    );
}