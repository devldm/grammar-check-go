import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="w-full flex flex-col min-h-[75vh] items-center justify-center">
      <SignUp fallbackRedirectUrl={"/"} />
    </div>
  );
}
