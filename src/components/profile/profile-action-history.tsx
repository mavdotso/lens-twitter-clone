import { useProfileActionHistory } from '@lens-protocol/react-web';

function ActionHistory() {
    const { data, loading, error } = useProfileActionHistory();

    if (loading) return <p>Loading...</p>;

    if (error) return <p>Error: {error.message}</p>;

    return (
        <ul>
            {data.map((item) => (
                <div key={item.id}>
                    {item.actionType} {item.actionedOn}
                </div>
            ))}
        </ul>
    );
}