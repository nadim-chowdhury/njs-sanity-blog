import { Post } from "@/lib/interface";
import { client } from "@/lib/sanity";
import Link from "next/link";

async function getData() {
  const query = `*[_type == "post"]`;

  const data = await client.fetch(query);

  return data;
}

export default async function Home() {
  const data = (await getData()) as Post[];

  return (
    <section className="divide-y divide-gray-300 dark:divide-gray-600">
      <div className="space-y-2 pt-6 pb-8 md:space-y-5">
        <h2 className="text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-gray-100 text-center">
          All Posts
        </h2>
      </div>

      <ul className="pt-4">
        {data.map((post) => (
          <li key={post._id} className="py-4">
            <article className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
              <p className="text-emerald-500">
                {new Date(post._createdAt).toISOString().split("T")[0]}
              </p>

              <div className="space-y-4 xl:col-span-3 text-justify">
                <h3 className="text-xl font-bold leading-8 tracking-tight text-gray-900 dark:text-gray-100">
                  {post.title}
                </h3>

                <p className="prose max-w-none text-gray-600 dark:text-gray-400 pb-4">
                  {post.overview}
                </p>

                <Link
                  href={`/post/${post.slug.current}`}
                  prefetch
                  className="text-emerald-500"
                >
                  Read More
                </Link>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
