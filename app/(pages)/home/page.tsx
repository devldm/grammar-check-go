import { SignIn, UserButton, currentUser, useUser } from "@clerk/nextjs";
import { User, getAuth } from "@clerk/nextjs/server";
import Link from "next/link";

export default async function Home() {
  const user: User | null = await currentUser();

  return (
    <main className="flex min-h-screen flex-col items-center p-12 dark:text-white">
      <Link className="text-2xl text-blue-500 font-bold" href={"/challenges"}>
        Challenges
      </Link>
      <Link
        className="text-2xl text-blue-500 font-bold"
        href={`/profile/${user!.id}`}
      >
        Profile
      </Link>
    </main>
  );
}
