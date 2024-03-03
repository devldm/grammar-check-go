import ChallengeCard from "@/app/components/ChallengeCard";
import Spacer from "@/app/components/Spacer";
import { grammar } from "@/types/grammar";
import Link from "next/link";
import { getAllGrammars } from "@/app/data/grammar";

export default async function Page() {
  const data: grammar[] = await getAllGrammars()
  return (
    <main className="flex min-h-[90vh] flex-col items-center p-6 md:p-12 dark:text-white">
      <div className="max-w-max">
        <h1 className="text-2xl md:text-4xl font-semibold">Challenges</h1>
        <p className="md:text-lg pt-2">Challenge your korean grammar skills by selecting a grammar challenge below.</p>
        <Spacer height="h-6" />
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
          {data ? (
            data.map((item: grammar) => {
              return (
                <Link key={item.ID} href={`challenges/${item.ID}`}>
                  <ChallengeCard item={item} />
                </Link>
              );
            })
          ) : (
            <>No challenges found</>
          )}
        </div>
      </div>
      <h2 className="text-2xl md:text-4xl py-12">More coming soon...</h2>
    </main>
  );
}

