import Image from "next/image";
import { solutionWithUserData } from "@/types/solution";

export default function SolutionCard({
  solution,
}: {
  solution: solutionWithUserData;
}) {
  const dataFromCreatedAt = new Date(solution.CreatedAt);
  const readableDate = dataFromCreatedAt.toLocaleDateString("en-gb");

  return (
    <div className="border-2 border-black dark:border-white rounded-lg p-6 flex flex-col gap-2">
      <div className="flex items-center gap-1 flex-wrap">
        <Image
          src={solution.ClerkImage}
          alt="user profile image"
          width={"30"}
          height={"30"}
          className="rounded-full"
        />
        <p>{solution.ClerkUsername ?? "user"}</p>
        <p className="opacity-70 italic">solved {solution.Grammar}</p>
      </div>
      <h1>{solution.Solution}</h1>
      <p className="opacity-70">{readableDate}</p>
    </div>
  );
}
