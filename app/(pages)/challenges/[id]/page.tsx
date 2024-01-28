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
    <div className="border-2 border-black dark:border-white rounded-lg p-6 w-full md:w-[60%]">
      <h1 className="text-2xl">{data.Grammar}</h1>
      <p className="dark:text-[#e6e6e6]">{data.Description.String}</p>
      <br></br>
      <div className="text-sm border-2 border-orange-500 max-w-max p-2 rounded-full">
        <p>{data.Difficulty.String}</p>
      </div>
    </div>
  );
}
