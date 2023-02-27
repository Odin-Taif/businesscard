import { groq } from "next-sanity";

export const postquery = groq`
*[_type == "post"] | order(_createdAt desc) {
  ...,
  author->,
  categories[]->
}
`;

export const projectsquery = groq`
*[_type == "project"] | order(_createdAt desc) {
  ...,
  author->,
}
`;

export const configQuery = groq`
*[_type == "siteconfig"][0] {
  ...,
}
`;

export const singlequery = groq`
*[_type == "post" && slug.current == $slug][0] {
  ...,
  author->,
  categories[]->,
  "estReadingTime": round(length(pt::text(body)) / 5 / 180 )
}
`;

export const pathquery = groq`
*[_type == "post"] {
  'slug': slug.current,
}
`;

export const authorsquery = groq`
*[_type == "author"]{
 ...
}
`;
export const singalAuthorsquery = groq`
*[_type == "author"&& slug.current == $slug][0]{
 ...
}
`;

// test below
// to delete later

export const listquery = groq`
*[_type == "listing"] | order(_createdAt desc) [$start..$end] {
  ...,
  category->
 }
`;

export const productquery = groq`
*[_type == "listing" && slug.current == $slug][0] {
  ...,
  category-> {
    ...,
    enqform->,
    vendorform->
  }
 }
`;

export const pathAuthorquery = groq`
*[_type == "author"] {
  'slug': slug.current,
}
`;
