import Image from "next/image";
import { solution } from "@/types/solution";
import OptionsToggle from "./OptionsToggle";

export default function SolutionCard({
  solution,
  image,
  username,
  showOptionsToggle,
  userId,
}: {
  solution: solution;
  image: string;
  username: string;
  showOptionsToggle: boolean;
  userId: string;
}) {
  const dataFromCreatedAt = new Date(solution.CreatedAt);
  const readableDate = dataFromCreatedAt.toLocaleDateString("en-gb");

  return (
    <div className="border-2 border-white rounded-lg p-6 flex flex-col gap-2">
      <div className="flex items-center gap-1 flex-wrap">
        <Image
          src={image}
          alt="user profile image"
          width={"30"}
          height={"30"}
          className="rounded-full"
        />
        <p>{username ?? "user"}</p>
        <p className="italic">solved {solution.Grammar}</p>
      </div>
      <h1>{solution.Solution}</h1>
      <div className="flex items-center justify-between">
        <p>{readableDate}</p>
        {showOptionsToggle && (
          <OptionsToggle solutionId={solution.ID} userId={userId} />
        )}
      </div>
    </div>
  );
}
