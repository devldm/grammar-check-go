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
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
      <div className="flex items-center gap-4">
        <div className="avatar">
          <div className="w-12 h-12 md:w-16 md:h-16 rounded-full">
            <Image
              src={user.ClerkImage}
              alt="user profile image"
              width={64}
              height={64}
              className="rounded-full object-cover"
            />
          </div>
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-base-content">
          {user.ClerkUsername}
        </h1>
      </div>
      {isUserOnOwnProfile && (
        <div className="flex-shrink-0">
          <SignOutButton>
            <button className="btn btn-outline btn-sm">Sign out</button>
          </SignOutButton>
        </div>
      )}
    </div>
  );
}
