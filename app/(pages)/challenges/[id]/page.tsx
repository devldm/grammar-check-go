import LockIcon from "@/app/components/LockIcon";
import { grammar } from "@/types/grammar";
import ChallengeForm from "@/app/components/ChallengeForm";
import { solutionWithUserData } from "@/types/solution";
import SolutionCard from "@/app/components/SolutionCard";
import { getHasUserSolvedGrammar, getGrammarById } from "@/app/data/grammar";
import { getSolutionsWithUserData } from "@/app/data/solutions";
import DifficultyBadge from "@/app/components/DifficultyBadge";

export default async function Page({ params }: { params: { id: string } }) {
  const data: grammar = await getGrammarById(params.id);
  const hasSolved = await getHasUserSolvedGrammar(data.ID);
  const solvedSolutions: solutionWithUserData[] =
    Boolean(hasSolved) && (await getSolutionsWithUserData(params.id));

  return (
    <div className="min-h-screen w-full mx-auto flex flex-col p-6 md:p-12 max-w-6xl">
      <div className="w-full mb-8 lg:mb-12">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-6">
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-base-content break-words">
              {data.Grammar}
            </h1>
          </div>
          <div className="flex-shrink-0">
            <DifficultyBadge difficulty={data.Difficulty.String} />
          </div>
        </div>

        <p className="text-base sm:text-lg lg:text-xl text-base-content/80 leading-relaxed first-letter:capitalize mb-6 lg:mb-8">
          {data.Description.String}
        </p>

        <div className="flex justify-center">
          <div className="w-full max-w-2xl">
            <ChallengeForm data={data} />
          </div>
        </div>
      </div>

      <div className="w-full">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-base-content mb-6 lg:mb-8">
          Solutions
        </h2>

        {Boolean(hasSolved) ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3  gap-4 lg:gap-6">
            {solvedSolutions.map((solution: solutionWithUserData, index) => {
              return (
                <SolutionCard
                  image={solution.ClerkImage}
                  solution={solution}
                  username={solution.ClerkUsername}
                  showOptionsToggle={false}
                  key={solution.ID}
                  index={index}
                />
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center min-h-48 lg:min-h-64 py-12 lg:py-16">
            <div className="text-center space-y-4">
              <div className="flex justify-center mb-4">
                <LockIcon className="w-12 h-12 lg:w-16 lg:h-16 text-base-content/40" />
              </div>
              <p className="text-base sm:text-lg text-base-content/60 max-w-md">
                Solve the challenge to compare with others.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
