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
  LocationMarkerIcon,
  MailIcon,
  PhoneIcon
} from "@heroicons/react/outline";
import qrlogo from "../../public/Assests/qrcodepic.png";
import Image from "next/image";
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
        <div className="my-10  text-gray-500 rounded-2xl bg-gray-50 dark:bg-gray-900 dark:text-gray-400 ">
          <h2 className="text-2xl font-semibold dark:text-white">
            Contact Odin
          </h2>
          <div className="relative m-4 overflow-hidden rounded-md aspect-square odd:translate-y-10 odd:md:translate-y-6 w-40">
            <Image
              alt="qrlogo"
              src={qrlogo}
              layout="fill"
              objectFit="cover"
              sizes="(max-width: 200px) 100vw, 200px"
              loader={() => value}
              unoptimized={true}
            />
          </div>
          <div className="mt-5">
            <div className="flex items-center mt-2 space-x-2 text-dark-600 dark:text-gray-400">
              <LocationMarkerIcon className="w-4 h-4" />
              <span>Rosendalsvagen 23m, Uppsala</span>
            </div>
            {siteconfig?.email && (
              <div className="flex items-center mt-2 space-x-2 text-dark-600 dark:text-gray-400">
                <MailIcon className="w-4 h-4" />
                <a href={`mailto:${siteconfig.email}`}>
                  {siteconfig.email}
                </a>
              </div>
            )}
            {siteconfig?.phone && (
              <div className="flex items-center mt-2 space-x-2 text-dark-600 dark:text-gray-400">
                <PhoneIcon className="w-4 h-4" />
                <a href={`tel:${siteconfig.phone}`}>
                  {siteconfig.phone}
                </a>
              </div>
            )}
          </div>
        </div>
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
