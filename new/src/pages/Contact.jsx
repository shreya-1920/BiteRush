import Header from "../Components/Header";
import Footer from "../Components/Footer";
import "../styles/Contact.css";
import contactHero from "../assets/images/contactHero.png";
import contactMap from "../assets/images/contactMap.png";
import {
FaMapMarkerAlt,
FaPhoneAlt,
FaEnvelope,
FaClock,
 FaBolt,
  FaShieldAlt,
  FaUsers,
} from "react-icons/fa";

import Accordion from "react-bootstrap/Accordion";

export default function Contact(){
    return(
        <>
        <Header/>


<section className="contact-hero">

    <div className="contact-content">

        <div className="contact-left">

            <span className="section-tag">
                CONTACT US
            </span>

            <h1>
                Let's Get in
                <span> Touch</span>
            </h1>

            <p>
                Whether you have a question about your order,
                need help with an existing delivery, or simply
                want to share your feedback, our support team
                is always ready to help.
            </p>

            <div className="contact-buttons">

                <button className="primary-btn">
                    View FAQs
                </button>

                <button className="secondary-btn">
                    Support Center
                </button>

            </div>

        </div>

        <div className="contact-right">

            <img
                src={contactHero}
                alt="Contact Hero"
            />

            <div className="floating burger">🍔</div>
            <div className="floating pizza">🍕</div>
            <div className="floating fries">🍟</div>

        </div>

    </div>

</section>
{/* ================= CONTACT INFO ================= */}

<section className="contact-info">

<div className="info-grid">

<div className="info-card">

<div className="info-icon">
<FaMapMarkerAlt/>
</div>

<h3>Visit Us</h3>

<p>
C-Scheme, Jaipur
<br/>
Rajasthan 302001
</p>

</div>

<div className="info-card">

<div className="info-icon">
<FaPhoneAlt/>
</div>

<h3>Call Us</h3>

<p>
+91 9876543210
<br/>
Mon - Sun
</p>

</div>

<div className="info-card">

<div className="info-icon">
<FaEnvelope/>
</div>

<h3>Email Us</h3>

<p>
support@biterush.com
</p>

</div>

<div className="info-card">

<div className="info-icon">
<FaClock/>
</div>

<h3>Hours</h3>

<p>
10 AM - 12 AM
<br/>
24×7 Support
</p>

</div>

</div>

</section>
{/* ================= CONTACT FORM ================= */}

<section className="contact-form-section">

    <div className="contact-left-info">

        <span className="section-tag">
            SUPPORT
        </span>

        <h2>Why Reach Out?</h2>

        <p>
            We're committed to making every BiteRush experience
            smooth, fast, and enjoyable. Our support team is here
            whenever you need assistance.
        </p>

        <div className="support-list">

            <div className="support-item">

                <div className="support-icon">
                    <FaBolt />
                </div>

                <div>

                    <h4>Fast Support</h4>

                    <p>
                        Average response within 5 minutes for
                        active orders.
                    </p>

                </div>

            </div>

            <div className="support-item">

                <div className="support-icon">
                    <FaShieldAlt />
                </div>

                <div>

                    <h4>Satisfaction Guaranteed</h4>

                    <p>
                        Quick issue resolution and hassle-free
                        refunds whenever needed.
                    </p>

                </div>

            </div>

            <div className="support-item">

                <div className="support-icon">
                    <FaUsers />
                </div>

                <div>

                    <h4>Trusted Community</h4>

                    <p>
                        Trusted by thousands of happy food lovers
                        across India.
                    </p>

                </div>

            </div>

        </div>

    </div>

    <div className="contact-form-card">

        <form>

            <div className="form-grid">

                <input
                    type="text"
                    placeholder="Your Name"
                />

                <input
                    type="email"
                    placeholder="Email Address"
                />

                <input
                    type="tel"
                    placeholder="Phone Number"
                />

                <select>

                    <option>General Query</option>
                    <option>Order Issue</option>
                    <option>Refund</option>
                    <option>Feedback</option>

                </select>

            </div>

            <textarea
                rows="6"
                placeholder="How can we help you today?"
            ></textarea>

            <button
                type="submit"
                className="send-btn"
            >
                Send Message
            </button>

        </form>

    </div>

</section>
{/* ================= MAP ================= */}

<section className="location-section">

    <span className="section-tag">
        LOCATION
    </span>

    <h2>Find Our HQ</h2>

    <div className="location-wrapper">

        <div className="map-box">

            <img
                src={contactMap}
                alt="BiteRush Location"
            />

        </div>

        <div className="location-info">

            <h3>The BiteRush Hub</h3>

            <p>
                Our headquarters is located in the heart of Jaipur,
                where technology meets delicious food experiences.
            </p>

            <div className="location-item">
                📍 C-Scheme, Jaipur, Rajasthan
            </div>

            <div className="location-item">
                🚌 Near Central Park
            </div>

            <button>
                Get Directions
            </button>

        </div>

    </div>

</section>
{/* ================= FAQ ================= */}

<section className="br-faq-section">

    <span className="br-section-tag">
        FAQ
    </span>

    <h2>Frequently Asked Questions</h2>

    <Accordion className="br-faq-box">

        <Accordion.Item eventKey="0">
            <Accordion.Header>
                How can I track my live order?
            </Accordion.Header>
            <Accordion.Body>
                Open your Orders page to track your delivery in real time.
            </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="1">
            <Accordion.Header>
                What is your cancellation policy?
            </Accordion.Header>
            <Accordion.Body>
                Orders can be cancelled before the restaurant starts preparing them.
            </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="2">
            <Accordion.Header>
                Which payment methods do you accept?
            </Accordion.Header>
            <Accordion.Body>
                UPI, Cards, Net Banking and Cash on Delivery.
            </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="3">
            <Accordion.Header>
                Can I schedule an order?
            </Accordion.Header>
            <Accordion.Body>
                Yes, select your preferred delivery time during checkout.
            </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="4">
            <Accordion.Header>
                How do I contact support?
            </Accordion.Header>
            <Accordion.Body>
                Reach us through the Contact Form or call our support team.
            </Accordion.Body>
        </Accordion.Item>

    </Accordion>

</section>
<section className="about-cta">

    <h2>
        Ready to Satisfy
        <br />
        Your Cravings?
    </h2>

    <p>
        Explore hundreds of restaurants and enjoy
        delicious meals delivered right to your doorstep.
    </p>

    <button>
        Explore Restaurants →
    </button>

</section>
        <Footer/>
        </>
    )
}