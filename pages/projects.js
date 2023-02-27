import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { NextSeo } from "next-seo";
import Layout from "@components/layout";
import Container from "@components/container";
// import Subpagehero from "@components/sections/subpagehero";
// import Categories from "@components/categories";
import { useRouter } from "next/router";
import { getClient, usePreviewSubscription } from "@lib/sanity";

import { projectsquery, configQuery } from "@lib/groq";

import ProjectList from "@components/projectslist";

export default function project(props) {
  const { projectdata, siteconfig, preview } = props;
  const router = useRouter();
  //console.log(router.query.category);
  const { data: projects } = usePreviewSubscription(projectsquery, {
    initialData: projectdata,
    enabled: preview || router.query.preview !== undefined
  });

  const { data: siteConfig } = usePreviewSubscription(configQuery, {
    initialData: siteconfig,
    enabled: preview || router.query.preview !== undefined
  });
  //console.log(projects);

  return (
    <>
      {projects && siteConfig && (
        <Layout {...siteConfig}>
          <NextSeo
            title={`Blog — ${siteConfig?.title}`}
            description={siteConfig?.description || ""}
            canonical={siteConfig?.url}
            openGraph={{
              url: siteConfig?.url,
              title: `Blog — ${siteConfig?.title}`,
              description: siteConfig?.description || "",
              images: [
                {
                  url: "",
                  width: 800,
                  height: 600,
                  alt: ""
                }
              ],
              site_name: "Odin"
            }}
            twitter={{
              cardType: "summary_large_image"
            }}
          />
          <Container>
            <div className="">
              {projects.map(project => (
                <ProjectList
                  key={project._id}
                  project={project}
                  aspect="square"
                />
              ))}
            </div>
          </Container>
        </Layout>
      )}
    </>
  );
}

export async function getStaticProps({ params, preview = false }) {
  const project = await getClient(preview).fetch(projectsquery);
  const config = await getClient(preview).fetch(configQuery);

  // const categories = (await client.fetch(catquery)) || null;

  return {
    props: {
      projectdata: project,
      // categories: categories,
      siteconfig: { ...config },
      preview
    },
    revalidate: 10
  };
}
