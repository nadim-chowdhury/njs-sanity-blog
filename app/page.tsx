import { client } from "@/lib/sanity";

async function getData() {
  const query = `*[_type == "post"]`;

  const data = await client.fetch(query);

  return data;
}

export default async function Home() {
  const data = await getData();

  return <section>Hello</section>;
}
