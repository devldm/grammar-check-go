import ChallengeCard from "@/app/components/ChallengeCard";
import LockIcon from "@/app/components/LockIcon";
import Spacer from "@/app/components/Spacer";
import { grammar } from "@/types/grammar";

async function getGrammarData(id: string) {
  const res = await fetch(`${process.env.API_BASE_URL}/grammars/${id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Page({ params }: { params: { id: string } }) {
  const data: grammar = await getGrammarData(params.id);

  return (
    <div className="min-h-[90vh] w-full mx-auto flex flex-col items-center md:max-w-[60%] p-6">
      <ChallengeCard item={data} />
      <Spacer height="h-6" />
      <div>
        <p className="text-xl">Submit a solution and compare with others!</p>
        <Spacer height="h-4" />
        <textarea
          placeholder={`${data.Grammar}`}
          className="p-6 w-full rounded-md"
        />
        <Spacer height="h-4" />
        <button className="btn btn-secondary rounded-md">Submit</button>
      </div>
      <Spacer height="h-4" />
      <p className="text-2xl md:text-4xl text-left w-full">Solutions</p>
      <div className="flex flex-col items-center justify-center min-h-32 my-auto">
        <LockIcon />
        Solve the challenge to compare with others.
      </div>
    </div>
  );
}
