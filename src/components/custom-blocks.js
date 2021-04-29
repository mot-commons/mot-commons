import React from "react"
import { StaticQuery, graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import * as s from "./custom-blocks.module.css"

export const Donorbox = ({ url }) => (
  <React.Fragment>
    <script src="https://donorbox.org/widget.js" paypalExpress="true"></script>
    <iframe
      allowpaymentrequest=""
      frameborder="0"
      height="900px"
      name="donorbox"
      scrolling="no"
      seamless="seamless"
      src={url}
      style={{
        "max-width": "500px",
        "min-width": "250px",
        "max-height": "none !important",
      }}
      width="100%"
    ></iframe>
  </React.Fragment>
)
// uses in .md
// <Donorbox url="https://donorbox.org/embed/mot-commons-goh" />

export const Kofi = ({ url, title }) => (
  <React.Fragment>
    <iframe
      src={url}
      style={{
        border: "none",
        width: "100%",
        padding: "4px",
        background: "none",
        border: "1px solid #eee",
        borderRadius: "6px",
        boxShadow:
          "0 2px 5px 0 rgba(100, 100, 100, 0.06), 0 2px 10px 0 rgba(100, 100, 100, 0.04)",
      }}
      height="712"
      title={title}
    ></iframe>
  </React.Fragment>
)
// uses in .md
// <Kofi url="https://ko-fi.com/goh_u/?hidefeed=true&widget=true&embed=true&preview=true" title="goh_u"/>

export const Image = ({ filename, alt, style, classname }) => (
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
      }
    `}
    render={data => {
      const tmp = data.images.edges.find(e => {
        return e.node.relativePath.includes(filename)
      })
      //   console.log("image ", tmp.node)
      if (!tmp) return
      const image = getImage(tmp.node)
      return (
        <GatsbyImage
          image={image}
          alt={alt || "an image"}
          style={style}
          className={classname}
        />
      )
    }}
  />
)
// uses in .md
// <Image filename="MOT_Annual_floor_map-3p.jpg" alt="Floor Plan"/>

export const ImageLink = ({ url, self, filename, alt, style }) => (
  <a
    href={url}
    target={self ? "_self" : "_blank"}
    rel={!self && "noopener noreferrer"}
  >
    <Image filename={filename} alt={alt} style={style} />
  </a>
)
// uses in .md
//<LinkImage url="https://github.com/mot-commons/mot-commons/blob/main/content/assets/invisible-powers/MOT_Annual_floor_map%2B.pdf" blank filename="MOT_Annual_floor_map-3p.jpg" alt="Floor Plan"/>

export const Button = ({
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
