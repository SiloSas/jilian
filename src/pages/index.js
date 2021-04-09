import React from "react"
import { graphql, StaticQuery } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import PostCard from "../components/postCard"

// import "../utils/global.scss"
import "../utils/normalize.css"
import "../utils/css/screen.css"
//TODO: switch to staticQuery, get rid of comments, remove unnecessary components, export as draft template
const BlogIndex = ({ data }, location) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allContentfulProject.edges
  let postCounter = 0

  return (
    <Layout title={siteTitle}>
      <SEO
        title="All posts"
        keywords={[`photographie`, `ardeche`, `Jillian`]}
      />
      {/* <Bio /> */}
      {data.site.siteMetadata.description && (
        <header className="page-head">
          <h2 className="page-head-title">
            {data.site.siteMetadata.description}
          </h2>
        </header>
      )}
      <div className="post-feed">
        {posts.map(({ node }) => {
          postCounter++
          return (
            <PostCard
              key={node.slug}
              count={postCounter}
              node={node}
              postClass={`post`}
            />
          )
        })}
      </div>
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
    allContentfulProject(sort: { fields: [date], order: DESC }) {
      edges {
        node {
          excerpt {
            childMarkdownRemark {
              html
            }
            excerpt
          }
          slug
          title
          description {
            childMarkdownRemark {
              html
            }
            description
          }
          thumbnail {
            fluid(maxWidth: 1360) {
              src
              srcSet
              srcWebp
            }
          }
          date(formatString: "MMMM DD, YYYY")
        }
      }
    }
  }
`
//            date(formatString: "MMMM DD, YYYY")
//sort: { fields: [date], order: DESC }
export default props => (
  <StaticQuery
    query={indexQuery}
    render={data => (
      <BlogIndex location={props.location} props data={data} {...props} />
    )}
  />
)
