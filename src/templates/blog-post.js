import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/layout"
import SEO from "../components/seo"

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.contentfulProject
    const siteTitle = this.props.data.site.siteMetadata.title

    console.log(post)

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title={post.title}
          description={
            post.description
              ? post.description.description
              : post.excerpt
              ? post.excerpt.excerpt
              : `Projet ${post.title} par Jillian Chabal`
          }
        />
        <article className={`post-content ${post.thumbnail || `no-image`}`}>
          <header className="post-content-header">
            <h1 className="post-content-title">{post.title}</h1>
          </header>

          {post.description && (
            <p class="post-content-excerpt">{post.description.description}</p>
          )}

          {post.thumbnail && (
            <div className="post-content-image">
              <Img
                className="kg-image"
                fluid={post.thumbnail.fluid}
                alt={post.title}
              />
            </div>
          )}

          <div
            className="post-content-body"
            dangerouslySetInnerHTML={{
              __html: post.content.childMarkdownRemark.html,
            }}
          />

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
      excerpt {
        childMarkdownRemark {
          html
        }
        excerpt
      }
      content {
        childMarkdownRemark {
          html
        }
      }
      title
      date(formatString: "MMMM DD, YYYY")
      description {
        childMarkdownRemark {
          html
        }
        description
      }
      thumbnail {
        fluid(maxWidth: 1360) {
          ...GatsbyContentfulFluid_noBase64
        }
      }
    }
  }
`
