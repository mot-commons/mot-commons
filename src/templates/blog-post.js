// import * as React from "react"
import React from "react"
import { Link, graphql } from "gatsby"
import { LocalizedLink, useLocalization } from "gatsby-theme-i18n"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
// import Image from "gatsby-image"
import { GatsbyImage, getImage, StaticImage } from "gatsby-plugin-image"
import DrawerMenu from "../components/menu"

const BlogPostTemplate = ({ data, location }) => {
  const { locale, config, defaultLang } = useLocalization()

  const post = data.markdownRemark
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

  const coverCaption = post.frontmatter.caption && post.frontmatter.caption
  const coverImage = getImage(post.frontmatter.image)

  const tableOfContents = post.tableOfContents && (
    <div dangerouslySetInnerHTML={{ __html: post.tableOfContents }} />
  )

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
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
        </ul>
        <hr />
        <div className="toc">
          <p className="toc-title">
            <span className="small">Table of contents</span>
            <br />
            <a href="#">{post.frontmatter.title}</a>
          </p>
          {tableOfContents}
        </div>
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
              <small>Show TOC & Lang</small>
            </label>
          </div>
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

        <section
          dangerouslySetInnerHTML={{ __html: post.html }}
          itemProp="articleBody"
        />
      </article>

      <footer id="post-bio">
        <hr />
        <Bio slugs={bioSlugs} locale={locale} />
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
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
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
        caption
        author
        translators
        support
      }
      tableOfContents
      fields {
        slug
      }
      timeToRead
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`
