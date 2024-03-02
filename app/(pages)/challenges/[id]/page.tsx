import ChallengeCard from "@/app/components/ChallengeCard";
import LockIcon from "@/app/components/LockIcon";
import Spacer from "@/app/components/Spacer";
import { grammar } from "@/types/grammar";
import ChallengeForm from "@/app/components/ChallengeForm";
import { currentUser } from "@clerk/nextjs";
import { User } from "@clerk/nextjs/server";
import { solutionWithUserData } from "@/types/solution";
import SolutionCard from "@/app/components/SolutionCard";

async function getGrammarData(id: string) {
  const res = await fetch(`${process.env.API_BASE_URL}/grammars/${id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

async function getHasSolved(grammarId: string) {
  const user: User | null = await currentUser();

  const res = await fetch(
    `${process.env.API_BASE_URL}/solutions/${user?.id}/${grammarId}`,
    {
      method: "GET",
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return await res.json();
}

async function getSolutionsWithUserData(grammarId: string) {
  const res = await fetch(
    `${process.env.API_BASE_URL}/solutions/${grammarId}?limit=20`,
    {
      method: "GET",
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Page({ params }: { params: { id: string } }) {
  const data: grammar = await getGrammarData(params.id);
  const hasSolved = await getHasSolved(data.ID);
  const solvedSolutions: solutionWithUserData[] =
    Boolean(hasSolved) && (await getSolutionsWithUserData(params.id));

  return (
    <div className="min-h-[90vh] w-full mx-auto flex flex-col items-center xl:max-w-[60%] p-6">
      <ChallengeCard item={data} />
      <Spacer height="h-6" />
      <ChallengeForm data={data} />
      <Spacer height="h-4" />
      <p className="text-2xl md:text-4xl text-left w-full">Solutions</p>
      {Boolean(hasSolved) ? (
        <>
          <Spacer height="h-6 md:h-12" />
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 w-full">
            {solvedSolutions.map((solution: solutionWithUserData) => {
              return (
                <SolutionCard
                  image={solution.ClerkImage}
                  solution={solution}
                  username={solution.ClerkUsername}
                  showOptionsToggle={false}
                  key={solution.ID}
                />
              );
            })}
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-32 my-auto">
          <LockIcon />
          Solve the challenge to compare with others.
        </div>
      )}
    </div>
  );
}
