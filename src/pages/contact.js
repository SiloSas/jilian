import React from "react"
import { graphql, StaticQuery } from "gatsby"
import Img from "gatsby-image"
import { useState } from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import emailjs from "emailjs-com"
import "../utils/normalize.css"
import "../utils/css/screen.css"

const AboutPage = ({ data }, location) => {
  const siteTitle = data.site.siteMetadata.title
  const html =
    data.allContentfulContact.edges[0].node.page.childMarkdownRemark.html
  const [emailMessage, setEmailMessage] = useState({ message: "" })

  function sendEmail(e) {
    e.preventDefault()

    emailjs
      .sendForm(
        "service_i2fkssq",
        "template_bj8dwgd",
        e.target,
        "user_Br0RLOp8Ao5IfuUPE2XpN"
      )
      .then(
        result => {
          console.log(result.text)
          setEmailMessage({ message: "Message envoyé" })
        },
        error => {
          setEmailMessage({ message: error.text })
          console.log(error.text)
        }
      )
  }

  return (
    <Layout title={siteTitle}>
      <SEO
        title="Contact"
        keywords={[`photographie`, `ardeche`, `Jillian`, `contact`]}
      />
      <div
        style={{ marginTop: 40 }}
        className="post-content-body"
        dangerouslySetInnerHTML={{ __html: html }}
      />
      <h3>{emailMessage.message}</h3>
      <form className="contact-form" onSubmit={sendEmail}>
        <input type="hidden" name="contact_number" />
        <label>Name</label>
        <input type="text" name="user_name" />
        <label>Email</label>
        <input type="email" name="user_email" />
        <label>Message</label>
        <textarea name="message" />
        <input type="submit" style={{ marginTop: 10 }} value="Envoyer" />
      </form>
    </Layout>
  )
}

const indexQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allContentfulContact {
      edges {
        node {
          page {
            childMarkdownRemark {
              html
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
      <AboutPage location={props.location} data={data} {...props} />
    )}
  />
)
