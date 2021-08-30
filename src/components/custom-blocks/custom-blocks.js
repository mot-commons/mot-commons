import React from "react"
import { StaticQuery, useStaticQuery, graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import SimpleReactLightbox, { SRLWrapper } from "simple-react-lightbox"
import * as s from "./custom-blocks.module.css"
import { Fragment } from "react"

export const ImageQuery = () => {
  return useStaticQuery(
    graphql`
      query {
        images: allFile(filter: { extension: { in: ["jpg", "jpeg", "png"] } }) {
          edges {
            node {
              relativePath
              name
              childImageSharp {
                gatsbyImageData(layout: CONSTRAINED, formats: [AUTO, WEBP])
              }
            }
          }
        }
        thumbnails: allFile(
          filter: { extension: { in: ["jpg", "jpeg", "png"] } }
        ) {
          edges {
            node {
              relativePath
              name
              childImageSharp {
                gatsbyImageData(
                  placeholder: BLURRED
                  layout: CONSTRAINED
                  width: 500
                )
              }
            }
          }
        }
      }
    `
  )
}

export const Image = ({ filename, alt, style, large }) => {
  const data = ImageQuery()
  const tmp = data.images.edges.find(e => {
    return e.node.relativePath.includes(filename)
  })
  // console.log("classname ", classa)
  if (!tmp) return <p>no images</p>
  const image = getImage(tmp.node)
  const width = large ? "width-large" : ""
  return (
    <SimpleReactLightbox>
      <SRLWrapper>
        <GatsbyImage
          image={image}
          alt={alt || tmp.node.name}
          style={style}
          className={width}
        />
      </SRLWrapper>
    </SimpleReactLightbox>
  )
}
// uses in .md
// <Image filename="MOT_Annual_floor_map-3p.jpg" alt="Floor Plan" large />

export const gallery = ({ foldername, head }) => {
  const data = ImageQuery()
  const thumbnails = data.thumbnails.edges.filter(e => {
    return e.node.relativePath.includes(foldername)
  })
  const images = data.images.edges.filter(e => {
    return e.node.relativePath.includes(foldername)
  })

  if (!thumbnails) return <p>no images</p>

  thumbnails.sort((a, b) => {
    return a.node.name > b.node.name ? 1 : -1
  })
  images.sort((a, b) => {
    return a.node.name > b.node.name ? 1 : -1
  })

  return (
    <React.Fragment>
      <SimpleReactLightbox>
        <SRLWrapper>
          {head && images[0] && (
            <GatsbyImage
              image={images[0].node.childImageSharp.gatsbyImageData}
              alt={images[0].node.name}
            />
          )}

          <div className={s.gallery}>
            {thumbnails.map((e, index) => {
              if (head && index == 0) return
              return (
                <div
                  className={s.item}
                  key={e.node.name + "-gallery-idx-" + index}
                >
                  <a
                    href={
                      images[index].node.childImageSharp.gatsbyImageData.images
                        .fallback.src
                    }
                  >
                    <GatsbyImage
                      image={e.node.childImageSharp.gatsbyImageData}
                      alt={e.node.name}
                    />
                  </a>
                </div>
              )
            })}
          </div>
        </SRLWrapper>
      </SimpleReactLightbox>
    </React.Fragment>
  )
}
// <Gallery foldername="goh-uozumi/neweconomicwar-2020/acoin" />

export const ImageLink = ({ url, self, filename, alt, style, large }) => (
  <a
    href={url}
    target={self ? "_self" : "_blank"}
    rel={!self && "noopener noreferrer"}
  >
    <Image filename={filename} alt={alt} style={style} large />
  </a>
)
// uses in .md
//<LinkImage url="https://github.com/mot-commons/mot-commons/blob/main/content/assets/invisible-powers/MOT_Annual_floor_map%2B.pdf" blank filename="MOT_Annual_floor_map-3p.jpg" alt="Floor Plan" large />

export const button = ({
  url,
  text,
  self,
  simple,
  slim,
  full,
  oblique,
  color,
}) => (
  <a
    href={url}
    target={self ? "_self" : "_blank"}
    rel={!self && "noopener noreferrer"}
    className={
      !simple && !slim ? s.button : simple ? s.button_simple : s.button_slim
    }
    style={(full && { width: `100%` }) || (oblique && { fontStyle: "oblique" })}
  >
    {text} {!self ? "🡕" : ""}
  </a>
)
// uses in .md
// <Button url="https://github.com/mot-commons/mot-commons/blob/main/content/assets/invisible-powers/MOT_Annual_floor_map%2B.pdf" text="会場で配布されたハンドアウトとフロアマップはこちら" blank />

export const Card = ({
  url,
  self,
  filename,
  label,
  title,
  excerpt,
  author,
}) => (
  <a
    href={url}
    target={self ? "_self" : "_blank"}
    rel={!self && "noopener noreferrer"}
    className={s.card_link}
  >
    <article className={s.card_simple}>
      <Image
        filename={filename}
        alt={"image of " + title}
        classname={s.image}
      />
      <div className={s.details}>
        <h4>{label}</h4>
        <h3>{title}</h3>
        <p className={s.excerpt}>{excerpt}</p>
        <p className={s.author}>{author}</p>
      </div>
    </article>
  </a>
)
// uses in .md
// <Card url="/goh-uozumi-sample-new-economic-war" filename="cat.jpg" label="Work - outside link" title="New Economic War" excerpt="asdfaoisdfj;aosijdf;aijsdo sdfja;osidfa sf;aij... se" author="Goh Uozumi" />

export const ProductCard = ({
  url,
  self,
  filename,
  label,
  title,
  subtitle,
  excerpt,
  price,
  button,
}) => (
  <a
    href={url}
    target={self ? "_self" : "_blank"}
    rel={!self && "noopener noreferrer"}
    className={s.card_product}
  >
    <nav>
      {/* <svg className="arrow" version="1.1" viewBox="0 0 512 512" width="512px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><polygon points="352,115.4 331.3,96 160,256 331.3,416 352,396.7 201.5,256 " stroke="#727272"/></svg> */}
      {label} {!self ? "🡕" : ""}
      {/* <svg className="heart" version="1.1" viewBox="0 0 512 512" width="512px" xml:space="preserve" stroke="#727272" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M340.8,98.4c50.7,0,91.9,41.3,91.9,92.3c0,26.2-10.9,49.8-28.3,66.6L256,407.1L105,254.6c-15.8-16.6-25.6-39.1-25.6-63.9  c0-51,41.1-92.3,91.9-92.3c38.2,0,70.9,23.4,84.8,56.8C269.8,121.9,302.6,98.4,340.8,98.4 M340.8,83C307,83,276,98.8,256,124.8  c-20-26-51-41.8-84.8-41.8C112.1,83,64,131.3,64,190.7c0,27.9,10.6,54.4,29.9,74.6L245.1,418l10.9,11l10.9-11l148.3-149.8  c21-20.3,32.8-47.9,32.8-77.5C448,131.3,399.9,83,340.8,83L340.8,83z" stroke="#727272"/></svg> */}
    </nav>
    <div className={s.details}>
      <Image
        filename={filename}
        alt={"image of " + title}
        classname={s.image}
      />
      <div className={s.description}>
        <h3>{title}</h3>
        <h4>{subtitle}</h4>
        <h5>{price}</h5>
        <p>{excerpt}</p>
        <button>{button}</button>
      </div>
    </div>
  </a>
)
