
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";

import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

import {
  FiPhone,
  FiMail,
  FiMapPin,
} from "react-icons/fi";

function Footer() {
  
  return (
    <footer className="footer">
      <Container>

        <div className="footer-top">

          {/* ABOUT */}

          <div className="footer-about">

            <div className="footer-logo">
              <div className="logo-icon">🍔</div>
              <h3>BiteRush</h3>
            </div>

            <p className="footer-description">
              Premium food delivery, connecting you with the finest local
              restaurants since 2026.
            </p>

            <div className="social-icons">
              <a href="#"><FaFacebookF /></a>
              <a href="#"><FaInstagram /></a>
              <a href="#"><FaTwitter /></a>
              <a href="#"><FaYoutube /></a>
            </div>

          </div>

          {/* LINKS */}

          <div className="footer-links">

            <h4>QUICK LINKS</h4>
<ul>

<li>
    <Link to="/">Home</Link>
</li>

<li>
    <Link to="/restaurants">Restaurants</Link>
</li>



<li>
    <Link to="/about">About Us</Link>
</li>

<li>
    <Link to="/Contact">Contact </Link>
</li>

</ul>
          </div>

          {/* SUPPORT */}

          <div className="footer-support">

            <h4>SUPPORT</h4>

            <ul>
              <li><Link to="/contact">Help Center</Link></li>
              <li><Link to="/orders">Order Tracking</Link></li>
              <li><Link to="/contact">Partner With Us</Link></li>
              <li><Link to="/privacy-policy">Privacy Policy</Link></li>
              <li><Link to="/terms">Terms of Service</Link></li>
              <li><Link to="/accessibility">Accessibility</Link></li>
            </ul>

          </div>

          {/* CONTACT */}

          <div className="footer-contact">

            <h4>CONTACT</h4>

            <div className="contact-item">
              <FiPhone />
              <div>
                <p>+1 (800) 248-7874</p>
                <span>Mon–Fri, 9am–10pm</span>
              </div>
            </div>

            <div className="contact-item">
              <FiMail />
              <div>
                <p>hello@biterush.com</p>
                <span>We reply within 2 hours</span>
              </div>
            </div>

            <div className="contact-item">
              <FiMapPin />
              <div>
                <p>340 Market Street</p>
                <span>San Francisco, CA 94102</span>
              </div>
            </div>

          </div>

        </div>

        {/* FOOTER BOTTOM */}

        <div className="footer-bottom">

          <p>© 2026 BiteRush. All rights reserved.</p>

          

        </div>

      </Container>
    </footer>
  );
}

export default Footer;