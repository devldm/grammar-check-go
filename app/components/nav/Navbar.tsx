import { SignedIn, currentUser } from "@clerk/nextjs";
import { User } from "@clerk/nextjs/server";
import Link from "next/link";

export default async function AuthdNavbar() {
  const user: User | null = await currentUser();
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link href={"/"} className="btn btn-ghost text-xl">
          GrammarCheck
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu-horizontal px-1 hidden md:menu md:menu-horizontal text-xl">
          <li>
            <Link className="text-lg" href={"/challenges"}>
              Challenges
            </Link>
          </li>
          <li>
            <Link className="text-lg" href={`/profile/${user?.id}`}>
              Profile
            </Link>
          </li>
          {/* <ThemeChanger /> */}
        </ul>

        <div className="dropdown dropdown-end md:hidden text-xl">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link className="text-lg" href={"/challenges"}>
                Challenges
              </Link>
            </li>
            <li>
              <Link className="text-lg" href={`/profile/${user!.id}`}>
                Profile
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
