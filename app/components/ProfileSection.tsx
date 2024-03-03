import { backendUser } from "@/types/user";
import { SignOutButton } from "@clerk/nextjs";
import Image from "next/image";

export default function ProfileSection({
  user,
  isUserOnOwnProfile,
}: {
  user: backendUser;
  isUserOnOwnProfile: boolean;
}) {
  return (
    <div className="w-full flex items-center justify-between">
      <div className="flex flex-wrap justify-center gap-4 items-center">
        <Image
          src={user.ClerkImage}
          alt="user profile image"
          width={"40"}
          height={"40"}
          className="rounded-full"
        />
        <h1 className="text-xl md:text-3xl">{user.ClerkUsername}</h1>
      </div>

      {isUserOnOwnProfile && (
        <SignOutButton>
          <button className="btn btn-secondary rounded-md">Sign out</button>
        </SignOutButton>
      )}
    </div>
  );
}
