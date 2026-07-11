import Header from "../Components/Header";
import Footer from "../Components/Footer";
import "../styles/Contact.css";
import contactHero from "../assets/images/contactHero.png";
import contactMap from "../assets/images/contactMap.png";
import ctaBg from "../assets/images/cta-bg.png.png";
import {
FaMapMarkerAlt,
FaPhoneAlt,
FaEnvelope,
FaClock,
 FaBolt,
  FaShieldAlt,
  FaUsers,
} from "react-icons/fa";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { sendContactMessage } from "../services/contactService";
import Accordion from "react-bootstrap/Accordion";

export default function Contact(){
    const navigate=useNavigate();
    const handleDirections = () => {
    window.open(
        "https://www.google.com/maps/search/?api=1&query=C-Scheme+Jaipur+Rajasthan",
        "_blank"
    );
};
    const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
});
const handleChange = (e) => {
    setFormData({
        ...formData,
        [e.target.name]: e.target.value
    });
};

const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await sendContactMessage(formData);

    if (result.success) {
        toast.success("Message sent successfully! 🎉");

        setFormData({
            name: "",
            email: "",
            phone: "",
            subject: "",
            message: ""
        });
    } else {
        toast.error(result.message);
    }
};
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

                <button className="primary-btn"    onClick={() => {
        document
            .getElementById("faq")
            ?.scrollIntoView({
                behavior: "smooth",
            });
    }}>
                    View FAQs
                </button>

                <button className="secondary-btn"  onClick={() => {
        document
            .getElementById("contact-form")
            ?.scrollIntoView({
                behavior: "smooth",
            });
    }}>
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

{/* ================= CONTACT INFO ================= */}

<section className="contact-info">
<div className="contact-heading">
    <span className="section-tag">
        CONTACT DETAILS
    </span>

    <h2>We're Always Here to Help</h2>

    <p className="contact-subtitle">
        Reach us through your preferred channel. Whether it's an order,
        feedback, partnership, or support request—we'd love to hear from you.
    </p>

</div>
    <div className="contact-container">

        <div className="contact-card">

            <div className="contact-card-icon">
                <FaMapMarkerAlt />
            </div>

            <div className="contact-card-content">
                <h3>Visit Our Office</h3>
                <p>
                    C-Scheme<br />
                    Jaipur, Rajasthan 302001
                </p>
            </div>

        </div>

        <div className="contact-card">

            <div className="contact-card-icon">
                <FaPhoneAlt />
            </div>

            <div className="contact-card-content">
                <h3>Call Us</h3>
                <p>
                    +91 98765 43210<br />
                    Available 24×7
                </p>
            </div>

        </div>

        <div className="contact-card">

            <div className="contact-card-icon">
                <FaEnvelope />
            </div>

            <div className="contact-card-content">
                <h3>Email Support</h3>
                <p>
                    support@biterush.com<br />
                    Reply within 1 hour
                </p>
            </div>

        </div>

        <div className="contact-card">

            <div className="contact-card-icon">
                <FaClock />
            </div>

            <div className="contact-card-content">
                <h3>Business Hours</h3>
                <p>
                    Monday – Sunday<br />
                    10:00 AM – 12:00 AM
                </p>
            </div>

        </div>

    </div>

</section>
{/* ================= CONTACT FORM ================= */}

<section className="contact-form-section" id="contact-form" >

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

        <form onSubmit={handleSubmit}>

            <div className="form-grid">

                <input
    type="text"
    name="name"
    placeholder="Your Name"
    value={formData.name}
    onChange={handleChange}
/>
<input
    type="email"
    name="email"
    placeholder="Email Address"
    value={formData.email}
    onChange={handleChange}
/>
<input
    type="tel"
    name="phone"
    placeholder="Phone Number"
    value={formData.phone}
    onChange={handleChange}
/>

                <select
    name="subject"
    value={formData.subject}
    onChange={handleChange}
>

                    <option>General Query</option>
                    <option>Order Issue</option>
                    <option>Refund</option>
                    <option>Feedback</option>

                </select>

            </div>

            <textarea
    rows="6"
    name="message"
    placeholder="How can we help you today?"
    value={formData.message}
    onChange={handleChange}
/>

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

            <button
    className="directions-btn"
    onClick={handleDirections}
>
    Get Directions
</button>

        </div>

    </div>

</section>
{/* ================= FAQ ================= */}

<section className="br-faq-section" id="faq">

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
<section
  className="cta-section"
  style={{
    backgroundImage: `url(${ctaBg})`,
  }}
>
  <div className="cta-overlay">

    <h2>
      Ready to Satisfy <br />
      Your Cravings?
    </h2>

    <p>
      Explore hundreds of restaurants and enjoy delicious meals
      delivered right to your doorstep.
    </p>

   <button
  className="cta-btn"
  onClick={() => navigate("/restaurants")}
>
  Explore Restaurants →
</button>

  </div>
</section>
        <Footer/>
        </>
    )
}