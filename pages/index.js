import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { NextSeo } from "next-seo";
import Layout from "@components/layout";
import Container from "@components/container";
import { useRouter } from "next/router";
import { RiArrowGoBackFill } from "react-icons/ri";
import { BiLinkExternal } from "react-icons/bi";
import AuthorCard from "@components/blog/authorCard";
import {
  getClient,
  client,
  usePreviewSubscription
} from "@lib/sanity";
import defaultOG from "../public/opengraph.jpeg";
import GetImage from "@utils/getImage";
import PostList from "@components/postlist";
import {
  LocationMarkerIcon,
  MailIcon,
  PhoneIcon
} from "@heroicons/react/outline";
import qrlogo from "../public/Assests/qrcodepic.png";
import {
  configQuery,
  authorquery,
  singalAuthorsquery
} from "@lib/groq";
export default function Post(props) {
  const { author, siteconfig, preview } = props;
  // console.log(author);
  const router = useRouter();

  const { data: siteConfig } = usePreviewSubscription(configQuery, {
    initialData: siteconfig,
    enabled: preview || router.query.preview !== undefined
  });
  // console.log(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID);
  const ogimage = siteConfig?.openGraphImage
    ? GetImage(siteConfig?.openGraphImage).src
    : defaultOG.src;

  return (
    <>
      {siteConfig && (
        <Layout {...siteConfig}>
          <NextSeo
            title={`${siteConfig?.title}`}
            description={siteConfig?.description || ""}
            canonical={siteConfig?.url}
            openGraph={{
              url: siteConfig?.url,
              title: `${siteConfig?.title}`,
              description: siteConfig?.description || "",
              images: [
                {
                  url: "",
                  width: 800,
                  height: 600,
                  alt: ""
                }
              ]
            }}
            twitter={{
              cardType: "summary_large_image"
            }}
          />
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
                <div className={""}>
                  {author?.social?.map(item => (
                    <Link href={item.href} key={item._key}>
                      <a target="_blank">
                        <div className="px-8 py-8 mt-3 text-gray-500 rounded-2xl bg-gray-50 dark:bg-gray-900 dark:text-gray-400">
                          <div className="flex flex-wrap items-start sm:space-x-6 sm:flex-nowrap text-teal-700 text-xl hover:text-gray-500">
                            <BiLinkExternal
                              size={25}
                              className="mr-4"
                            />
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
        </Layout>
      )}
    </>
  );
}

export async function getStaticProps({ params, preview = false }) {
  // const post = await getClient(preview).fetch(postquery);
  // const config = await getClient(preview).fetch(configQuery);
  // const authorbusiness = await getClient(preview).fetch(
  //   singalAuthorsquery,
  //   {
  //     slug: params.slug
  //   }
  // );
  const config = await getClient(preview).fetch(configQuery);
  const authors = await client.fetch(authorquery);
  return {
    props: {
      author: { ...authors[0] },
      siteconfig: { ...config },
      preview
    },
    revalidate: 10
  };
}
