import { grammar } from "@/types/grammar";
import Spacer from "./Spacer";
import clsx from "clsx";
import { solution } from "@/types/solution";
import { CheckCircle } from "lucide-react";

export default function ChallengeCard({
  item,
  solved,
}: {
  item: grammar;
  solved: solution[];
}) {
  const isSolved = solved.find((s) => item.ID == s.GrammarID);
  return (
    <div className="border-2 border-white hover:border-emerald-400 rounded-lg p-6 max-w-md h-full flex justify-between flex-col">
      <div>
        <h1 className="text-lg font-bold md:text-2xl">{item.Grammar}</h1>
        <p className="dark:text-[#e6e6e6] first-letter:capitalize">
          {item.Description.String}
        </p>
      </div>
      <Spacer height="h-2 md:h-4" />
      <div
        className={clsx("w-full justify-end flex items-center", {
          "justify-between": isSolved,
        })}
      >
        {isSolved && <CheckCircle className="text-green-500" />}
        <div className="self-end">
          <p
            className={clsx(
              "max-w-max rounded-full text-sm px-2 py-1 bg-gray-700 border-2 font-medium",
              {
                "text-orange-500 border-orange-300":
                  item.Difficulty.String == "intermediate",
                "text-red-500 border-red-300":
                  item.Difficulty.String == "advanced",
                "text-green-500 border-greeen-300":
                  item.Difficulty.String == "easy",
              },
            )}
          >
            {item.Difficulty.String}
          </p>
        </div>
      </div>
    </div>
  );
}
