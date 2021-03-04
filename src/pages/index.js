// import * as React from "react"
import React from "react"
import { Link, graphql } from "gatsby"
import { LocalizedLink, useLocalization } from "gatsby-theme-i18n"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import DrawerMenu from "../components/menu"

// import Image from "gatsby-image"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const BlogIndex = ({ data, location }) => {
  const { locale, config, defaultLang } = useLocalization()
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes
  // console.log("location", location)

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <SEO title={siteTitle} />
        <Bio />
        <p>
          No blog posts found. Add markdown posts to "content/posts" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.js).
        </p>
      </Layout>
    )
  }

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title={siteTitle} />
      <DrawerMenu>
        <ul className="lang-switcher">
          {config.map(item => {
            return (
              <li key={"lang-switcher-" + item.code}>
                <LocalizedLink to="/" language={item.code}>
                  {item.localName}
                </LocalizedLink>
              </li>
            )
          })}
        </ul>
      </DrawerMenu>
      <Bio />
      <ol style={{ listStyle: `none` }} className="post-list">
        {posts.map(post => {
          const author = post.frontmatter.author?.split(",")
          const title = post.frontmatter.title || post.fields.slug
          const featuredImage = getImage(post.frontmatter.image)
          // const featuredImage = post.frontmatter.image ? (
          //   <GatsbyImage //Image
          //     image={post.frontmatter.image?.childImageSharp?.gatsbyImageData}
          //     // fluid={post.frontmatter.image.childImageSharp.fluid}
          //     className="cover-image"
          //   />
          // ) : (
          //   ""
          // )

          return (
            <li key={post.fields.slug}>
              <article
                className="post-list-item"
                itemScope
                itemType="http://schema.org/Article"
              >
                <Link to={post.fields.slug} itemProp="url">
                  {/* {featuredImage} */}
                  <GatsbyImage
                    image={featuredImage}
                    alt={"cover image of " + title}
                    className="cover-image"
                  />
                </Link>

                <header>
                  {author ? <h3>{author[0] || ""}</h3> : ""}
                  <h2>
                    <Link to={post.fields.slug} itemProp="url">
                      <span itemProp="headline">{title}</span>
                    </Link>
                  </h2>
                  <small>
                    {post.frontmatter.date || ""} • {post.timeToRead || ""} min
                    read
                  </small>
                </header>
                <section>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: post.frontmatter.description || post.excerpt,
                    }}
                    itemProp="description"
                  />
                </section>
              </article>
            </li>
          )
        })}
      </ol>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query($locale: String!) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      filter: {
        frontmatter: { published: { eq: "true" }, type: { ne: "People" } }
        fields: { locale: { eq: $locale } }
      }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMM DD, YYYY")
          title
          description
          image {
            childImageSharp {
              gatsbyImageData(
                width: 200
                # height: 200
                layout: CONSTRAINED
                formats: [AUTO, WEBP, AVIF]
              )
              # fixed(width: 50, height: 50) {
              #   ...GatsbyImageSharpFixed
              # }
              # fluid(maxWidth: 1000, quality: 90) {
              #   ...GatsbyImageSharpFluid_withWebp_tracedSVG
              # }
            }
          }
          author
        }
        timeToRead
      }
    }
  }
`
