import { grammar } from "@/types/grammar";
import Spacer from "./Spacer";
import clsx from "clsx";
import { solution } from "@/types/solution";
import { CheckCircle } from "lucide-react";
import DifficultyBadge from "./DifficultyBadge";

export default function ChallengeCard({
  item,
  solved,
}: {
  item: grammar;
  solved: solution[];
}) {
  const isSolved = solved.find((s) => item.ID == s.GrammarID);
  return (
    <div className="card bg-base-200 border border-base-300 hover:bg-base-100 hover:border-primary hover:shadow-lg transition-all duration-300 max-w-md h-full">
      <div className="card-body p-6 flex justify-between flex-col h-full">
        <div>
          <h1 className="card-title text-lg md:text-2xl mb-3">
            {item.Grammar}
          </h1>
          <p className="text-base-content/80 first-letter:capitalize">
            {item.Description.String}
          </p>
        </div>
        <Spacer height="h-2 md:h-4" />
        <div
          className={clsx("w-full justify-end flex items-center", {
            "justify-between": isSolved,
          })}
        >
          <div className="flex-1">
            {isSolved ? <CheckCircle className="text-green-500" /> : null}
          </div>
          <div className="self-end">
            <DifficultyBadge difficulty={item.Difficulty.String} />
          </div>
        </div>
      </div>
    </div>
  );
}
