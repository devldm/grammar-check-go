import ProfileSection from "@/app/components/ProfileSection";
import Spacer from "@/app/components/Spacer";
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
    <div className="flex min-h-[90vh] flex-col items-center p-6 md:p-12 dark:text-white">
      <ProfileSection user={user!} />
      <Spacer height="h-6" />
      <div className="flex gap-4 flex-col items-center max-w-max">
        <h1 className="text-4xl self-start">My Solutions</h1>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
          {solvedSolutions.map((solution: solution) => {
            const dataFromCreatedAt = new Date(solution.CreatedAt);
            const readableDate = dataFromCreatedAt.toLocaleDateString("en-gb");
            return (
              <div
                key={solution.ID}
                className="border-2 border-black dark:border-white rounded-lg p-6 flex flex-col gap-2"
              >
                <div className="flex items-center gap-1 flex-wrap">
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
    </div>
  );
}
