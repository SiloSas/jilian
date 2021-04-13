import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/layout"
import SEO from "../components/seo"
import "../utils/css/components/global.css"
import "../utils/normalize.css"
import "../utils/css/screen.css"

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.contentfulProject
    const siteTitle = this.props.data.site.siteMetadata.title

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title={post.title}
          description={`Projet ${post.title} par Jillian Chabal`}
        />
        <article className={`post-content ${post.thumbnail || `no-image`}`}>
          <header className="post-content-header">
            <h1 className="post-content-title">{post.title}</h1>
          </header>

          {post.thumbnail && (
            <div className="post-content-image">
              <Img
                className="kg-image"
                fluid={post.thumbnail.fluid}
                alt={post.title}
              />
            </div>
          )}

          {post.content && post.content.childMarkdownRemark && (
            <div
              className="post-content-body"
              dangerouslySetInnerHTML={{
                __html: post.content.childMarkdownRemark.html,
              }}
            />
          )}

          <footer className="post-content-footer">
            {/* There are two options for how we display the byline/author-info.
        If the post has more than one author, we load a specific template
        from includes/byline-multiple.hbs, otherwise, we just use the
        default byline. */}
          </footer>
        </article>
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    contentfulProject(slug: { eq: $slug }) {
      id
      content {
        childMarkdownRemark {
          html
        }
      }
      title
      date(formatString: "MMMM DD, YYYY")
      thumbnail {
        fluid(maxWidth: 1360) {
          ...GatsbyContentfulFluid_noBase64
        }
      }
    }
  }
`
