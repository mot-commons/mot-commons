import * as React from "react"
import { Link, graphql } from "gatsby"
import { LocalizedLink, useLocalization } from "gatsby-theme-i18n"
// import { MDXRenderer } from "gatsby-plugin-mdx"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import DrawerMenu from "../components/menu"

// import Image from "gatsby-image"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import siteImage from "../../content/assets/invisible-powers/motannual2020-top.jpg"

const BlogIndex = ({ data, location }) => {
  const { locale, config, defaultLang } = useLocalization()
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMdx.nodes

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <SEO title={siteTitle} image={siteImage} />
        <Bio />
        <p>
          No blog posts found. Add markdown posts to "content/blog" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.js).
        </p>
      </Layout>
    )
  }

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title={siteTitle} image={siteImage} />
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

          return (
            <li key={post.fields.slug}>
              <article
                className="post-list-item"
                itemScope
                itemType="http://schema.org/Article"
              >
                <Link to={post.fields.slug} itemProp="url">
                  <GatsbyImage
                    image={featuredImage}
                    alt={"cover image of " + title}
                    className="cover-image"
                    // objectFit="scale-down"
                  />
                  <div className="details">
                    <header>
                      {author && <h3>{author[0] || ""}</h3>}
                      <h2>
                        <span itemProp="headline">{title}</span>
                      </h2>
                      <small>
                        {post.frontmatter.date || ""} • {post.timeToRead || ""}{" "}
                        min read
                      </small>
                    </header>
                    <section>
                      {/* <MDXRenderer>
                      {post.frontmatter.description || post.excerpt}
                    </MDXRenderer> */}
                      <p
                        dangerouslySetInnerHTML={{
                          __html: post.frontmatter.description || post.excerpt,
                        }}
                        itemProp="description"
                      />
                    </section>
                  </div>
                </Link>
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
    allMdx(
      filter: {
        frontmatter: { published: { eq: "true" }, type: { ne: "People" } }
        fields: { lang: { eq: $locale } }
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
            }
          }
          author
        }
        timeToRead
      }
    }
  }
`
