import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="w-full flex flex-col min-h-screen items-center justify-center">
      <SignUp afterSignInUrl={"/"} />
    </div>
  );
}
