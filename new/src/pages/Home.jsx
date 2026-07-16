import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import foodPlatter from "../assets/images/food-platter.png";
import Stats from "../Components/Stats";
import { useLocation } from "../context/LocationContext";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import {
  FaStar,
  FaMotorcycle,
  FaUtensils,
  FaQuoteLeft,
FaClock,
FaArrowRight,
FaCheck
} from "react-icons/fa";
import { FaFaceSmileBeam ,FaTruckFast} from "react-icons/fa6";
import { HiArrowLongRight } from "react-icons/hi2";
import { Swiper, SwiperSlide } from "swiper/react";

import { Navigation } from "swiper/modules";
import "swiper/css/navigation";
import { useState } from "react";
import "swiper/css";
import burgerImg from "../assets/images/burger-image.png";
import pizzaImg from "../assets/images/pizza-image.png";
import coffeeImg from "../assets/images/coffee.png";
/*import chineseImg from "../assets/images/chinese.png";*/
/*import dessertImg from "../assets/images/desserts.png";*/
import drinksImg from "../assets/images/drinks.png";
import northIndianImg from "../assets/images/north-indian.png";
import southIndianImg from "../assets/images/south-indian.png";
import healthyFoodImg from "../assets/images/healthy-food.png";
import fastFoodImg from "../assets/images/fast-food.png";
import mexicanImg from "../assets/images/mexican.png";
import italianImg from "../assets/images/italian.png"
import customer1 from "../assets/images/male-avatar1.png";
import customer2 from "../assets/images/female-avatar1.png";
import customer3 from "../assets/images/female-avatar2.png";
import burgerImg2 from "../assets/images/restaurant-1.png";
import pizzaImg2 from "../assets/images/restaurant-2.png";
import saladImg from "../assets/images/restaurant-3.png";
import ramenImg from "../assets/images/restaurant-4.png";
import { useNavigate } from "react-router-dom";
{/*function Counter({ end, duration = 2000, suffix = "", decimals = 0 }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;

    let start = 0;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;

      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [started, end, duration]);

  return (
    <span ref={ref}>
      {count.toFixed(decimals)}
      {suffix}
    </span>
  );
}*/}


function Home() {
  const [showLocation, setShowLocation] = useState(false);
  const { location, setLocation } = useLocation();

 const [copied, setCopied] = useState(false);

const copyCoupon = () => {

    navigator.clipboard.writeText("BITEFIRST");

    setCopied(true);

    setTimeout(() => {
        setCopied(false);
    }, 2000);
};
  
const [search, setSearch] = useState("");
  const categories=[
              {
                  id:1,
                  name:"Coffee",
                  image:coffeeImg,
                  count:"120+"
              },
              {
                  id:2,
                  name:"Healthy Food",
                  image: healthyFoodImg , 
                  count:"80+",
              },
              {
                  id:3,
                  name:"Burger",
                  image:"https://plus.unsplash.com/premium_photo-1695822019254-29dbf739474d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzN8fGJ1cmdlciUyMGltYWdlfGVufDB8fDB8fHww", 
                  count:"90+",
              },
              {
                  id:4,
                  name:"Pizza",
                  image:pizzaImg, 
                  count: "80+",
              },
              {
                  id:5,
                  name:"South Indian",
                  image:southIndianImg, 
                   count: "45+",
              },
              {
                  id:6,
                  name:"North Indian",
                  image:northIndianImg, 
                  count:"60+",
              },
              {
                  id:7,
                  name:"Fast-Food",
                  image:fastFoodImg, 
                   count: "85+",
              },
              {
                  id:8,
                  name:"Drinks",
                  image:drinksImg, 
                   count: "45+",
              },
              {
                  id:9,
                  name:"Chinese",
                  image:"https://images.unsplash.com/photo-1614104030967-5ca61a54247b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGNoaW5lc2UlMjBmb29kfGVufDB8fDB8fHww", 
                   count: "30+"
              },
              {
                  id:10,
                  name:"Desserts",
                  image:"https://plus.unsplash.com/premium_photo-1681826475987-0e91bd4e6428?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8ZGVzc2VydHMlMjBpbWFnZXN8ZW58MHx8MHx8fDA%3D", 
                   count: "45+",
              },
               {
                  id:11,
                  name:"Mexican",
                  image:mexicanImg, 
                   count:"25+",
              },
               {
                  id:12,
                  name:"Italian",
                  image:italianImg, 
                   count: "45+",
              }
      
          ]
const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    role: "Food Blogger",
    review:
      "BiteRush has completely changed how I order food. The delivery is lightning fast and the food always arrives hot and fresh.",
    image: customer2,
    active: false,
  },
  {
    id: 2,
    name: "Arjun Mehta",
    role: "Software Engineer",
    review:
      "The variety of restaurants is incredible. I can find everything from biryani to gourmet burgers. BiteRush is my go-to app every day.",
    image: customer1,
    active: true,
  },
  {
    id: 3,
    name: "Sara Johnson",
    role: "Graphic Designer",
    review:
      "Super easy to use, fast delivery, and excellent customer support. I ordered late at night and still got my pizza in under 30 minutes.",
    image: customer3,
    active: false,
  },
];
const steps = [
    {
      id: 1,
      icon: <FaUtensils size={36} />,
      title: "Choose Your Food",
      description: "Browse restaurants and select your favorite meals",
    },
    {
      id: 2,
      icon: <FaTruckFast size={36}  />,
      title: "Fast Delivery",
      description:
        "Our delivery partners bring your order quickly and safely.",
    },
    {
      id: 3,
      icon: <FaFaceSmileBeam size={36} />,
      title: "Enjoy Your Meal",
      description:
        "Fresh food delivered to your doorstep. Enjoy every bite!",
    },
  ];
 const restaurants = [
  {
    id: 1,
    image: burgerImg2,
    badge: "Top Rated",
    name: "The Smokehouse Grill",
    cuisine: "American • Burgers • BBQ",
    rating: "4.9",
    reviews: "1240",
    delivery: "18–25 min",
    offer: "Free delivery",
  },

  {
    id: 2,
    image: pizzaImg2,
    badge: "Popular",
    name: "Napoli Express",
    cuisine: "Italian • Pizza • Pasta",
    rating: "4.7",
    reviews: "894",
    delivery: "20–30 min",
    offer: "$1.99 delivery",
  },

  {
    id: 3,
    image: ramenImg,
    badge: "New",
    name: "Sakura Kitchen",
    cuisine: "Japanese • Sushi • Ramen",
    rating: "4.8",
    reviews: "672",
    delivery: "25–35 min",
    offer: "Free delivery",
  },

  {
    id: 4,
    image: saladImg,
    badge: "Trending",
    name: "Green Bowl Co.",
    cuisine: "Healthy • Salads • Bowls",
    rating: "4.6",
    reviews: "510",
    delivery: "15–20 min",
    offer: "Free delivery",
  },
];
const navigate = useNavigate();
  return (
    <>
      <Header />
      
      {/*HERO*/}
     <section className="br-hero">
      <Container>

        <div className="br-hero-container">

          {/* LEFT SIDE */}

          <div className="br-hero-left">

            <div className="br-hero-badge">
              <span>🍔</span>
              <p>Fast Delivery in 30 Minutes</p>
            </div>

            <div className="br-hero-content">

              <h1>
                Discover
                <br />
                <span className="br-accent br-italic">
                  Great Food,
                </span>
                <br />
                Delivered <span className="br-accent">Faster</span>
              </h1>

              <p className="br-hero-description">
                Order from your favorite restaurants and get fresh,
                delicious meals delivered right to your doorstep.
              </p>

            </div>

            {/* SEARCH */}

            <div className="br-hero-search">

              <Form className="br-search-form">

<div className="br-location-dropdown">

    <button
        type="button"
        className="br-location-btn"
        onClick={() => setShowLocation(!showLocation)}
    >
        📍 {location}
        <span>▼</span>
    </button>

    {showLocation && (

        <div className="br-location-menu">

            {[
              "All Locations",
                "Jaipur",
                "Delhi",
                "Mumbai",
                "Noida",
                "Kolkata"
            ].map((city) => (

                <div
                    key={city}
                    className="br-location-item"
                    onClick={() => {

                        setLocation(city);

                        localStorage.setItem(
                            "location",
                            city
                        );

                        setShowLocation(false);

                    }}
                >

                    {city}

                </div>

            ))}

        </div>

    )}

</div>

                <Form.Control
    className="br-search-input"
    placeholder="🍕 Search dishes or restaurants"
    value={search}
    onChange={(e) => setSearch(e.target.value)}
/>

<Button
    className="br-search-btn"
    onClick={() =>
        navigate(
            `/restaurants?search=${encodeURIComponent(search)}&location=${encodeURIComponent(location)}`
        )
    }
>
    Search
</Button>
                

              </Form>

            </div>

            {/* BUTTONS */}

            <div className="br-hero-buttons">

        <Button
    className="br-order-btn"
    onClick={() => navigate("/restaurants")}
>
    Order Now
    <HiArrowLongRight />
</Button>

<Button
    className="br-explore-btn"
    onClick={() => navigate("/restaurants")}
>
    Explore Restaurants
    <HiArrowLongRight />
</Button>

            </div>

            {/* FEATURES */}

            <div className="br-hero-features">

              <div className="br-feature">
                ⭐
                <span>4.8 Rated App</span>
              </div>

              <div className="br-feature">
                ⚡
                <span>20 min avg.</span>
              </div>

              <div className="br-feature">
                🛡
                <span>Secure Checkout</span>
              </div>

            </div>

          </div>

          {/* RIGHT SIDE */}

          <div className="br-hero-right">

            <div className="br-hero-image">
              <img
                src={foodPlatter}
                alt="Food Platter"
              />
            </div>

            {/* Rating Card */}

            <div className="br-floating-card br-rating-card">
              <FaStar color="#F6B100" />
              <span>4.8 Rating</span>
            </div>

            {/* Delivery Card */}

            <div className="br-floating-card br-delivery-card">
              <FaMotorcycle color="#E24B42" />
              <span>30 Min Delivery</span>
            </div>

            {/* Restaurant Card */}

            <div className="br-floating-card br-hero-restaurant-card">
              <FaUtensils color="#E24B42" />
              <span>100+ Restaurants</span>
            </div>

          </div>

        </div>

      </Container>
    </section>
 

{/*categories*/}
      
 <section className="categories">
      
              {/* Top Wave */}
              <div className="wave-top">
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 1440 120"
                      preserveAspectRatio="none"
                  >
                      <path
                          fill="#FFF8EE"
                          d="
                              M0,60
                              C60,20 120,20 180,60
                              C240,100 300,100 360,60
                              C420,20 480,20 540,60
                              C600,100 660,100 720,60
                              C780,20 840,20 900,60
                              C960,100 1020,100 1080,60
                              C1140,20 1200,20 1260,60
                              C1320,100 1380,100 1440,60
                              L1440,0
                              L0,0
                              Z
                          "
                      />
                  </svg>
              </div>
      
              <Container fluid className="px-5">
      
                  <div className="section-title">
                      <h2>Browse Categories</h2>
                      <p>Choose your favourite dishes</p>
                  </div>
      
  <div className="categories-slider">

    <button className="category-prev">
        <FaChevronLeft />
    </button>

    <button className="category-next">
        <FaChevronRight />
    </button>

    <Swiper
        modules={[Navigation]}
        navigation={{
            prevEl: ".category-prev",
            nextEl: ".category-next",
        }}
        spaceBetween={20}
        slidesPerView={3.6}
    >

        {categories.map((category) => (

            <SwiperSlide key={category.id}>

                <div
                    className="category-card"
                    onClick={() =>
                        navigate(`/restaurants?category=${category.name.toLowerCase()}`)
                    }
                >
                    <div className="category-image">
                        <img src={category.image} alt={category.name} />
                    </div>

                    <div className="category-content">
                        <h4>{category.name}</h4>
                        <p>{category.count} Restaurants</p>
                    </div>

                </div>

            </SwiperSlide>

        ))}

    </Swiper>

</div>
              </Container>
      
          </section>
      
{/*FeaturedRestaurants*/}
<section className="br-featured-restaurants">

<Container>

<div className="section-header">

<div>

<span className="section-tag">
HAND-PICKED FOR YOU
</span>

<h2>
Featured Restaurants
</h2>

</div>

<div
    className="view-all"
    onClick={() => navigate("/restaurants")}
>
    View All  <FaArrowRight />
</div>
</div>


<div className="br-restaurant-grid">

{restaurants.map((restaurant)=>(

<div
    className="br-restaurant-card"
    key={restaurant.id}
    onClick={() => navigate(`/restaurant/${restaurant.id}`)}
>

<div className="br-restaurant-image">

<img
src={restaurant.image}
alt={restaurant.name}
/>

<span
className={`br-restaurant-badge ${restaurant.badge
  .toLowerCase()
  .replace(" ", "-")}`}
>
    {restaurant.badge}
</span>

</div>

<div className="br-restaurant-content">

<h3>
{restaurant.name}
</h3>

<p className="br-cuisine">
{restaurant.cuisine}
</p>

<div className="br-restaurant-info">

<div>

<FaStar className="star"/>

<span>
{restaurant.rating}
</span>

<span className="reviews">
({restaurant.reviews})
</span>

</div>

<div>

<FaClock />

<span>
{restaurant.delivery}
</span>

</div>

</div>

<div className="br-restaurant-footer">

<div className="br-offer">

<FaCheck />

<span>
{restaurant.offer}
</span>

</div>

<a href="#">

View Menu

<FaArrowRight />

</a>

</div>

</div>

</div>

))}

</div>

</Container>

</section>


 <Stats/>    
{/*stats
<section className="br-stats">
  <Container>

    <div className="br-stats-heading">
      <h2>
        Trusted by food lovers
        <br />
        <span>across the city</span>
      </h2>
    </div>

    <div className="br-stats-grid">

      <div className="br-stat">
        <h3 className="br-stat-number">
          <Counter end={50} suffix="K+" />
        </h3>
        <p>Orders Delivered</p>
      </div>

      <div className="br-stat">
        <h3 className="br-stat-number">
          <Counter end={100} suffix="+" />
        </h3>
        <p>Restaurants</p>
      </div>

      <div className="br-stat">
        <h3 className="br-stat-number">
          <Counter end={20} suffix="K+" />
        </h3>
        <p>Happy Customers</p>
      </div>

      <div className="br-stat">
        <h3 className="br-stat-number">
          <Counter end={4.8} decimals={1} />
        </h3>
        <p>Average Rating</p>
      </div>

    </div>

  </Container>
</section>*/}
      
{/*offers*/}     
      <section className="home-offers-section">
           
      
              <div className="home-offers-wrapper">
      
                {/* LEFT */}
      
                <div className="home-offers-left">
       
                  
      
                  <h2>
                    Save More On <br />
                    <span>Every Order</span>
                  </h2>
      
                  <p>
                    Discover exclusive restaurant discounts,
                    combo offers, free delivery deals and
                    seasonal promotions available near you.
                  </p>
      
                  <div className="home-offer-tags">
      
                    <div className="home-offer-tag">
                      🎁 200+ Active Deals
                    </div>
      
                    <div className="home-offer-tag">
                      🔄 Refreshed Daily
                    </div>
      
                  </div>
      
                  <div className="home-offer-buttons">
      
            <Button
    variant="none"
    className="home-claim-btn"
    onClick={() => navigate("/restaurants?offers=true")}
>
    Claim Offers
</Button>
      
                   <div
    className="browse-all"
    onClick={() => navigate("/restaurants")}
>
    Browse All →
</div>
      
                  </div>
      
                  <div className="home-flash-sale">
      
                    <div className="home-flash-icon">
                      ⚡
                    </div>
      
                    <div>
      
                      <h4>Flash Sale Active</h4>
      
                      <span>Ends in 04 hrs 22 min</span>
      
                    </div>
      
                    <div className="home-live-dot"></div>
      
                  </div>
      
                </div>
      
                {/* RIGHT */}
      
                <div className="home-offers-right">
      
        {/* Top 3 Cards */}
      
        <div className="home-top-cards">
      
          {/* Red Card */}
      
          <div className="home-offer-card home-large-card">
      
            <div className="home-discount-badge">
              50%<br />OFF
            </div>
      
            <img src={burgerImg} alt="Burger" />
      
            <div className="home-offer-content">
      
              <h3>50% OFF</h3>
      
              <h5>On First Order</h5>
      
              <p>
                New user? Save big on your very first BiteRush order.
                No code needed.
              </p>
      
              <div className="home-offer-footer">
                <span>Use at checkout</span>
      
                <button className="home-grab-btn">
                  Grab it →
                </button>
              </div>
      
            </div>
      
          </div>
      
          {/* White Card */}
      
          <div className="home-offer-card home-white-card">
      
            <div className="home-free-badge">
              FREE
            </div>
      
            <div className="home-bike">
              <FaMotorcycle />
            </div>
      
            <div className="home-offer-content">
      
              <h3>Free Delivery</h3>
      
              <h5>Orders Above ₹299</h5>
      
              <p>
                Skip the delivery fee on qualifying orders from 100+
                partner restaurants.
              </p>
      
              <div className="home-offer-footer">
      
                <span>Auto-applied</span>
      
               <Button
    className="home-order-btn"
    onClick={() => navigate("/restaurants")}
>
    Order Now
</Button>
      
              </div>
      
            </div>
      
          </div>
      
          {/* Navy Card */}
      
          <div className="home-offer-card home-navy-card">
      
            <div className="home-new-badge">
              NEW
            </div>
      
            <img src={pizzaImg} alt="Pizza" />
      
            <div className="home-offer-content">
      
              <h3>Buy 1 Get 1</h3>
      
              <h5>Selected Restaurants</h5>
      
              <p>
                Double the flavour, same price.
                Valid this weekend.
              </p>
      
              <div className="home-offer-footer">
      
                <span>Weekend only</span>
      
               <Button
    className="home-explore-btn"
    onClick={() => navigate("/restaurants")}
>
    Explore
</Button>
      
              </div>
      
            </div>
      
          </div>
      
        </div>
      
        {/* Coupon Card */}
      
        <div className="home-coupon-card">
      
          <div className="home-coupon-left">
      
            <div className="home-coupon-icon">
              🏷️
            </div>
      
            <div>
      
              <h4>
                Use code: <span>BITEFIRST</span>
              </h4>
      
              <p>
                Get ₹100 off on your next order · Min ₹399
              </p>
      
            </div>
      
          </div>
      
      <Button 
      className="home-copy-btn"
      onClick={copyCoupon}>
    {copied ? "✓ Copied" : "Copy Code"}
</Button>
      
        </div>
              </div>
            </div>
            
          </section>
{/*Testimonials*/}
<section className="testimonials">
      <Container>
       <div className="section-heading">
        <span>CUSTOMER REVIEWS</span>
        <h2>What Our Customers Say</h2>
        <p>
            Thousands of food lovers trust BiteRush every day.
        </p>

       </div>
      <div className="testimonial-cards">

  {testimonials.map((testimonial) => (

    <div
      key={testimonial.id}
      className={`testimonial-card ${
        testimonial.active ? "active" : ""
      }`}
    >

      <div className="quote"><FaQuoteLeft/></div>

      <p className="review">
        {testimonial.review}
      </p>

     

      <div className="customer">

    <img
        src={testimonial.image}
        alt={testimonial.name}
        className="customer-image"
    />

    <div className="customer-content">

        <div className="customer-top">

            <h5>{testimonial.name}</h5>

            <div className="stars">
                ⭐⭐⭐⭐⭐
            </div>

        </div>

        <span>{testimonial.role}</span>

    </div>

</div>

    </div>
    ))}

</div>
      </Container>
    </section>


{/*HowItWorks*/}
<section className="how-it-works">
      <Container>
        <div className="section-heading">
          <span>Simple as 1-2-3</span>
          <h2>How BiteRush Works</h2>
        </div>

        <div className="steps">
          <div className="progress-line"></div>

          {steps.map((step) => (
            <div className="step-card" key={step.id}>
              <div className="icon-box">
                {step.icon}
                <span className="step-number">{step.id}</span>
              </div>

              <p className="step-label">
                STEP {String(step.id).padStart(2, "0")}
              </p>

              <h3>{step.title}</h3>

              <p className="step-description">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
      <Footer />
    </>
  );
}

export default Home;