import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { NextSeo } from "next-seo";
import Layout from "@components/layout";
import Container from "@components/container";
import { useRouter } from "next/router";
import { getClient, usePreviewSubscription } from "@lib/sanity";
import { projectsquery, configQuery } from "@lib/groq";
import ProjectList from "@components/projectslist";

export default function Project(props) {
  const { projectdata, siteconfig, preview } = props;
  const router = useRouter();
  const { data: projects } = usePreviewSubscription(projectsquery, {
    initialData: projectdata,
    enabled: preview || router.query.preview !== undefined
  });

  const { data: siteConfig } = usePreviewSubscription(configQuery, {
    initialData: siteconfig,
    enabled: preview || router.query.preview !== undefined
  });

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
              site_name: "Odin ss"
            }}
            twitter={{
              cardType: "summary_large_image"
            }}
          />
          <Container>
            <div className="">
              {projectdata.map(project => (
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
  const projects = await getClient(preview).fetch(projectsquery);
  const config = await getClient(preview).fetch(configQuery);

  // const categories = (await client.fetch(catquery)) || null;

  return {
    props: {
      projectdata: projects,
      siteconfig: { ...config },
      preview
    },
    revalidate: 10
  };
}
