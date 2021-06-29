module.exports = {
  siteMetadata: {
    // title: `Gatsby Starter Blog`,
    // author: {
    //   name: `Kyle Mathews`,
    //   summary: `who lives and works in San Francisco building useful things.`,
    // },
    // description: `A starter blog demonstrating what Gatsby can do.`,
    // siteUrl: `https://gatsbystarterblogsource.gatsbyjs.io/`,
    // social: {
    //   twitter: `kylemathews`,
    // },
    title: `MOT Commons`,
    author: {
      name: `MOT Commons -α`,
      summary: `Unofficial digital commons and archives by the creators participated in MOT's exhibitions. α-version.`,
    },
    description: `Unofficial digital commons and archives by the creators participated in MOT's exhibitions. α-version. デジタルコモンズ＆アーカイブとしてのMOT非公式ウェブサイト．`,
    siteUrl: `https://mot-commons.github.io`,
    socials: [
      {
        name: `MOT Website`,
        url: `https://www.mot-art-museum.jp/`,
      },
      // {
      //   name: `Source`,
      //   url: `https://github.com/mot-commons/mot-commons`,
      // },
    ],
  },
  plugins: [
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/posts`,
        name: `posts`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/posts-en`,
        name: `posts-en`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/people`,
        name: `people`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/people-en`,
        name: `people-en`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    // {
    //   resolve: `gatsby-source-filesystem`,
    //   options: {
    //     path: `${__dirname}/content/blog`,
    //     name: `blog`,
    //   },
    // },
    // {
    //   resolve: `gatsby-source-filesystem`,
    //   options: {
    //     name: `images`,
    //     path: `${__dirname}/src/images`,
    //   },
    // },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.md`, `.mdx`],
        gatsbyRemarkPlugins: [
          `gatsby-remark-relative-images`,

          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1280,
              showCaptions: true,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-autolink-headers`,
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    // {
    //   resolve: `gatsby-plugin-google-analytics`,
    //   options: {
    //     trackingId: `ADD YOUR TRACKING ID HERE`,
    //   },
    // },
    {
      resolve: `gatsby-plugin-feed-mdx`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMdx } }) => {
              return allMdx.edges.map(edge => {
                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.excerpt,
                  date: edge.node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  custom_elements: [{ "content:encoded": edge.node.html }],
                })
              })
            },
            query: `
              {
                allMdx(
                  filter: {
                    frontmatter: { published: { eq: "true" }, type: { ne: "People" } }
                  }
                  sort: { order: DESC, fields: [frontmatter___date] },
                ) {
                  edges {
                    node {
                      excerpt
                      html
                      fields { slug }
                      frontmatter {
                        title
                        date
                      }
                    }
                  }
                }
              }
            `,
            output: "/rss.xml",
            title: "MOT Commons's RSS Feed",
            match: "^/posts/",
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `MOT Commons`,
        short_name: `MOT Commons`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#000000`,
        display: `minimal-ui`,
        icon: `content/assets/avatars/logo.jpg`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-react-helmet-canonical-urls`,
      // options: {
      //   siteUrl: `https://mot-commons.org`,
      // },
    },
    `gatsby-plugin-gatsby-cloud`,
    {
      resolve: `gatsby-theme-i18n`,
      options: {
        defaultLang: `ja`,
        locales: `ja en`,
        configPath: require.resolve(`./i18n/config.json`),
      },
    },
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
