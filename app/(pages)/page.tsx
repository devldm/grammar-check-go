async function getData() {
  const res = await fetch(`${process.env.API_BASE_URL}/grammars`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Home() {
  const data = await getData();
  console.log(data);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-12 dark:text-white">
      <div className="flex flex-col gap-4 w-full items-center">
        {data.map((item) => {
          return (
            <div
              key={item.ID}
              className="border-2 border-black dark:border-white rounded-lg p-6 w-full md:w-[60%]"
            >
              <h1 className="text-2xl">{item.Grammar}</h1>
              <p className="dark:text-[#e6e6e6]">{item.Description.String}</p>
              <br></br>
              <div className="text-sm border-2 border-orange-500 max-w-max p-2 rounded-full">
                <p>{item.Difficulty.String}</p>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
