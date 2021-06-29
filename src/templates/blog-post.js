// import * as React from "react"
import React from "react"
import { Link, graphql } from "gatsby"
import { LocalizedLink, useLocalization } from "gatsby-theme-i18n"
import { MDXRenderer } from "gatsby-plugin-mdx"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
// import Image from "gatsby-image"
import { GatsbyImage, getImage, StaticImage } from "gatsby-plugin-image"
import DrawerMenu from "../components/menu"
import Toc from "../components/toc"
import ShareBtns from "../components/shareBtns"

const BlogPostTemplate = ({ data, location }) => {
  const { locale, config, defaultLang } = useLocalization()

  const post = data.mdx
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const { previous, next } = data

  const slug = post.fields.slug.replace("/" + locale, "")
  let bioSlugs = null
  const author = post.frontmatter.author?.split(",")
  bioSlugs = author && author[1] ? author[1].replace(/\s+/g, "") : "anonymous" //frstly, add author's slug after removing whitespace
  let translators = JSON.parse(post.frontmatter.translators)
  translators = translators?.map(translator => {
    if (translator == "null") {
      return null
    }
    const result = translator.split(",") //translator has "Name, /slug/"
    if (bioSlugs) bioSlugs += "|"
    if (result[1]) {
      bioSlugs += "/" + locale //add current locale. "/ja", "/en", etc.
      bioSlugs += result[1].replace(/\s+/g, "")
    }
    return result[0]
  })
  translators = translators && translators[0] ? translators : null
  const reg = new RegExp("/" + defaultLang, "g") //remove "ja"(def-lang) from slugs
  bioSlugs = bioSlugs.replace(reg, "")
  // console.log("bioSlugs ", bioSlugs)

  // const coverCaption = post.frontmatter.caption && post.frontmatter.caption
  const coverImage = getImage(post.frontmatter.image)
  // console.log("coverImage", coverImage.images.fallback.src)

  const tableOfContents = post.tableOfContents && (
    <Toc
      title={post.frontmatter.title}
      tableOfContents={post.tableOfContents.items}
    />
    // <div dangerouslySetInnerHTML={{ __html: post.tableOfContents }} />
  )

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
        image={coverImage?.images?.fallback?.src}
        canonical={post.frontmatter.canonical}
      />

      <DrawerMenu>
        <ul className="lang-switcher">
          {config.map(item => {
            return (
              <li key={"lang-switcher-" + item.code}>
                <LocalizedLink to={slug} language={item.code}>
                  {item.localName}
                </LocalizedLink>
              </li>
            )
          })}
          <li>
            <LocalizedLink className="header-link-home" to="/">
              <em>↩️ top page</em>
            </LocalizedLink>
          </li>
        </ul>
        <hr />
        {tableOfContents}
      </DrawerMenu>

      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header>
          <h1 itemProp="headline">{post.frontmatter.title}</h1>
          <p>{post.frontmatter.description || ""}</p>
          <div className="post-info">
            <div className="author">
              {author && (
                <React.Fragment>
                  <a
                    href={"#" + author[0].toLowerCase().replace(" ", "-")}
                    className="btn btn-border-shadow btn-border-shadow--yellow"
                  >
                    {author[0] || ""}
                  </a>
                </React.Fragment>
              )}
              <br />
              <span>
                {post.frontmatter.date || ""} • {post.timeToRead || ""} min read
              </span>
              <div className="support-btn">
                {post.frontmatter.support && (
                  <a href={"#" + post.frontmatter.support}>
                    <small>{post.frontmatter.support}</small>
                    <StaticImage
                      alt="Support"
                      className=""
                      layout="constrained"
                      width={24}
                      src="../../content/assets/icons/give.svg"
                    />
                  </a>
                )}
              </div>
            </div>
            <div className="translators">
              {translators && (
                <React.Fragment>
                  <small>Translated by</small> <br />
                  <ul>
                    {translators?.map(translator => (
                      <li key={translator}>
                        <a
                          href={
                            "#" + translator.toLowerCase().replace(" ", "-")
                          }
                          className="btn-border-shadow--lightblue"
                        >
                          {translator}
                        </a>
                      </li>
                    ))}
                  </ul>
                </React.Fragment>
              )}
            </div>
          </div>

          <div className="drawer open-toc-mobile">
            <input
              type="checkbox"
              id="drawer-check"
              className="drawer-hidden"
            />
            <label htmlFor="drawer-check" className="drawer-open-mobile">
              <small>Table of contents & Lang</small>
            </label>
          </div>

          {typeof window !== "undefined" && window.location.href && (
            <ShareBtns
              articleUrl={window.location.href}
              articleTitle={post.frontmatter.title}
            />
          )}
        </header>

        {/* {coverImage} */}
        {/* <figure className="gatsby-resp-image-figure">
          <GatsbyImage
            image={coverImage}
            alt={"cover image of " + post.frontmatter.title}
          />
          <figcaption className="gatsby-resp-image-figcaption">
            {coverCaption}
          </figcaption>
        </figure> */}

        <MDXRenderer>{post.body}</MDXRenderer>
        {/* <section
          dangerouslySetInnerHTML={{ __html: post.html }}
          itemProp="articleBody"
        /> */}
      </article>

      <footer id="post-bio">
        <hr />
        <Bio slugs={bioSlugs} lang={locale} />
      </footer>

      <nav className="blog-post-nav">
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
      }
    }
    mdx(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      body
      frontmatter {
        title
        date(formatString: "MMM DD, YYYY")
        description
        image {
          childImageSharp {
            gatsbyImageData(layout: CONSTRAINED, formats: [AUTO, WEBP, AVIF])
            # fixed(width: 50, height: 50) {
            #   ...GatsbyImageSharpFixed
            # }
            # fluid(maxWidth: 1000, quality: 90) {
            #   ...GatsbyImageSharpFluid_withWebp_tracedSVG
            # }
          }
        }
        author
        translators
        support
        canonical
      }
      tableOfContents
      fields {
        slug
      }
      timeToRead
    }
    previous: mdx(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: mdx(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`
