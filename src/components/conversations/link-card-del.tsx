import Link from "next/link";

type LinkCardProps = {
    path: string;
    label: string;
    description: string;
};

export function LinkCard({ path, label, description }: LinkCardProps) {
    return (
        <article key={path}>
            <h3>
                <code>{label}</code>
            </h3>
            <p>{description}</p>
            <Link href={path}>View example</Link>
        </article>
    );
}