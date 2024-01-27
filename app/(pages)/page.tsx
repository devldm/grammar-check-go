import Link from "next/link";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-12 dark:text-white">
      <Link className="text-2xl text-blue-500 font-bold" href={"/challenges"}>
        Challenges
      </Link>
      <Link className="text-2xl text-blue-500 font-bold" href={"/profile"}>
        Profile
      </Link>
    </main>
  );
}
