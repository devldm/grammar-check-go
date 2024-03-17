import { grammar } from "@/types/grammar";
import Spacer from "./Spacer";

export default function ChallengeCard({ item }: { item: grammar }) {
  return (
    <div className="border-2 border-white hover:border-emerald-400 rounded-lg p-6 max-w-md h-full flex justify-between flex-col">
      <div>
        <h1 className="text-lg font-bold md:text-2xl">{item.Grammar}</h1>
        <p className="dark:text-[#e6e6e6] first-letter:capitalize">
          {item.Description.String}
        </p>
      </div>
      <Spacer height="h-2 md:h-4" />
      <div className="self-end">
        <p className="max-w-max rounded-full text-sm px-2 py-1 text-orange-500 bg-gray-700 font-medium">
          {item.Difficulty.String}
        </p>
      </div>
    </div>
  );
}
