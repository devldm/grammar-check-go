"use client"; // Error components must be Client Components

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center w-full">
      <h2 className="text-4xl mb-5">Something went wrong!</h2>
      <button
        className="btn btn-secondary rounded-md"
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  );
}
