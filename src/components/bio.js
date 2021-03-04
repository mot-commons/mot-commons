/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

// import * as React from "react"
import React, { useMemo } from "react"
import { useStaticQuery, graphql } from "gatsby"
// import Image from "gatsby-image"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const Bio = ({ slugs, locale }) => {
  //get all md-files of people. can't use filter with dynamic regex because StaticQuery doesn't allow dynamic variables.
  const data = useStaticQuery(graphql`
    query BioQuery {
      siteAvatar: file(absolutePath: { regex: "/avatars/logo.jpg/" }) {
        childImageSharp {
          gatsbyImageData(width: 50, height: 50, layout: FIXED)
          # fixed(width: 50, height: 50, quality: 95) {
          #   ...GatsbyImageSharpFixed
          # }
        }
      }
      site {
        siteMetadata {
          author {
            name
            summary
          }
          socials {
            name
            url
          }
        }
      }
      allMarkdownRemark(
        filter: {
          frontmatter: { published: { eq: "true" }, type: { eq: "People" } }
          # fields: { slug: { regex: $slugs } }
        }
      ) {
        nodes {
          excerpt
          fields {
            slug
            locale
          }
          html
          frontmatter {
            name
            role
            avatar {
              childImageSharp {
                gatsbyImageData(
                  width: 50
                  height: 50
                  layout: FIXED
                  formats: [AUTO, WEBP, AVIF]
                )
                # fixed(width: 50, height: 50) {
                #   ...GatsbyImageSharpFixed
                # }
              }
            }
            socials
          }
        }
      }
    }
  `)

  // Set these values by editing "siteMetadata" in gatsby-config.js
  const author = data.site.siteMetadata?.author
  const socials = data.site.siteMetadata?.socials
  const siteAvatar = getImage(data?.siteAvatar) //data?.siteAvatar?.childImageSharp?.fixed

  //get selected data with regex slugs, "/name-one/|/name-two/"
  const posts = useMemo(() => {
    if (slugs) {
      const array = data.allMarkdownRemark.nodes.filter(value => {
        return value.fields.slug.match(slugs) && value.fields.locale === locale
      })
      //sort translator and staff to the end of the array
      const supportors = ["translator", "staff"]
      return array
        .filter(a => !supportors.includes(a.frontmatter.role.toLowerCase()))
        .concat(
          array.filter(b =>
            supportors[1].includes(b.frontmatter.role.toLowerCase())
          )
        )
        .concat(
          array.filter(b =>
            supportors[0].includes(b.frontmatter.role.toLowerCase())
          )
        )

      // return array.map(post => {
      //   if (post.frontmatter.role.toLowerCase() == "staff") {
      //     return { staff: post }
      //   } else if (post.frontmatter.role.toLowerCase() == "translator") {
      //     return { translator: post }
      //   } else {
      //     return { autor: post }
      //   }
      // })
    }
    return null
    // data.allFile.edges.find(({ node }) => src === node.relativePath)
  }, [slugs])

  return (
    <aside>
      {/* .slice(0) .reverse() */}
      {posts?.map((post, index) => {
        const avatar = getImage(post.frontmatter.avatar)
        return (
          <div
            className="bio"
            key={"bio-" + index}
            id={post.frontmatter.name.toLowerCase().replace(" ", "-")}
          >
            <div className="bio-header">
              {post.frontmatter.avatar && (
                <GatsbyImage //Image
                  image={avatar}
                  // fixed={post.frontmatter.avatar.childImageSharp.fixed}
                  alt={"avatar of " + post.frontmatter.name || ``}
                  className="bio-avatar"
                  imgStyle={{
                    borderRadius: `50%`,
                  }}
                />
              )}
              {post.frontmatter.name && (
                <div className="bio-info">
                  <strong>{post.frontmatter.name}</strong>
                  <br />
                  <small>- {post.frontmatter.role}</small>
                  <ul>
                    {post.frontmatter.socials?.map(social => {
                      const result = social.split(",")
                      const name = result[0]
                      const url = result[1].replace(/\s+/g, "") //remove whitespace
                      return (
                        <li key={name}>
                          <a
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-border-shadow btn-border-shadow--yellow"
                          >
                            {name}
                          </a>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              )}
            </div>
            {post.html && (
              <section
                className="bio-text"
                dangerouslySetInnerHTML={{ __html: post.html }}
                itemProp="articleBody"
              />
            )}
          </div>
        )
      })}
      {posts ? <hr /> : ""}
      {/* show the admin bio at the bottom*/}
      <div className="bio">
        <div className="bio-header">
          {siteAvatar && (
            <GatsbyImage //Image
              image={siteAvatar}
              // fixed={siteAvatar}
              alt={"avatar of" + author?.name || ``}
              className="bio-avatar"
              imgStyle={{
                borderRadius: `50%`,
              }}
            />
          )}
          {author?.name && (
            <div className="bio-info">
              <strong>{author.name}</strong>| {author?.summary || null}
              {` `}
              <br />
              <ul>
                {socials.map(social => (
                  <li key={social.name}>
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-border-shadow btn-border-shadow--lightblue"
                    >
                      {social.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </aside>
  )
}

export default Bio
