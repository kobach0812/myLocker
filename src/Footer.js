import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-top">
        <div className="footer-section">
          <h4>MyLocker</h4>
          <p>+X XX XX XX XX</p>
          <div className="social-icons">
            <a href="#" aria-label="Facebook">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#" aria-label="Instagram">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" aria-label="GitHub">
              <i className="fab fa-github"></i>
            </a>
            <a href="#" aria-label="Twitter">
              <i className="fab fa-twitter"></i>
            </a>
          </div>
          <button className="contact-button">Contact Us</button>
        </div>
        <div className="footer-section">
          <h4>Product</h4>
          <ul>
            <li><a href="#">Locker</a></li>
            <li><a href="#">Organization</a></li>
            <li><a href="#">Web-design</a></li>
            <li><a href="#">Content</a></li>
            <li><a href="#">Integrations</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Resources</h4>
          <ul>
            <li><a href="#">Academy</a></li>
            <li><a href="#">Blog</a></li>
            <li><a href="#">Themes</a></li>
            <li><a href="#">Hosting</a></li>
            <li><a href="#">Developers</a></li>
            <li><a href="#">Support</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Company</h4>
          <ul>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">FAQs</a></li>
            <li><a href="#">Teams</a></li>
            <li><a href="#">Contact Us</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2024 All Rights Reserved.</p>
        <ul className="footer-links">
          <li><a href="#">Privacy Policy</a></li>
          <li><a href="#">Terms of Use</a></li>
          <li><a href="#">Sales and Refunds</a></li>
          <li><a href="#">Legal</a></li>
          <li><a href="#">Site Map</a></li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
