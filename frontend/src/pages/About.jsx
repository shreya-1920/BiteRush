import Header from "../Components/Header";
import Footer from "../Components/Footer";
import aboutHero from "../assets/images/about-hero3.png";
import ourStory from "../assets/images/our-story.png";
import "../styles/About.css";
import Stats from "../Components/Stats";
import { useNavigate } from "react-router-dom";

import ctaBg from "../assets/images/cta-bg.png.png";
import {
    FaBolt,
    FaStore,
    FaShieldAlt,
    FaMapMarkerAlt,
    FaHeadset,
    FaUtensils
} from "react-icons/fa";

export default function About() {
  const navigate = useNavigate();
  return (
    <>
      <Header />

      {/* ================= HERO ================= */}

<section className="about-hero">

    <div className="about-hero-content">

        <div className="about-hero-left">

            <span className="about-hero-tag">
                ABOUT BITERUSH
            </span>

            <h1>
                Delivering     <span>Happiness,</span>
                
               
                <br />
                One Bite at a Time
            </h1>

            <p>
                At BiteRush, we believe great food brings people together.
                Our platform connects food lovers with their favorite
                restaurants through a fast, secure and seamless ordering
                experience.
            </p>

            <p>
                Whether you're craving burgers, pizza, desserts or healthy
                meals, BiteRush makes every order simple, reliable and
                enjoyable.
            </p>

            <div className="about-hero-buttons">

                <button
                    className="about-primary-btn"
                    onClick={() => navigate("/restaurants")}
                >
                    Explore Restaurants
                </button>

                <button
                    className="about-secondary-btn"
                    onClick={() =>
                        document
                            .getElementById("our-story")
                            .scrollIntoView({
                                behavior: "smooth",
                            })
                    }
                >
                    Learn More
                </button>

            </div>

        </div>

        <div className="about-hero-right">

            <img
                src={aboutHero}
                alt="About BiteRush"
                className="about-hero-image"
            />

        </div>

    </div>

</section>

         


          

      {/* ================= OUR STORY ================= */}

      <section className="our-story" id="our-story">

        <div className="story-image">
          <img
            src={ourStory}
            alt="Our Story"
          />
        </div>

        <div className="story-content">

          <span className="section-tag">
            OUR STORY
          </span>

          <h2>
            Built With Passion.
            <br />
            Driven By Great Food.
          </h2>

          <p>
            BiteRush was born with one simple goal—to make food ordering effortless,
            enjoyable, and accessible for everyone.
          </p>

          <p>
            We connect food lovers with trusted restaurants through a fast,
            secure, and seamless ordering experience.
          </p>

          <button
    className="story-btn"
    onClick={() => {
        document
            .getElementById("why-us")
            .scrollIntoView({
                behavior: "smooth"
            });
    }}
>
    Learn More →
</button>

        </div>

      </section>
{/* ================= WHY CHOOSE US ================= */}

<section className="why-us" id="why-us">

    <span className="section-tag">
        WHY CHOOSE US
    </span>

    <h2>
        Why Food Lovers Choose BiteRush
    </h2>

    <p className="why-subtitle">
        Everything you need for a seamless, secure, and delightful
        food ordering experience.
    </p>

    <div className="features-grid">

        <div className="feature-card">
           <div className="feature-icon">
    <FaBolt />
</div>
            <h3>Lightning Fast Delivery</h3>
            <p>
                Get your favorite meals delivered hot and fresh
                in record time.
            </p>
        </div>

        <div className="feature-card">
            <div className="feature-icon"><FaUtensils/></div>
            <h3>Fresh & Quality Food</h3>
            <p>
                We partner with trusted restaurants serving
                delicious, hygienic meals every day.
            </p>
        </div>

        <div className="feature-card">
            <div className="feature-icon"><FaStore/></div>
            <h3>1000+ Restaurants</h3>
            <p>
                Explore a wide variety of cuisines from top-rated
                restaurants near you.
            </p>
        </div>

        <div className="feature-card">
            <div className="feature-icon"><FaShieldAlt/></div>
            <h3>Secure Payments</h3>
            <p>
                Pay confidently with safe, encrypted payment
                options.
            </p>
        </div>

        <div className="feature-card">
            <div className="feature-icon"><FaMapMarkerAlt/></div>
            <h3>Live Order Tracking</h3>
            <p>
                Track your food in real time from the kitchen
                to your doorstep.
            </p>
        </div>

        <div className="feature-card">
            <div className="feature-icon"><FaHeadset/></div>
            <h3>24×7 Support</h3>
            <p>
                Our friendly support team is always here whenever
                you need assistance.
            </p>
        </div>

    </div>

</section>
{/* ================= MISSION & VISION ================= */}

<section className="mission-section">

  <div className="mission-card">

    <div className="mission-icon">🎯</div>

    <h2>Our Mission</h2>

    <p>
      To simplify food ordering by connecting customers with trusted
      restaurants while delivering speed, convenience, and exceptional
      customer experiences every single day.
    </p>

  </div>

  <div className="mission-card">

    <div className="mission-icon">👁️</div>

    <h2>Our Vision</h2>

    <p>
      To become India's most loved food ordering platform where
      discovering delicious meals is effortless, enjoyable, and
      accessible for everyone.
    </p>

  </div>

</section>
<Stats />
{/* ================= HOW IT WORKS ================= */}

<section className="how-it-works">
  <div className="how-it-works-container">
    <span className="section-tag">
        HOW IT WORKS
    </span>

    <h2>Enjoy Delicious Food in 4 Easy Steps</h2>

    <p className="works-subtitle">
        Ordering your favorite meal has never been easier.
    </p>

    <div className="steps">

        <div className="step">

            <div className="step-icon">🍽️</div>

            <h3>Browse</h3>

            <p>
                Discover restaurants and cuisines near you.
            </p>

        </div>

        <div className="step">

            <div className="step-icon">🛒</div>

            <h3>Order</h3>

            <p>
                Add your favorite dishes to the cart.
            </p>

        </div>

        <div className="step">

            <div className="step-icon">🚴</div>

            <h3>Delivery</h3>

            <p>
                Track your order in real time.
            </p>

        </div>

        <div className="step">

            <div className="step-icon">😋</div>

            <h3>Enjoy</h3>

            <p>
                Fresh meals delivered to your doorstep.
            </p>

        </div>

    </div>
</div>
</section>
{/* ================= TESTIMONIALS ================= */}

<section className="testimonials">
<div className="testimonials-container">
  <span className="section-tag">
    TESTIMONIALS
  </span>

  <h2>What Our Customers Say</h2>

  <p className="testimonial-subtitle">
    Thousands of food lovers trust BiteRush for quick delivery,
    delicious meals, and a seamless ordering experience.
  </p>

  <div className="testimonial-grid">

    <div className="testimonial-card">

      <div className="stars">⭐⭐⭐⭐⭐</div>

      <p>
        "BiteRush has completely changed the way I order food.
        The interface is clean, delivery is super fast,
        and the food always arrives fresh!"
      </p>

      <div className="customer">

        <img
          src="https://i.pravatar.cc/80?img=32"
          alt=""
        />

        <div>
          <h4>Priya Sharma</h4>
          <span>Happy Customer</span>
        </div>

      </div>

    </div>

    <div className="testimonial-card">

      <div className="stars">⭐⭐⭐⭐⭐</div>

      <p>
        "I love the restaurant variety and real-time order
        tracking. BiteRush has become my go-to food app."
      </p>

      <div className="customer">

        <img
          src="https://i.pravatar.cc/80?img=14"
          alt=""
        />

        <div>
          <h4>Rahul Verma</h4>
          <span>Food Explorer</span>
        </div>

      </div>

    </div>

    <div className="testimonial-card">

      <div className="stars">⭐⭐⭐⭐⭐</div>

      <p>
        "Beautiful design, easy checkout, and amazing customer
        support. Ordering food has never been this enjoyable."
      </p>

      <div className="customer">

        <img
          src="https://i.pravatar.cc/80?img=44"
          alt=""
        />

        <div>
          <h4>Ananya Singh</h4>
          <span>Regular Customer</span>
        </div>

      </div>

    </div>

  </div>
</div>
</section>
{/* ================= CTA ================= */}

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

      <Footer />
    </>
  );
}