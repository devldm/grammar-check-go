import { SignedIn, SignedOut, currentUser } from "@clerk/nextjs";
import { User } from "@clerk/nextjs/server";
import Link from "next/link";

export default async function Home() {
  const user: User | null = await currentUser();

  return (
    <main className="flex h-[80vh] flex-col justify-center items-center p-12 dark:text-white">
      <div className="w-full md:w-[60%] flex flex-col gap-2 items-center">
        <h1 className="text-5xl font-bold md:text-7xl">GrammarCheck</h1>
        <p className="text-lg italic text-white md:text-xl opacity-60">
          Your home for Korean grammar challenges
        </p>
        <div className="flex gap-4 mt-6">
          <SignedIn>
            <Link href={"/challenges"}>
              <button className="btn btn-secondary rounded-md">
                Challenges
              </button>
            </Link>
            <Link href={"/profile"}>
              <button className="btn btn-secondary rounded-md">Profile</button>
            </Link>
          </SignedIn>
          <SignedOut>
            <Link href={"/sign-in"}>
              <button className="btn btn-secondary rounded-md">Sign-in</button>
            </Link>
            <Link href={"/sign-up"}>
              <button className="btn btn-secondary rounded-md">Sign-up</button>
            </Link>
          </SignedOut>
        </div>
      </div>
    </main>
  );
}
