import ProfileSection from "@/app/components/ProfileSection";
import SolutionCard from "@/app/components/SolutionCard";
import Spacer from "@/app/components/Spacer";
import { solution } from "@/types/solution";
import { backendUser } from "@/types/user";
import { currentUser } from "@clerk/nextjs/server";
import { User } from "@clerk/nextjs/server";
import { getUsersSolutions, getUser } from "@/app/data/user";

export default async function Page({ params }: { params: { id: string } }) {
  const solvedSolutions: solution[] = await getUsersSolutions(params.id);
  const db_user: backendUser = await getUser(params.id);
  const user: User | null = await currentUser();

  const isUserOnOwnProfile = params.id === user?.id;

  return (
    <div className="flex min-h-[90vh] flex-col items-center p-6 md:p-12 w-full md:max-w-max mx-auto xl:max-w-[60%]">
      <ProfileSection user={db_user!} isUserOnOwnProfile={isUserOnOwnProfile} />
      <Spacer height="h-6" />
      <div className="flex gap-4 flex-col items-center w-full md:max-w-max">
        <h1 className="text-xl md:text-3xl self-start">My Solutions</h1>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 w-full">
          {solvedSolutions ? (
            solvedSolutions.map((solution: solution) => {
              return (
                <SolutionCard
                  solution={solution}
                  image={db_user.ClerkImage}
                  username={db_user.ClerkUsername}
                  key={solution.ID}
                  showOptionsToggle={isUserOnOwnProfile}
                  userId={params.id}
                />
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
