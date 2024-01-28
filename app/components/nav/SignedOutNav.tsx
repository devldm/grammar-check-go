import Link from "next/link";

export default async function SignedOutNavbar() {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link href={"/"} className="btn btn-ghost text-xl">
          GrammarCheck
        </Link>
      </div>
    </div>
  );
}
