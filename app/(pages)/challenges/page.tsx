import ChallengeCard from "@/app/components/ChallengeCard";
import SolvedSolutionCard from "@/app/components/SolvedSolutionCard";
import Spacer from "@/app/components/Spacer";
import { grammar } from "@/types/grammar";
import Link from "next/link";
import { getAllGrammars } from "@/app/data/grammar";
import { getUsersSolutions } from "@/app/data/user";
import { solution } from "@/types/solution";
import { User, currentUser } from "@clerk/nextjs/server";

type GrammarWithSolution = grammar & {
  Solution: string;
};

export default async function Page() {
  const data: grammar[] = await getAllGrammars();
  const user: User | null = await currentUser();
  let userSolutions: solution[] = [];

  if (user) {
    userSolutions = await getUsersSolutions(user.id);
  }

  // Create a map of GrammarID to Solution for quick lookup
  const solutionMap = new Map(
    userSolutions.map((sol) => [sol.GrammarID, sol.Solution]),
  );

  const unsolvedChallenges = data.filter((item) => !solutionMap.has(item.ID));

  // Merge grammar data with solutions for solved challenges
  const solvedChallenges: GrammarWithSolution[] = data
    .filter((item) => solutionMap.has(item.ID))
    .map((item) => ({
      ...item,
      Solution: solutionMap.get(item.ID)!,
    }));

  return (
    <main className="flex min-h-[90vh] flex-col items-center p-6 md:p-12 dark:text-white">
      <div className="w-full max-w-6xl">
        <div className="mb-8">
          <h1 className="text-2xl md:text-4xl font-semibold">Challenges</h1>
          <p className="md:text-lg pt-2 text-gray-600 dark:text-gray-300">
            Challenge your korean grammar skills by selecting a grammar
            challenge below.
          </p>
        </div>

        <Spacer height="h-6" />
        {/*TODO: Add filters*/}
        {/* <select className="select select-bordered w-full max-w-xs"> */}
        {/*   <option disabled selected> */}
        {/*     Difficulty */}
        {/*   </option> */}
        {/*   <option className="text-green-500">Beginner</option> */}
        {/*   <option className="text-orange-500">Intermediate</option> */}
        {/*   <option className="text-red-500">Advanced</option> */}
        {/* </select> */}

        {unsolvedChallenges.length > 0 && (
          <section className="mb-12">
            <h2 className="text-xl md:text-2xl font-semibold mb-6 ">
              Available Challenges ({unsolvedChallenges.length})
            </h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {unsolvedChallenges.map((item: grammar) => {
                return (
                  <Link key={item.ID} href={`challenges/${item.ID}`}>
                    <ChallengeCard item={item} solved={[]} />
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {solvedChallenges.length > 0 && (
          <section>
            <h2 className="text-xl md:text-2xl font-semibold mb-6  text-green-600 dark:text-green-400">
              Solved Challenges ({solvedChallenges.length})
            </h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {solvedChallenges.map((item: GrammarWithSolution) => {
                return (
                  <Link key={item.ID} href={`challenges/${item.ID}`}>
                    <SolvedSolutionCard item={item} />
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {unsolvedChallenges.length === 0 && solvedChallenges.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              No challenges available at the moment.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
