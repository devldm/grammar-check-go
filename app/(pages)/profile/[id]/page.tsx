import ProfileSection from "@/app/components/ProfileSection";
import Spacer from "@/app/components/Spacer";
import { solution } from "@/types/solution";
import { backendUser } from "@/types/user";
import { currentUser } from "@clerk/nextjs";
import { User } from "@clerk/nextjs/server";
import Image from "next/image";

async function getUsersSolutions(id: string) {
  const res = await fetch(`${process.env.API_BASE_URL}/solutions/user/${id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

async function getUser(clerkId: string) {
  const res = await fetch(`${process.env.API_BASE_URL}/user/${clerkId}`);

  if (!res.ok) {
    console.log(res);
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Page({ params }: { params: { id: string } }) {
  const solvedSolutions: solution[] = await getUsersSolutions(params.id);
  const db_user: backendUser = await getUser(params.id);
  const user: User | null = await currentUser();

  const isUserOnOwnProfile = params.id === user?.id;

  return (
    <div className="flex min-h-[90vh] flex-col items-center p-6 md:p-12 dark:text-white">
      <ProfileSection user={db_user!} isUserOnOwnProfile={isUserOnOwnProfile} />
      <Spacer height="h-6" />
      <div className="flex gap-4 flex-col items-center max-w-max">
        <h1 className="text-4xl self-start">My Solutions</h1>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
          {solvedSolutions ? (
            solvedSolutions.map((solution: solution) => {
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
                      src={db_user.ClerkImage!}
                      alt="user profile image"
                      width={"30"}
                      height={"30"}
                      className="rounded-full"
                    />
                    <p>{db_user?.ClerkUsername ?? "user"}</p>
                    <p className="opacity-70 italic">
                      solved {solution.Grammar}
                    </p>
                  </div>
                  <h1>{solution.Solution}</h1>
                  <p className="opacity-70">{readableDate}</p>
                </div>
              );
            })
          ) : (
            <>No solutions solved</>
          )}
        </div>
      </div>
    </div>
  );
}
