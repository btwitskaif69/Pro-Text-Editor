import React from 'react';
import PropTypes from 'prop-types';

export default function Navbar({ title, mode, toggleMode }) {
  return (
    <nav
      className={`navbar navbar-expand-lg shadow-sm ${mode === 'dark' ? 'text-light' : 'text-dark'}`}
      style={{
        backgroundColor: mode === 'dark' ? '#000000' : '#ffffff', // Set pure black for dark mode
        color: mode === 'dark' ? '#ffffff' : '#000000', // Text color to light or dark
      }}
    >
      <div className="container-fluid">
        <a className="navbar-brand fs-3" href="/" style={{
        backgroundColor: mode === 'dark' ? '#000000' : '#ffffff', // Set pure black for dark mode
        color: mode === 'dark' ? '#ffffff' : '#000000', fontWeight: '500'// Text color to light or dark
      }}><i className="bi bi-file-earmark-text"></i>
          {title}
        </a>
        <button
  className={`navbar-toggler border-0 custom-toggler ${mode === 'light' ? 'light' : ''}`}
  type="button"
  data-bs-toggle="collapse"
  data-bs-target="#navbarContent"
  aria-controls="navbarContent"
  aria-expanded="false"
  aria-label="Toggle navigation"
>
  <span className="navbar-toggler-icon"></span>
</button>


        <div className="collapse navbar-collapse justify-content-end" id="navbarContent">
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              role="switch"
              id="darkModeSwitch"
              onChange={toggleMode}
              checked={mode === 'dark'}
            />
            <label
              className={`form-check-label text-${mode === 'light' ? 'dark' : 'light'}`}
              htmlFor="darkModeSwitch"
            >
              {mode === 'light' ? 'Enable Dark Mode' : 'Disable Dark Mode'}
            </label>
          </div>
        </div>
      </div>
    </nav>
  );
}

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  mode: PropTypes.string.isRequired,
  toggleMode: PropTypes.func.isRequired,
};

Navbar.defaultProps = {
  title: "Set Title Here",
};
