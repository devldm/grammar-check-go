import { solution } from "@/types/solution";
import { UserButton, WithUser, currentUser } from "@clerk/nextjs";
import { User } from "@clerk/nextjs/server";
import Image from "next/image";

async function getMySolutions(id: string) {
  const res = await fetch(`${process.env.API_BASE_URL}/solutions/${id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Page({ params }: { params: { id: string } }) {
  const solvedSolutions: solution[] = await getMySolutions(params.id);
  const user: User | null = await currentUser();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <UserButton afterSignOutUrl="/" />
      <div className="flex flex-col w-full md:w-[60%] gap-4">
        <h1 className="text-3xl">My Solutions</h1>
        {solvedSolutions.map((solution: solution) => {
          const dataFromCreatedAt = new Date(solution.CreatedAt);
          const readableDate = dataFromCreatedAt.toLocaleDateString("en-gb");
          return (
            <div
              key={solution.ID}
              className="border-2 border-black dark:border-white rounded-lg p-6 max-w-max flex flex-col gap-2"
            >
              <div className="flex items-center gap-1">
                <Image
                  src={user?.imageUrl!}
                  alt="user profile image"
                  width={"30"}
                  height={"30"}
                  className="rounded-full"
                />
                <p>{user?.username ?? "user"}</p>
                <p className="opacity-70 italic">solved {solution.Grammar}</p>
              </div>
              <h1>{solution.Solution}</h1>
              <p className="opacity-70">{readableDate}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
