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
      <div className="flex gap-4 flex-col items-center max-w-max">
        <h1 className="text-4xl self-start">Challenges</h1>
        <Spacer height="h-4" />
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
          {data.map((item: grammar) => {
            return (
              <Link key={item.ID} href={`challenges/${item.ID}`}>
                <div className="border-2 border-black dark:border-white rounded-lg p-6 max-w-md">
                  <h1 className="text-2xl">{item.Grammar}</h1>
                  <p className="dark:text-[#e6e6e6]">
                    {item.Description.String}
                  </p>
                  <br></br>
                  <div className="text-sm border-2 border-orange-500 max-w-max p-2 rounded-full">
                    <p>{item.Difficulty.String}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      <Spacer height="h-24" />
      <h2 className="text-4xl">More coming soon...</h2>
    </main>
  );
}
