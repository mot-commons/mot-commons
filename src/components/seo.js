/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

// import * as React from "react"
import React from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

const SEO = ({ description, lang, meta, title, image, canonical }) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            socials {
              name
              url
            }
          }
        }
      }
    `
  )

  const metaDescription = description || site.siteMetadata.description
  const defaultTitle = site.siteMetadata?.title
  const imageUrl = image || ""
  // console.log("imgUrl ", imageUrl)

  //get twitter id from the url in sitemetada
  let twitterId = site.siteMetadata?.socials.filter(function (item, index) {
    return (
      item.name == "Twitter" && item.url.substr(item.url.lastIndexOf("/") + 1)
    )
  })

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={defaultTitle ? `%s | ${defaultTitle}` : null}
      link={
        canonical ? [{ rel: "canonical", key: canonical, href: canonical }] : []
      }
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          property: `og:image`,
          content: "https://mot-commons.org" + imageUrl,
        },
        // {
        //   name: `twitter:creator`,
        //   content: twitterId,
        //   // content: site.siteMetadata?.social?.twitter || ``,
        // },
        {
          name: `twitter:card`,
          content: `summary_large_image`,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
        {
          name: `twitter:twitter:image`,
          content: "https://mot-commons.org" + imageUrl,
        },
      ].concat(meta)}
    />
  )
}

SEO.defaultProps = {
  lang: `ja`,
  meta: [],
  description: ``,
  image: ``,
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
  image: PropTypes.string,
  canonical: PropTypes.string,
}

export default SEO
