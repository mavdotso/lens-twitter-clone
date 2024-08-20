import React from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="bg-white mx-auto max-w-7xl min-h-screen">
            {children}
        </div>
    );
}