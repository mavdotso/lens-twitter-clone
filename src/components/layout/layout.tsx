import React from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="bg-white mx-auto max-w-6xl min-h-screen">
            {children}
        </div>
    );
}