import Container from "@components/container";
import Layout from "@components/layout";
import { authorsquery, configQuery } from "@lib/groq";
import { getClient } from "@lib/sanity";
import { myLoader } from "@utils/all";
import GetImage from "@utils/getImage";
import Image from "next/image";
import Link from "next/link";

export default function About({ authors, siteconfig }) {
  return (
    <Layout {...siteconfig}>
      <Container>
        <h1 className="mt-2 mb-3 text-3xl font-semibold tracking-tight text-center lg:leading-snug text-brand-primary lg:text-4xl dark:text-white">
          About
        </h1>
        <div className="text-center">
          <p className="text-lg"> Odin Taif</p>
        </div>

        {/* <div className="grid grid-cols-3 gap-5 mt-6 mb-16 md:mt-16 md:mb-32 md:gap-16">
          {authors.slice(0, 3).map(author => (
            <Link
              key={author._id}
              href={`/businesscard/${author.slug.current}`}>
              <div className="relative overflow-hidden rounded-md aspect-square odd:translate-y-10 odd:md:translate-y-16">
                <Image
                  {...GetImage(author.image)}
                  loader={myLoader}
                  alt={author.name || " "}
                  layout="fill"
                  objectFit="cover"
                  sizes="(max-width: 320px) 100vw, 320px"
                />
              </div>
            </Link>
          ))}
        </div> */}

        <div className="mx-auto prose text-center dark:prose-invert mt-14">
          {/* <p>
            We provide real-time connectivity to enable software
            providers and financial institutions to build integrated
            products for their small business customers.
          </p> */}
          <p>
            Experienced Web Developer with a demonstrated history of
            working in information technology and services industry.
            Skilled in React, Next.js, Node.js, Design, ReactNative,
            and AWS Cloud Computing.
          </p>
          <p>
            <Link href="/contact">Get in touch</Link>
          </p>
        </div>
      </Container>
    </Layout>
  );
}

export async function getStaticProps({ params, preview = false }) {
  //console.log(params);
  const authors = await getClient(preview).fetch(authorsquery);
  const config = await getClient(preview).fetch(configQuery);
  return {
    props: {
      authors: authors,
      siteconfig: { ...config },
      preview
    },
    revalidate: 100
  };
}
