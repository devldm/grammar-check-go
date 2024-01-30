"use server";

import { grammar } from "@/types/grammar";
import { solutionPost } from "@/types/solution";
import { currentUser } from "@clerk/nextjs";
import { User } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function postChallenge(grammarData: grammar, formData: FormData) {
  const user: User | null = await currentUser();

  if (!user) {
    return { message: "Failed to fetch user id" };
  }

  const solution = formData.get("solution");

  if (!solution) {
    return { message: "No solution found in form" };
  }

  const rawFormData: solutionPost = {
    solution: solution! as string,
    grammar_id: grammarData.ID,
    user_id: user.id,
  };

  try {
    await fetch(`${process.env.API_BASE_URL}/solutions`, {
      method: "POST",
      body: JSON.stringify(rawFormData),
    });

    revalidatePath(`/profile/${user.id}`);
    revalidatePath(`/challenges/${grammarData.ID}`);

    return {
      message: "Successfully submitted challenge",
      success: true,
    };
  } catch (e) {
    return { message: `Server Error: ${e}`, success: false };
  }
}
