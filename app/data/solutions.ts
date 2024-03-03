"use server"

export async function getSolutionsWithUserData(grammarId: string) {
  const res = await fetch(
    `${process.env.API_BASE_URL}/solutions/${grammarId}?limit=20`,
    {
      method: "GET",
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}


