"use server"

export async function getUsersSolutions(id: string) {
  const res = await fetch(`${process.env.API_BASE_URL}/solutions/user/${id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export async function getUser(clerkId: string) {
  const res = await fetch(`${process.env.API_BASE_URL}/user/${clerkId}`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}


