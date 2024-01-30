import { grammar } from "@/types/grammar";
import Link from "next/link";

export default function ChallengeCard({ item }: { item: grammar }) {
  return (
    <div className="border-2 border-black dark:border-white rounded-lg p-6 max-w-md">
      <h1 className="text-2xl">{item.Grammar}</h1>
      <p className="dark:text-[#e6e6e6]">{item.Description.String}</p>
      <br></br>
      <div className="text-sm border-2 border-orange-500 max-w-max p-2 rounded-full">
        <p>{item.Difficulty.String}</p>
      </div>
    </div>
  );
}
