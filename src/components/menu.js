import React from "react"
import { Helmet } from "react-helmet"

const DrawerMenu = ({ children }) => {
  return (
    <React.Fragment>
      <div className="drawer">
        <input type="checkbox" id="drawer-check" className="drawer-hidden" />
        <label htmlFor="drawer-check" className="drawer-open">
          <span></span>
        </label>
        <label htmlFor="drawer-check" className="drawer-close"></label>
        <nav className="drawer-content">{children}</nav>
      </div>
      <Helmet>
        <script type="application/javascript">{`
        {
          //close hamburger menu when click internal links
          var input = document.getElementById("drawer-check");
          document.querySelectorAll('.drawer a').forEach(function (elem) {
              elem.addEventListener('click', handleMenuClick);
          });
          
          function handleMenuClick(event) {
            if (event.target instanceof HTMLAnchorElement) {
              input.checked = false;
            }
          }
        }
        `}</script>
      </Helmet>
    </React.Fragment>
  )
}
export default DrawerMenu
