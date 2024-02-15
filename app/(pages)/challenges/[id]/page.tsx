import ChallengeCard from "@/app/components/ChallengeCard";
import LockIcon from "@/app/components/LockIcon";
import Spacer from "@/app/components/Spacer";
import { grammar } from "@/types/grammar";
import ChallengeForm from "@/app/components/ChallengeForm";
import { currentUser } from "@clerk/nextjs";
import { User } from "@clerk/nextjs/server";
import { solutionWithUserData } from "@/types/solution";
import Image from "next/image";

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
    }
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
    }
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
          <Spacer height="h-12" />
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 w-full">
            {solvedSolutions.map((solution: solutionWithUserData) => {
              const dataFromCreatedAt = new Date(solution.CreatedAt);
              const readableDate =
                dataFromCreatedAt.toLocaleDateString("en-gb");
              return (
                <div
                  key={solution.ID}
                  className="border-2 border-black dark:border-white rounded-lg p-6 flex flex-col gap-2"
                >
                  <div className="flex items-center gap-1 flex-wrap">
                    <Image
                      src={solution.ClerkImage}
                      alt="user profile image"
                      width={"30"}
                      height={"30"}
                      className="rounded-full"
                    />
                    <p>{solution.ClerkUsername ?? "user"}</p>
                    <p className="opacity-70 italic">
                      solved {solution.Grammar}
                    </p>
                  </div>
                  <h1>{solution.Solution}</h1>
                  <p className="opacity-70">{readableDate}</p>
                </div>
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
