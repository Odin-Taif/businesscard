import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'link',
      title: 'Link',
      type: 'url',
    }),
    defineField({
      name: 'githubLink',
      title: 'Github',
      type: 'url',
      validation: (Rule) =>
        Rule.uri({
          scheme: ['http', 'https'],
        }),
    }),
    {
      name: 'techology',
      type: 'array',
      title: 'techologies involved',
      description: 'Enter a techology',
      validation: (Rule: {unique: () => any}) => Rule.unique(),
      of: [
        {
          type: 'object',
          fields: [
            {
              type: 'string',
              name: 'technology',
              title: 'Choose tech stack',
              options: {
                list: [
                  {title: 'Aws', value: 'aws'},
                  {title: 'Next.js', value: 'next.js'},
                  {title: 'Amplify', value: 'amplify'},
                  {title: 'React', value: 'react'},
                  {title: 'Prisma', value: 'prisma'},
                  {title: 'Subabase', value: 'subabase'},
                  {title: 'Tailwind', value: 'tailwind'},
                  {title: 'Sanity', value: 'sanity'},
                  {title: 'gql', value: 'gql'},
                  {title: 'groq', value: 'groq'},
                  {title: 'TS', value: 'ts'},
                  {title: 'JS', value: 'js'},
                  {title: 'Firebase', value: 'firebase'},
                  {title: 'Angular', value: 'angular'},
                  {title: 'Sql', value: 'SQL'},
                  {title: 'postgresQL', value: 'postgresQL'},
                  {title: 'cyperPanel', value: 'cyperPanel'},
                  {title: 'wordpress', value: 'wordpress'},
                ],
              },
            },
            {
              type: 'url',
              name: 'url',
              title: 'Full URL to the technology',
            },
          ],
          preview: {
            select: {
              title: 'technology',
              subtitle: 'url',
            },
          },
        },
      ],
    },
    // defineField({
    //   name: 'author',
    //   title: 'Author',
    //   type: 'reference',
    //   to: {type: 'author'},
    // }),
    // defineField({
    //   name: 'mainImage',
    //   title: 'Main image',
    //   type: 'image',
    //   options: {
    //     hotspot: true,
    //   },
    // }),
    // defineField({
    //   name: 'categories',
    //   title: 'Categories',
    //   type: 'array',
    //   of: [{type: 'reference', to: {type: 'category'}}],
    // }),
    // defineField({
    //   name: 'publishedAt',
    //   title: 'Published at',
    //   type: 'datetime',
    // }),
    // defineField({
    //   name: 'body',
    //   title: 'Body',
    //   type: 'blockContent',
    // }),
  ],

  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
    },
    prepare(selection) {
      const {author} = selection
      return {...selection, subtitle: author && `by ${author}`}
    },
  },
})
