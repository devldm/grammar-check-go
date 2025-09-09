import ProfileSection from "@/app/components/ProfileSection";
import SolutionCard from "@/app/components/SolutionCard";
import { solution } from "@/types/solution";
import { backendUser } from "@/types/user";
import { currentUser } from "@clerk/nextjs/server";
import { User } from "@clerk/nextjs/server";
import { getUsersSolutions, getUser } from "@/app/data/user";
import { NotebookPen, Trophy, Target } from "lucide-react";

export default async function Page({ params }: { params: { id: string } }) {
  const solvedSolutions: solution[] = await getUsersSolutions(params.id);
  const db_user: backendUser = await getUser(params.id);
  const user: User | null = await currentUser();
  const isUserOnOwnProfile = params.id === user?.id;

  return (
    <div className="min-h-screen">
      <div className="w-full mx-auto flex flex-col px-4 sm:px-6 lg:px-8 py-6 lg:py-8 max-w-6xl">
        <section className="w-full mb-8 lg:mb-12">
          <ProfileSection
            user={db_user}
            isUserOnOwnProfile={isUserOnOwnProfile}
          />
        </section>

        {solvedSolutions && solvedSolutions.length > 0 && (
          <section className="mb-8 lg:mb-12">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6">
              <div className="bg-base-200 border-base-300 rounded-lg border p-4 lg:p-6">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <Trophy className="h-6 w-6 text-yellow-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Total Solutions
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {solvedSolutions.length}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-base-200 border-base-300 rounded-lg border p-4 lg:p-6">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <Target className="h-6 w-6 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Grammar Topics
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {new Set(solvedSolutions.map((s) => s.Grammar)).size}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-base-200 border-base-300 rounded-lg border p-4 lg:p-6">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <NotebookPen className="h-6 w-6 text-green-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Latest Solution
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white truncate">
                      {solvedSolutions.length > 0
                        ? new Date(
                            solvedSolutions[0].CreatedAt,
                          ).toLocaleDateString()
                        : "None"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        <section className="w-full">
          <div className="flex items-center justify-between mb-6 lg:mb-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
              {isUserOnOwnProfile
                ? "My Solutions"
                : `${db_user.ClerkUsername}'s Solutions`}
            </h2>
            {solvedSolutions && solvedSolutions.length > 0 && (
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
                {solvedSolutions.length} solution
                {solvedSolutions.length !== 1 ? "s" : ""}
              </span>
            )}
          </div>

          {solvedSolutions && solvedSolutions.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-4 lg:gap-6">
              {solvedSolutions.map((solution: solution, index: number) => {
                return (
                  <div
                    key={solution.ID}
                    className="transform transition-all duration-200 hover:scale-[1.02] hover:shadow-lg h-min"
                  >
                    <SolutionCard
                      index={index}
                      solution={solution}
                      image={db_user.ClerkImage}
                      username={db_user.ClerkUsername}
                      showOptionsToggle={isUserOnOwnProfile}
                      userId={params.id}
                    />
                  </div>
                );
              })}
            </div>
          ) : (
            <EmptyState isUserOnOwnProfile={isUserOnOwnProfile} />
          )}
        </section>
      </div>
    </div>
  );
}

function EmptyState({ isUserOnOwnProfile }: { isUserOnOwnProfile: boolean }) {
  return (
    <div className="bg-base-100 rounded-xl border-2 border-dashed border-base-300">
      <div className="flex flex-col items-center justify-center py-16 lg:py-24 px-6">
        <div className="text-center space-y-6">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-base-200 flex items-center justify-center">
              <NotebookPen className="w-8 h-8 lg:w-10 lg:h-10 text-base-content/40" />
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg lg:text-xl font-semibold text-base-content">
              {isUserOnOwnProfile
                ? "No solutions yet"
                : "No solutions to display"}
            </h3>
            <p className="text-base text-base-content/60 max-w-md mx-auto">
              {isUserOnOwnProfile
                ? "Start solving Korean grammar challenges to build your solution portfolio!"
                : "This user hasn't solved any challenges yet."}
            </p>
          </div>

          {isUserOnOwnProfile && (
            <div className="pt-4">
              <a href="/challenges" className="btn btn-primary">
                <Target className="w-5 h-5 mr-2" />
                Browse Challenges
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
