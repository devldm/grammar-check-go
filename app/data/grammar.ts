"use server";

import { currentUser } from "@clerk/nextjs/server";
import { User } from "@clerk/nextjs/server";

export async function getAllGrammars() {
  const res = await fetch(`${process.env.API_BASE_URL}/grammars`, {
    method: "GET",
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export async function getGrammarById(id: string) {
  const res = await fetch(`${process.env.API_BASE_URL}/grammars/${id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export async function getHasUserSolvedGrammar(grammarId: string) {
  const user: User | null = await currentUser();

  const res = await fetch(
    `${process.env.API_BASE_URL}/solutions/${user?.id}/${grammarId}`,
    {
      method: "GET",
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return await res.json();
}
