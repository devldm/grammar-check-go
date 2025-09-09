import { grammar } from "@/types/grammar";
import Spacer from "./Spacer";
import { CheckCircle } from "lucide-react";
import DifficultyBadge from "./DifficultyBadge";

// Type for grammar with solution merged
type GrammarWithSolution = grammar & {
  Solution: string;
};

export default function SolvedSolutionCard({
  item,
}: {
  item: GrammarWithSolution;
}) {
  return (
    <div className="bg-green-50 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-700 hover:bg-green-100 dark:hover:bg-green-800/30 hover:border-green-300 dark:hover:border-green-600 hover:shadow-lg transition-all duration-300 p-4 rounded-lg w-full h-full flex flex-col">
      <div className="flex justify-between items-start mb-3">
        <h2 className="text-lg font-semibold text-green-800 dark:text-green-200 flex-1 mr-2">
          {item.Grammar}
        </h2>
        <CheckCircle
          className="text-green-600 dark:text-green-400 flex-shrink-0"
          size={20}
        />
      </div>

      <p className="text-gray-700 dark:text-gray-300 text-sm mb-3 line-clamp-2">
        {item.Description.String}
      </p>

      <div className="flex-1">
        <p className="font-medium text-green-800 dark:text-green-200 text-sm mb-2">
          Your Solution:
        </p>
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 p-3 rounded-md">
          <pre className="text-xs text-gray-800 dark:text-gray-200 overflow-auto max-h-32 whitespace-pre-wrap break-words">
            {item.Solution}
          </pre>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-green-200 dark:border-green-700">
        <DifficultyBadge difficulty={item.Difficulty.String} />
      </div>
    </div>
  );
}
