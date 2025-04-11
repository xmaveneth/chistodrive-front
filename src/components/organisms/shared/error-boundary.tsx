
export default function ErrorFallback({
    error,
}: {
    error: Error;
}) {
    return (
        <div
            role="alert"
            className="text-red-600 p-4 border border-red-500 bg-background"
        >
            <p className="font-bold">Что-то пошло не так:</p>
            <pre className="whitespace-pre-wrap text-sm">{error.message}</pre>
        </div>
    );
}
