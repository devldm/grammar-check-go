import ProfileSection from "@/app/components/ProfileSection";
import SolutionCard from "@/app/components/SolutionCard";
import { solution } from "@/types/solution";
import { backendUser } from "@/types/user";
import { currentUser } from "@clerk/nextjs/server";
import { User } from "@clerk/nextjs/server";
import { getUsersSolutions, getUser } from "@/app/data/user";
import { NotebookPen } from "lucide-react";

export default async function Page({ params }: { params: { id: string } }) {
  const solvedSolutions: solution[] = await getUsersSolutions(params.id);
  const db_user: backendUser = await getUser(params.id);
  const user: User | null = await currentUser();

  const isUserOnOwnProfile = params.id === user?.id;

  return (
    <div className="min-h-screen w-full mx-auto flex flex-col px-4 sm:px-6 lg:px-8 py-6 lg:py-8 max-w-6xl">
      <div className="w-full mb-8 lg:mb-12">
        <ProfileSection
          user={db_user}
          isUserOnOwnProfile={isUserOnOwnProfile}
        />
      </div>

      <div className="w-full">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-base-content mb-6 lg:mb-8">
          My Solutions
        </h2>

        {solvedSolutions && solvedSolutions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 lg:gap-6">
            {solvedSolutions.map((solution: solution, index: number) => {
              return (
                <SolutionCard
                  index={index}
                  solution={solution}
                  image={db_user.ClerkImage}
                  username={db_user.ClerkUsername}
                  key={solution.ID}
                  showOptionsToggle={isUserOnOwnProfile}
                  userId={params.id}
                />
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center min-h-48 lg:min-h-64 py-12 lg:py-16">
            <div className="text-center space-y-4">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-base-300 flex items-center justify-center">
                  <span className="text-2xl lg:text-3xl text-base-content/40">
                    <NotebookPen />
                  </span>
                </div>
              </div>
              <p className="text-base sm:text-lg text-base-content/60 max-w-md">
                No solutions yet. Start solving challenges to see them here!
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
