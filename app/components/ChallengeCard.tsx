import { grammar } from "@/types/grammar";
import Spacer from "./Spacer";

export default function ChallengeCard({ item }: { item: grammar }) {
  return (
    <div className="border-2 border-white rounded-lg p-6 max-w-md">
      <h1 className="text-lg font-bold md:text-2xl">{item.Grammar}</h1>
      <p className="dark:text-[#e6e6e6]">{item.Description.String}</p>
      <Spacer height="h-2 md:h-4" />
      <div className="text-sm text-orange-500 bg-gray-700 max-w-max px-2 py-1 rounded-full">
        <p className="font-medium">{item.Difficulty.String}</p>
      </div>
    </div>
  );
}
