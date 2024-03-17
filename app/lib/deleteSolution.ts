"use server";

import { revalidatePath } from "next/cache";

export async function deleteSolution(id: string, userId: string) {
  const postBody = {
    id: id,
  };

  await fetch(`${process.env.API_BASE_URL}/solutions/delete`, {
    method: "POST",
    body: JSON.stringify(postBody),
  });

  revalidatePath(`/profile/${userId}`);
}
