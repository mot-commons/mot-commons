import React from "react"
import { StaticQuery, graphql } from "gatsby"

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
