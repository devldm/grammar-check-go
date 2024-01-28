import Spacer from "@/app/components/Spacer";

async function getGrammarData(id: string) {
  const res = await fetch(`${process.env.API_BASE_URL}/grammars/${id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Page({ params }: { params: { id: string } }) {
  const data = await getGrammarData(params.id);

  return (
    <main className="w-full flex flex-col items-center">
      <div className="min-h-[90vh] w-full flex flex-col items-center md:max-w-[60%] p-6">
        <div className="border-2 border-black dark:border-white rounded-lg p-6 w-full md:w-[50%]">
          <h1 className="text-2xl">{data.Grammar}</h1>
          <p className="dark:text-[#e6e6e6]">{data.Description.String}</p>
          <br></br>
          <div className="text-sm border-2 border-orange-500 max-w-max p-2 rounded-full">
            <p>{data.Difficulty.String}</p>
          </div>
        </div>
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
            />
          </svg>
          Solve the challenge to compare with others.
        </div>
      </div>
    </main>
  );
}
