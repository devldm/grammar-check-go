import { SignedIn, SignedOut } from "@clerk/nextjs";
import { User, currentUser } from "@clerk/nextjs/server";
import Link from "next/link";

export default async function Home() {
  const user: User | null = await currentUser();

  return (
    <main className="flex h-[80vh] flex-col justify-center items-center p-6 md:p-12 dark:text-white">
      <div className="w-full md:w-[60%] text-center">
        <h1 className="text-4xl font-semibold text-center md:text-7xl">
          Want to learn{" "}
          <span className="max-w-max bg-linear-to-r from-emerald-200 via-emerald-500 to-green-400 inline-block text-transparent bg-clip-text ">
            Korean Grammar?
          </span>
        </h1>
        <p className="text-white md:text-xl pt-4">
          We make grammar less boring and bring the communities knowledge
          together.
        </p>
        <div className="mt-6">
          <SignedIn>
            <Link href={"/challenges"}>
              <button className="btn btn-secondary rounded-md mr-4">
                Challenges
              </button>
            </Link>
            <Link href={`/profile/${user?.id}`}>
              <button className="btn btn-secondary rounded-md">Profile</button>
            </Link>
          </SignedIn>
          <SignedOut>
            <Link href={"/sign-in"}>
              <button className="btn btn-secondary rounded-md mr-4">
                Sign-in
              </button>
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
