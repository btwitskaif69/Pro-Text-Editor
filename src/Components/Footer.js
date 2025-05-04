import React from "react";

export default function Footer({ mode }) {
  const isDark = mode === 'dark';
  const textClass = isDark ? 'text-light' : 'text-dark';
  const borderClass = isDark ? 'border-light' : 'border-dark';

  return (
    <footer
      className={`pt-5 pb-4 border-top`}
      style={{
        backgroundColor: isDark ? '#000000' : '#ffffff', // Pure black for dark mode
        color: isDark ? '#ffffff' : '#000000', // Light text in dark mode, dark text in light mode
        borderColor: isDark ? '#ffffff' : '#000000', // Border color to match the theme
        paddingTop: '5rem', 
        paddingBottom: '4rem',
      }}
    >
      <div className="container">
        <div className="row align-items-start">
          {/* About */}
          <div className="col-md-6 mb-4">
            <h5 className="fw-bold mb-3">Pro Text Editor</h5>
            <p className="text-muted small mb-0" style={{ maxWidth: "500px" }}>
              Pro Text Editor is a minimalist, modern tool for editing text and transforming content. Enjoy features like formatting, analysis, and speech-to-text in one seamless UI.
            </p>
          </div>

          {/* Contact + Links */}
          <div className="col-md-6 mb-4">
            <h6 className="fw-semibold mb-3">Contact & Social</h6>
            <p className="small mb-3">
              <i className="bi bi-envelope me-2"></i>
              <a href="mailto:mohdkaif18th@gmail.com" className={`text-decoration-none ${textClass}`}>
                mohdkaif18th@gmail.com
              </a>
            </p>
            <div className="d-flex flex-wrap gap-2">
  <a
    href="https://www.linkedin.com/in/btwitskaif69/"
    target="_blank"
    rel="noreferrer"
    className={`btn btn-sm d-flex align-items-center gap-1 ${
      isDark ? 'btn-primary text-white' : 'btn-outline-primary'
    }`}
  >
    <i className="bi bi-linkedin"></i> LinkedIn
  </a>
  <a
    href="https://x.com/btwitskaif69/"
    target="_blank"
    rel="noreferrer"
    className={`btn btn-sm d-flex align-items-center gap-1 ${
      isDark ? 'btn-info text-white' : 'btn-outline-secondary'
    }`}
  >
    <i className="bi bi-twitter-x"></i> Twitter
  </a>
  <a
    href="https://github.com/btwitskaif69"
    target="_blank"
    rel="noreferrer"
    className={`btn btn-sm d-flex align-items-center gap-1 ${
      isDark ? 'btn-light text-dark' : 'btn-outline-dark'
    }`}
  >
    <i className="bi bi-github"></i> GitHub
  </a>
</div>

          </div>
        </div>

        <hr className={`mt-4 mb-3 ${borderClass}`} />
        <p className="text-center small text-muted mb-0">
          © 2025 <strong>Pro Text Editor</strong>. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
