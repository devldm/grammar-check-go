import ChallengeCard from "@/app/components/ChallengeCard";
import Spacer from "@/app/components/Spacer";
import { grammar } from "@/types/grammar";
import Link from "next/link";

async function getData() {
  const res = await fetch(`${process.env.API_BASE_URL}/grammars`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Page() {
  const data = await getData();
  return (
    <main className="flex min-h-[90vh] flex-col items-center p-6 md:p-12 dark:text-white">
      <div className="max-w-max">
        <h1 className="text-4xl">Challenges</h1>
        <Spacer height="h-16" />
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
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
      <Spacer height="h-24" />
      <h2 className="text-4xl">More coming soon...</h2>
    </main>
  );
}
