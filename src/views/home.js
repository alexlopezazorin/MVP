import React from 'react'

import Script from 'dangerous-html/react'
import { Helmet } from 'react-helmet'

import Navigation from '../components/navigation'
import Footer from '../components/footer'
import './home.css'

const Home = (props) => {
  return (
    <div className="home-container1">
      <Helmet>
        <title>Humongous Jumpy Owl</title>
        <meta property="og:title" content="Humongous Jumpy Owl" />
        <link
          rel="canonical"
          href="https://humongous-jumpy-owl-7nd8xp.teleporthq.app/"
        />
        <meta
          property="og:url"
          content="https://humongous-jumpy-owl-7nd8xp.teleporthq.app/"
        />
      </Helmet>
      <Navigation></Navigation>
      <section className="quick-contact-cta">
        <div className="cta-container">
          <div className="cta-card">
            <div className="cta-content">
              <h2 className="section-title">Ready to elevate your English?</h2>
              <p className="section-content">
                Join GuiTeach today and start your journey towards fluency with
                personalized private lessons tailored to your specific goals and
                pace.
              </p>
              <div className="cta-actions">
                <a href="/login">
                  <div className="btn-primary btn btn-lg">
                    <svg
                      fill="none"
                      width="20"
                      xmlns="http://www.w3.org/2000/svg"
                      height="20"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M15 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2v-2"></path>
                      <path d="M21 12H8l3-3m0 6l-3-3"></path>
                    </svg>
                    <span>Login to Dashboard</span>
                  </div>
                </a>
                <div className="cta-contact-info">
                  <span className="section-content">Have questions?</span>
                  <a href="mailto:gui@guiteach.com?subject=">
                    <div className="btn btn-link">
                      <svg
                        fill="none"
                        width="18"
                        xmlns="http://www.w3.org/2000/svg"
                        height="18"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="m22 7l-8.991 5.727a2 2 0 0 1-2.009 0L2 7"></path>
                        <rect x="2" y="4" rx="2" width="20" height="16"></rect>
                      </svg>
                      <span>Contact Gui directly</span>
                    </div>
                  </a>
                </div>
              </div>
            </div>
            <div aria-hidden="true" className="cta-visual-element">
              <div className="cta-shape cta-shape-1"></div>
              <div className="cta-shape-2 cta-shape"></div>
            </div>
          </div>
        </div>
      </section>
      <div className="home-container2">
        <div className="home-container3">
          <Script
            html={`<script defer data-name="cta-interaction">
(function(){
  const ctaCard = document.querySelector(".cta-card")

  if (ctaCard) {
    ctaCard.addEventListener("mouseenter", () => {
      ctaCard.style.borderColor = "var(--color-primary)"
      ctaCard.style.boxShadow = "0 15px 40px -10px color-mix(in oklab, var(--color-primary) 15%, transparent)"
    })

    ctaCard.addEventListener("mouseleave", () => {
      ctaCard.style.borderColor = "var(--color-border)"
      ctaCard.style.boxShadow = "0 10px 30px -10px color-mix(in oklab, var(--color-on-surface) 10%, transparent)"
    })
  }
})()
</script>`}
          ></Script>
        </div>
      </div>
      <Footer></Footer>
      <a href="https://play.teleporthq.io/signup">
        <div aria-label="Sign up to TeleportHQ" className="home-container4">
          <svg
            width="24"
            height="24"
            viewBox="0 0 19 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="home-icon16"
          >
            <path
              d="M9.1017 4.64355H2.17867C0.711684 4.64355 -0.477539 5.79975 -0.477539 7.22599V13.9567C-0.477539 15.3829 0.711684 16.5391 2.17867 16.5391H9.1017C10.5687 16.5391 11.7579 15.3829 11.7579 13.9567V7.22599C11.7579 5.79975 10.5687 4.64355 9.1017 4.64355Z"
              fill="#B23ADE"
            ></path>
            <path
              d="M10.9733 12.7878C14.4208 12.7878 17.2156 10.0706 17.2156 6.71886C17.2156 3.3671 14.4208 0.649963 10.9733 0.649963C7.52573 0.649963 4.73096 3.3671 4.73096 6.71886C4.73096 10.0706 7.52573 12.7878 10.9733 12.7878Z"
              fill="#FF5C5C"
            ></path>
            <path
              d="M17.7373 13.3654C19.1497 14.1588 19.1497 15.4634 17.7373 16.2493L10.0865 20.5387C8.67402 21.332 7.51855 20.6836 7.51855 19.0968V10.5141C7.51855 8.92916 8.67402 8.2807 10.0865 9.07221L17.7373 13.3654Z"
              fill="#2874DE"
            ></path>
          </svg>
          <span className="home-text3">Built in TeleportHQ</span>
        </div>
      </a>
    </div>
  )
}

export default Home
