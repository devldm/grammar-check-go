import { solution } from "@/types/solution";

export default function SolutionCard({
  solution,
  username,
  index,
}: {
  solution: solution;
  image: string;
  username: string;
  showOptionsToggle: boolean;
  userId?: string;
  index: number;
}) {
  const dataFromCreatedAt = new Date(solution.CreatedAt);
  const readableDate = dataFromCreatedAt.toLocaleDateString("en-gb");

  return (
    <div
      key={solution.ID}
      className="card bg-base-200 border border-base-300 max-h-[200px] hover:bg-base-100 overflow-y-scroll  hover:shadow-lg transition-all duration-300"
    >
      <div className="card-body p-6 flex flex-col justify-between h-full">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-base-content text-lg font-medium mb-3 leading-relaxed break-all ">
              <>{solution.Solution}</>
            </h3>
          </div>
          <div className="text-base-content/50 text-sm font-medium">
            #{index + 1}
          </div>
        </div>
        <div className="flex items-center justify-between gap-4 text-sm mt-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-primary-content text-xs font-bold">
              {username[0].toUpperCase()}
            </div>
            <span className="text-base-content/70">{username}</span>
          </div>
          <time className="text-base-content/60">{readableDate}</time>
        </div>
      </div>
    </div>
  );
}
