import { grammar } from "@/types/grammar";
import Spacer from "./Spacer";

export default function ChallengeCard({ item }: { item: grammar }) {
  return (
    <div className="border-2 border-white rounded-lg p-6 max-w-md">
      <h1 className="text-lg font-bold md:text-2xl">{item.Grammar}</h1>
      <p className="dark:text-[#e6e6e6]">{item.Description.String}</p>
      <Spacer height="h-2 md:h-4" />
      <div className="text-sm border-2 border-orange-500 max-w-max p-2 rounded-full">
        <p>{item.Difficulty.String}</p>
      </div>
    </div>
  );
}
