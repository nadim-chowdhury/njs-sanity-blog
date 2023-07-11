import { Post } from "@/lib/interface";
import { client } from "@/lib/sanity";
import { urlFor } from "@/lib/sanityImageUrl";
import { PortableText } from "@portabletext/react";
import Image from "next/image";

async function getData(slug: string) {
  const query = `*[_type == "post" && slug.current == "${slug}"][0]`;

  const data = await client.fetch(query);

  return data;
}

export default async function SlugPage({
  params,
}: {
  params: { slug: string };
}) {
  const data = (await getData(params.slug)) as Post;

  const portableTextComponent = {
    types: {
      image: ({ value }: { value: any }) => (
        <Image
          src={urlFor(value).url()}
          alt="img"
          className="rounded-lg"
          width={1280}
          height={720}
        />
      ),
    },
  };

  return (
    <div className="divide-y divide-gray-300 dark:divide-gray-700">
      <header className="pt-6 xl:pb-6">
        <div className="space-y-1 text-center">
          <div className="space-y-10">
            <div>
              <p className="leading-6 text-emerald-500">
                {new Date(data._createdAt).toISOString().split("T")[0]}
              </p>
            </div>
          </div>

          <div>
            <h1 className="text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-gray-100">
              {data.title}
            </h1>
          </div>
        </div>
      </header>

      <div className="divide-y divide-gray-200 pb-7 dark:divide-gray-700">
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          <div className="prose max-w-none pb-8 pt-10 dark:prose-invert prose-lg text-justify">
            <PortableText
              value={data.content}
              components={portableTextComponent}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
