export const config = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  projectId: "c22h26lr",
  apiVersion: "2022-05-19",
  useCdn: process.env.NODE_ENV === "production"
};
