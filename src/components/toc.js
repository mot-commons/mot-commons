import * as React from "react"

const Items = ({ tableOfContents, depth }) => {
  return (
    <ul>
      {tableOfContents &&
        tableOfContents.map(item => (
          <li
            key={item.url}
            //   style={{
            //     paddingLeft: depth !== 0 ? "1em" : "0",
            //   }}
          >
            <a href={item.url}>{item.title}</a>
            {item.items && (
              <Items tableOfContents={item.items} depth={depth + 1} />
            )}
          </li>
        ))}
    </ul>
  )
}

const Toc = ({ title, tableOfContents }) => {
  return (
    <div className="toc">
      <p className="toc-title">
        <span className="small">Table of contents</span>
        <br />
        <a href="#">{title}</a>
      </p>
      {/* <h3 css={heading}>Table of Contents</h3> */}
      <Items tableOfContents={tableOfContents} depth={0} />
    </div>
  )
}

export default Toc
