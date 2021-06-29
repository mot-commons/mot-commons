import React from "react"
import {
  TwitterShareButton,
  EmailShareButton,
  FacebookShareButton,
  LineShareButton,
  LinkedinShareButton,
  RedditShareButton,
} from "react-share"
import {
  TwitterIcon,
  EmailIcon,
  FacebookIcon,
  LineIcon,
  LinkedinIcon,
} from "react-share"

const ShareBtns = ({ articleUrl, articleTitle }) => (
  <div className={"sharebtns"}>
    <div>
      <TwitterShareButton title={articleTitle} via="" url={articleUrl}>
        <TwitterIcon size={32} round />
      </TwitterShareButton>

      <FacebookShareButton url={articleUrl}>
        <FacebookIcon size={32} round />
      </FacebookShareButton>

      <LineShareButton url={articleUrl}>
        <LineIcon size={32} round />
      </LineShareButton>

      <LinkedinShareButton url={articleUrl}>
        <LinkedinIcon title={articleTitle} size={32} round />
      </LinkedinShareButton>
    </div>
  </div>
)

export default ShareBtns
