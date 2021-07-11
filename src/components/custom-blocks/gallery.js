import React from "react"
import { StaticQuery, graphql } from "gatsby"
import { SRLWrapper } from "simple-react-lightbox"
import { GatsbyImage } from "gatsby-plugin-image"

export const Gallery = ({ foldername, alt, style, large }) => (
  <StaticQuery
    query={graphql`
      query {
        images: allFile(filter: { extension: { in: ["jpg", "png"] } }) {
          edges {
            node {
              relativePath
              name
              childImageSharp {
                gatsbyImageData(
                  layout: CONSTRAINED
                  formats: [AUTO, WEBP, AVIF]
                )
              }
            }
          }
        }
        thumbnails: allFile(filter: { extension: { in: ["jpg", "png"] } }) {
          edges {
            node {
              relativePath
              name
              childImageSharp {
                gatsbyImageData(
                  placeholder: BLURRED
                  layout: CONSTRAINED
                  width: 400
                  height: 400
                )
              }
            }
          }
        }
      }
    `}
    render={data => {
      // const filenamesArray = filenames.split(",")
      // const test = ["1614301021311.jpg", "goh-uozumi.jpg", "cat.jpg"]
      // const arr1arr2 = [...data.thumbnails.edges, ...test]
      // const duplicatedArr = arr1arr2.filter(item =>
      //   data.thumbnails.edges.includes(item) && test.includes(item)
      //   return e.node.relativePath.includes(filename)
      // )
      const thumbnails = data.thumbnails.edges.filter(e => {
        return e.node.relativePath.includes(foldername)
        // for (const v of filenamesArray) {
        //   if (e.node.relativePath.includes(v)) return true
        // }
      })
      const images = data.images.edges.filter(e => {
        return e.node.relativePath.includes(foldername)
      })

      console.log("tmp ", thumbnails)
      // if (!tmp) return
      // const image = getImage(tmp.node)
      // const width = large ? "width-large" : ""
      return (
        <div className="gallery">
          <SRLWrapper>
            {thumbnails.map((e, index) => {
              return (
                <a
                  href={
                    images[index].node.childImageSharp.gatsbyImageData.images
                      .fallback.src
                  }
                  key={e.node.name + "-" + index}
                >
                  <GatsbyImage
                    image={e.node.childImageSharp.gatsbyImageData}
                    alt={e.node.name}
                  />
                </a>
              )
            })}
          </SRLWrapper>
        </div>
      )
    }}
  />
)
