import React from "react"
import { graphql, StaticQuery } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/layout"
import SEO from "../components/seo"

import "../utils/normalize.css"
import "../utils/css/screen.css"

const ElementsPage = ({ data }, location, ...props) => {
  const siteTitle = data.site.siteMetadata.title
  const products = data.allContentfulProduct.edges

  return (
    <Layout title={siteTitle}>
      <SEO
        title="All posts"
        keywords={[`blog`, `gatsby`, `javascript`, `react`]}
      />

      <article className="post-content page-template no-image">
        <div className="post-content-body">
          <h2 id="images">Shop</h2>
          {products.map(product => {
            const options = {}
            Object.keys(product.node.options.options).map(key => {
              const value = product.node.options.options[key]
              const newKey = key.replaceAll("_", "-")
              options[newKey] = value
            })
            return (
              <div
                className="kg-card kg-image-card "
                style={{
                  boxShadow:
                    "0 10px 16px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19)",
                }}
              >
                <Img fluid={product.node.photo.fluid} className="kg-image" />
                <figcaption style={{ display: "flex" }}>
                  <h3 style={{ margin: 0, flex: 1, textAlign: "left" }}>
                    {product.node.title} {product.node.price} €
                  </h3>
                  <button
                    className="snipcart-add-item"
                    style={{ height: 43 }}
                    data-item-id={product.node.id}
                    data-item-price={product.node.price}
                    data-item-url={product.node.id}
                    data-item-description={product.node.description.description}
                    data-item-image={product.node.photo.src}
                    data-item-name={product.node.title}
                    {...options}
                  >
                    Ajouter au panier
                  </button>
                </figcaption>
              </div>
            )
          })}
        </div>
      </article>
    </Layout>
  )
}

const indexQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
      }
    }
    allContentfulProduct(sort: { fields: [date], order: DESC }) {
      edges {
        node {
          id
          title
          description {
            childMarkdownRemark {
              html
            }
            description
          }
          photo {
            fluid(maxWidth: 1360) {
              ...GatsbyContentfulFluid_noBase64
            }
          }
          date(formatString: "MMMM DD, YYYY")
          price
          options {
            options {
              data_item_custom2_name
              data_item_custom2_options
              data_item_custom1_name
              data_item_custom1_options
            }
          }
        }
      }
    }
  }
`

export default props => (
  <StaticQuery
    query={indexQuery}
    render={data => (
      <ElementsPage location={props.location} data={data} {...props} />
    )}
  />
)
