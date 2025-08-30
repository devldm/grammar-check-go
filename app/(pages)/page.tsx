import { SignedIn, SignedOut } from "@clerk/nextjs";
import { User, currentUser } from "@clerk/nextjs/server";
import Link from "next/link";

export default async function Home() {
  const user: User | null = await currentUser();

  return (
    <main className="hero min-h-[80vh] bg-base-100">
      <div className="hero-content text-center max-w-4xl px-6 md:px-12">
        <div className="max-w-none">
          <h1 className="text-4xl md:text-7xl font-bold mb-6">
            Want to learn{" "}
            <span className="text-primary bg-gradient-to-r from-primary/80 via-primary to-primary/90 bg-clip-text text-transparent">
              Korean Grammar?
            </span>
          </h1>

          <p className="text-base-content/80 text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
            We make grammar less boring and bring the communities knowledge
            together.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <SignedIn>
              <Link href={"/challenges"}>
                <button className="btn btn-primary btn-lg w-full sm:w-auto">
                  Start Challenges
                </button>
              </Link>
              <Link href={`/profile/${user?.id}`}>
                <button className="btn btn-outline btn-lg w-full sm:w-auto">
                  View Profile
                </button>
              </Link>
            </SignedIn>
            <SignedOut>
              <Link href={"/sign-in"}>
                <button className="btn btn-primary btn-lg w-full sm:w-auto">
                  Sign In
                </button>
              </Link>
              <Link href={"/sign-up"}>
                <button className="btn btn-outline btn-lg w-full sm:w-auto">
                  Sign Up
                </button>
              </Link>
            </SignedOut>
          </div>
        </div>
      </div>
    </main>
  );
}
