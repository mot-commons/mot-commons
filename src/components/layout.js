import * as React from "react"
import { Link } from "gatsby"
import { LocalizedLink, useLocalization } from "gatsby-theme-i18n"
import { MDXProvider } from "@mdx-js/react"
import {
  Button,
  Image,
  ImageLink,
  Card,
  ProductCard,
  Gallery,
} from "./custom-blocks/custom-blocks"
import { Donorbox, Kofi } from "./custom-blocks/donation.js"
const shortcodes = {
  Donorbox,
  Kofi,
  Button,
  Image,
  ImageLink,
  Card,
  ProductCard,
  Gallery,
}

const Layout = ({ location, title, children }) => {
  const { locale, config, defaultLang } = useLocalization()
  const rootPath = `${__PATH_PREFIX__}/`
  let pathname = locale.replace("ja", "") //root path, 'ja', is '/'
  pathname = location.pathname.replace(locale + "/", "") //remove locale from the path, "/en/slugOfMd" to "/slugOfMd/"
  const isRootPath = pathname === rootPath
  let header

  if (isRootPath) {
    header = (
      <h1 className="main-heading">
        <LocalizedLink to="/">{title}</LocalizedLink>
        {/* <Link to="/">{title}</Link> */}
      </h1>
    )
  } else {
    header = (
      <LocalizedLink className="header-link-home" to="/">
        {title}
      </LocalizedLink>
      // <Link className="header-link-home" to="/">
      //   {title}
      // </Link>
    )
  }

  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <header className="global-header">{header}</header>

      <MDXProvider components={shortcodes}>{children}</MDXProvider>
      {/* <main>{children}</main> */}
      <footer className="copyright">
        © {new Date().getFullYear()}, by
        {` `}
        <a href="https://github.com/mot-commons/mot-commons">MOT Commons</a>
      </footer>
    </div>
  )
}

export default Layout
