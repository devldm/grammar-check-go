import ChallengeCard from "@/app/components/ChallengeCard";
import Spacer from "@/app/components/Spacer";
import { grammar } from "@/types/grammar";
import Link from "next/link";
import { getAllGrammars } from "@/app/data/grammar";
import { getUsersSolutions } from "@/app/data/user";
import { solution } from "@/types/solution";
import { User, currentUser } from "@clerk/nextjs/server";

export default async function Page() {
  const data: grammar[] = await getAllGrammars();
  const user: User | null = await currentUser();
  let solvedSolutions: solution[];

  if (user) {
    solvedSolutions = await getUsersSolutions(user.id);
  }

  return (
    <main className="flex min-h-[90vh] flex-col items-center p-6 md:p-12 dark:text-white">
      <div className="max-w-max">
        <h1 className="text-2xl md:text-4xl font-semibold">Challenges</h1>
        <p className="md:text-lg pt-2">
          Challenge your korean grammar skills by selecting a grammar challenge
          below.
        </p>
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

        <Spacer height="h-6" />
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 overflow-y-scroll">
          {data ? (
            data.map((item: grammar) => {
              return (
                <Link key={item.ID} href={`challenges/${item.ID}`}>
                  <ChallengeCard item={item} solved={solvedSolutions} />
                </Link>
              );
            })
          ) : (
            <>No challenges found</>
          )}
        </div>
      </div>
    </main>
  );
}
