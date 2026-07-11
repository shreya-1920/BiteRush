
import Container from "react-bootstrap/Container";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
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
            <li onClick={() => navigate("/")}>Home</li>

<li onClick={() => navigate("/restaurants")}>
    Restaurants
</li>

<li onClick={() => navigate("/restaurants?offers=true")}>
    Offers
</li>

<li onClick={() => navigate("/about")}>
    About Us
</li>
</ul>
          </div>

          {/* SUPPORT */}

          <div className="footer-support">

            <h4>SUPPORT</h4>

            <ul>
              <li>Help Center</li>
              <li>Order Tracking</li>
              <li>Partner With Us</li>
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
              <li>Accessibility</li>
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

          <div className="footer-bottom-links">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Cookies</a>
          </div>

        </div>

      </Container>
    </footer>
  );
}

export default Footer;