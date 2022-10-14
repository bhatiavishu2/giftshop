import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer>
      <p className="footer-links">
        <a
          href="https://github.com/sivadass/react-shopping-cart"
          target="_blank" rel="noreferrer"
        >
          View Source on Github
        </a>
        <span> / </span>
        <a href="mailto:contact@sivadass.in" target="_blank" rel="noreferrer">
          Need any help?
        </a>
        
      </p>
      <p>
        &copy; {currentYear} <strong>MB Group</strong> - Personalized Gift Store
      </p>
    </footer>
  );
};

export default Footer;
