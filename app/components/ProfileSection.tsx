import { SignOutButton } from "@clerk/nextjs";
import { User } from "@clerk/nextjs/server";
import Image from "next/image";

export default function ProfileSection(user: { user: User }) {
  return (
    <div className="w-full md:w-[90%] lg:w-[65%] flex items-center justify-between">
      <div className="flex flex-wrap justify-center gap-4 items-center">
        <Image
          src={user.user.imageUrl}
          alt="user profile image"
          width={"60"}
          height={"60"}
          className="rounded-full"
        />
        <h1 className="text-xl md:text-4xl">{user.user.username}</h1>
      </div>

      <SignOutButton>
        <button className="btn btn-secondary rounded-md">Sign out</button>
      </SignOutButton>
    </div>
  );
}
