const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  // Define a template for blog post
  const blogPost = path.resolve(`./src/templates/blog-post.js`)

  // Get all markdown blog posts sorted by date
  const result = await graphql(
    `
      {
        allMarkdownRemark(
          filter: { frontmatter: { published: { eq: "true" } } }
          sort: { fields: [frontmatter___date], order: ASC }
          limit: 1000
        ) {
          nodes {
            id
            fields {
              slug
            }
            fileAbsolutePath
          }
        }
      }
    `
  )

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      result.errors
    )
    return
  }

  //allPosts has all post-types. post, post-en, persons...
  const allPosts = result.data.allMarkdownRemark.nodes

  //Get folder name form absolute-path, ".../content/posts/file.md" to "posts"
  const getPostType = fileAbsolutePath => {
    const result = fileAbsolutePath.split("/").filter(e => Boolean(e))
    return result[result.length - 2]
  }
  //Group the allPosts by post-types,
  //return [ [posts: [[post], [post]...]], [posts-en:[[post],[post]...]] ]
  const groupBy = (array, getKey) =>
    Array.from(
      array.reduce((map, cur, idx, src) => {
        const key = getKey(cur, idx, src)
        const list = map.get(key)
        if (list) list.push(cur)
        else map.set(key, [cur])
        return map
      }, new Map())
    )
  // get grouped posts by types as array
  const groupedPosts = groupBy(allPosts, item =>
    getPostType(item.fileAbsolutePath)
  )

  if (groupedPosts.length > 0) {
    groupedPosts.forEach((posts, i) => {
      posts[1].forEach((post, index) => {
        const previousPostId = index === 0 ? null : posts[1][index - 1].id
        const nextPostId =
          index === posts[1].length - 1 ? null : posts[1][index + 1].id

        // Create blog posts page
        // `context` is available in the template as a prop and as a variable in GraphQL
        createPage({
          path: post.fields.slug,
          component: blogPost,
          context: {
            id: post.id,
            previousPostId,
            nextPostId,
          },
        })
      })
    })
  }

  // const posts = result.data.allMarkdownRemark.nodes

  // // Create blog posts pages
  // // But only if there's at least one markdown file found at "content/blog" (defined in gatsby-config.js)
  // // `context` is available in the template as a prop and as a variable in GraphQL

  // if (posts.length > 0) {
  //   posts.forEach((post, index) => {
  //     const previousPostId = index === 0 ? null : posts[index - 1].id
  //     const nextPostId = index === posts.length - 1 ? null : posts[index + 1].id

  //     createPage({
  //       path: post.fields.slug,
  //       component: blogPost,
  //       context: {
  //         id: post.id,
  //         previousPostId,
  //         nextPostId,
  //       },
  //     })
  //   })
  // }
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    //get folder-name inc md-files, and get locale such as ja or en
    const fileNode = getNode(node.parent)
    let tmp = fileNode.sourceInstanceName.split("-")
    const locale = tmp[1] ? tmp[1] : "ja"
    // set slug with locale, ["ja" is /name-of-file/] and ["en" is /en/name-of-file/]
    createNodeField({
      name: `slug`,
      node,
      value: locale == "ja" ? value : "/" + locale + value,
    })

    createNodeField({
      node,
      name: `locale`,
      value: locale,
    })
  }
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  // Explicitly define the siteMetadata {} object
  // This way those will always be defined even if removed from gatsby-config.js

  // Also explicitly define the Markdown frontmatter
  // This way the "MarkdownRemark" queries will return `null` even when no
  // blog posts are stored inside "content/blog" instead of returning an error
  createTypes(`
    type SiteSiteMetadata {
      author: Author
      siteUrl: String
      socials: [Social]
    }

    type Author {
      name: String
      summary: String
    }

    type Social {
      name: String
      url: String
    }

    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
      fields: Fields
    }

    type Frontmatter {
      title: String
      description: String
      date: Date @dateformat
    }

    type Fields {
      slug: String
    }
  `)
}
