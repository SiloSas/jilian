import React from "react"
import { Link } from "gatsby"
import "../utils/font-awsome.css"

const Layout = props => {
  const { title, children } = props
  const [toggleNav, setToggleNav] = React.useState(false)
  return (
    <div className={`site-wrapper ${toggleNav ? `site-head-open` : ``}`}>
      <header className="site-head">
        <div className="site-head-container">
          <a
            className="nav-burger"
            href={`#`}
            onClick={() => setToggleNav(!toggleNav)}
          >
            <div
              className="hamburger hamburger--collapse"
              aria-label="Menu"
              role="button"
              aria-controls="navigation"
            >
              <div className="hamburger-box">
                <div className="hamburger-inner" />
              </div>
            </div>
          </a>
          <nav id="swup" class="site-head-left">
            <ul className="nav" role="menu">
              <li className="nav-home nav-current" role="menuitem">
                <Link to={`/`}>Home</Link>
              </li>
              <li className="nav-about" role="menuitem">
                <Link to={`/contact`}>Contact</Link>
              </li>
              <li className="nav-elements" role="menuitem">
                <Link to={`/shop`}>Shop</Link>
              </li>
            </ul>
          </nav>
          <div className="site-head-center">
            <Link className="site-head-logo" to={`/`}>
              {title}
            </Link>
          </div>
          <div className="site-head-right">
            {/*<div className="social-links">*/}
            {/*<a*/}
            {/*href="https://www.facebook.com"*/}
            {/*title="Facebook"*/}
            {/*target="_blank"*/}
            {/*rel="noopener noreferrer"*/}
            {/*>*/}
            {/*Facebook*/}
            {/*</a>*/}
            {/*<a*/}
            {/*href="https://twitter.com"*/}
            {/*title="Twitter"*/}
            {/*target="_blank"*/}
            {/*rel="noopener noreferrer"*/}
            {/*>*/}
            {/*Twitter*/}
            {/*</a>*/}
            {/*<Link*/}
            {/*to={`/rss.xml`}*/}
            {/*title="RSS"*/}
            {/*target="_blank"*/}
            {/*rel="noopener noreferrer"*/}
            {/*>*/}
            {/*RSS*/}
            {/*</Link>*/}
            {/*</div>*/}
            <div className="header-cart">
              <Link
                className="Header__summary snipcart-summary snipcart-checkout"
                to="#"
              >
                <i className="fas fa-cart-plus" />
              </Link>
              {/* <button class="snipcart-add-item"
                data-item-id="starry-night"
                data-item-price="79.99"
                data-item-url="/paintings/starry-night"
                data-item-description="High-quality replica of The Starry Night by the Dutch post-impressionist painter Vincent van Gogh."
                data-item-image="/assets/images/starry-night.jpg"
                data-item-name="The Starry Night">
                Add to cart
              </button> */}
            </div>
          </div>
        </div>
      </header>
      <main id="site-main" className="site-main">
        <div id="swup" className="transition-fade">
          {children}
        </div>
      </main>
      <footer className="site-foot">
        &copy; {new Date().getFullYear()} <Link to={`/`}>{title}</Link>
      </footer>
    </div>
  )
}

export default Layout
