import LockIcon from "@/app/components/LockIcon";
import Spacer from "@/app/components/Spacer";
import { grammar } from "@/types/grammar";
import ChallengeForm from "@/app/components/ChallengeForm";
import { solutionWithUserData } from "@/types/solution";
import SolutionCard from "@/app/components/SolutionCard";
import { getHasUserSolvedGrammar, getGrammarById } from "@/app/data/grammar";
import { getSolutionsWithUserData } from "@/app/data/solutions";

export default async function Page({ params }: { params: { id: string } }) {
  const data: grammar = await getGrammarById(params.id);
  const hasSolved = await getHasUserSolvedGrammar(data.ID);
  const solvedSolutions: solutionWithUserData[] =
    Boolean(hasSolved) && (await getSolutionsWithUserData(params.id));

  return (
    <div className="min-h-[90vh] w-full mx-auto flex flex-col items-center xl:max-w-[60%] p-6">
      <div className="w-full flex justify-between flex-wrap xl:max-w-[60%]">
        <p className="text-lg font-bold md:text-2xl">{data.Grammar}</p>
        <p className="max-w-max rounded-full text-sm px-2 py-1 text-orange-500 bg-gray-700 font-medium">
          {data.Difficulty.String}
        </p>
      </div>
      <p className="pt-4 md:text-lg first-letter:capitalize">
        {data.Description.String}
      </p>
      <Spacer height="md:h-6 h-2" />
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
