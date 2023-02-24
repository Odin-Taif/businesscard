import Container from "@components/container";
import Layout from "@components/layout";
import QrModal from "../../components/qrmodal";
import AuthorCard from "@components/blog/authorCard";
import { getClient, client } from "@lib/sanity";
import { useState } from "react";
import Link from "next/link";
import { RiArrowGoBackFill } from "react-icons/ri";
import { BiLinkExternal } from "react-icons/bi";
import {
  configQuery,
  pathAuthorquery,
  singalAuthorsquery
} from "@lib/groq";

export default function Businesscard({ siteconfig, author }) {
  // console.log(siteconfig);
  // const { social } = author;
  // console.log(social);
  const [showQr, setshowQr] = useState(false);
  let myFunc = () => {
    myFunc = function () {}; // kill it as soon as it was called
    console.log("call once and never again!"); // your stuff here
  };
  return (
    // <Layout {...siteconfig}>
    <Container>
      <div className={""}>
        <section className={"flex flex-col"}>
          <div className="max-w-[7%] flex flex-row cursor-pointer hover:text-teal-700">
            <Link href={"/"} className="">
              <a>
                <RiArrowGoBackFill size={25} /> | Home
              </a>
            </Link>
          </div>
          {author && <AuthorCard author={author} />}
          {/* {author.bio && <PortableText value={author.bio} />} */}
          <div className={""}>
            {author?.social?.map(item => (
              <Link href={item.href} key={item._key}>
                <a target="_blank">
                  <div className="px-8 py-8 mt-3 text-gray-500 rounded-2xl bg-gray-50 dark:bg-gray-900 dark:text-gray-400">
                    <div className="flex flex-wrap items-start sm:space-x-6 sm:flex-nowrap text-teal-700 text-xl hover:text-gray-500">
                      <BiLinkExternal size={25} className="mr-4" />
                      {item.media.toUpperCase()}
                    </div>
                  </div>
                </a>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </Container>
    // </Layout>
  );
}

export async function getStaticProps({ params, preview = false }) {
  //console.log(params);
  const authorbusiness = await getClient(preview).fetch(
    singalAuthorsquery,
    {
      slug: params.slug
    }
  );

  const config = await getClient(preview).fetch(configQuery);
  return {
    props: {
      author: { ...authorbusiness },
      siteconfig: { ...config },
      preview
    },
    revalidate: 10
  };
}

export async function getStaticPaths() {
  const allAuthors = await client.fetch(pathAuthorquery);
  return {
    paths:
      allAuthors?.map(author => ({
        params: {
          slug: author.slug
        }
      })) || [],
    fallback: true
  };
}
