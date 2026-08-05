import { Container,  Form, Button } from "react-bootstrap";
import {
  FaSearch,
  FaMapMarkerAlt,
  FaClock,
  FaStar,
  FaTag,
} from "react-icons/fa";
import { useLocation } from "../context/LocationContext";


function RestaurantHero({
    searchTerm,
    setSearchTerm
}) {
     const { location, setLocation } = useLocation();
  return (
    <section className="restaurant-hero">
      <Container>

        <div className="hero-content">

          {/* LEFT */}

          <div className="hero-left">

          

            <div className="hero-badge">
              🍽 100+ Restaurants Near You
            </div>

            <h1 className="hero-title">
              Discover <span>Restaurants</span>
            </h1>

            <p className="hero-description">
              Explore top-rated restaurants, delicious cuisines and exclusive
              offers delivered straight to your doorstep.
            </p>

            <div className="hero-search">

              <div className="location-box">

                <FaMapMarkerAlt />

                <div>
  <select
    className="location-select"
    value={location}
    onChange={(e) => setLocation(e.target.value)}
>
    <option value="">All Locations</option>
    <option value="Jaipur">Jaipur</option>
    <option value="Delhi">Delhi</option>
    <option value="Mumbai">Mumbai</option>
    <option value="Noida">Noida</option>
    <option value="Kolkata">Kolkata</option>
</select>
                
                </div>

              </div>

              <div className="search-divider"></div>

              <div className="search-input">

                <FaSearch />
<Form.Control
    type="text"
    placeholder="Search restaurants or cuisines..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
/>

              </div>
<Button
    className="search-btn"
    onClick={() => {
        // No navigation needed because filtering is live
    }}
>
    <FaSearch />
    Search
</Button>

            </div>

            <div className="hero-stats">

              <div className="stat">
                <FaClock />
                <span>22 min Avg</span>
              </div>

              <div className="stat">
                <FaStar />
                <span>4.8 Rating</span>
              </div>

              <div className="stat">
                <FaTag />
                <span>40+ Deals</span>
              </div>

            </div>

          </div>

          {/* RIGHT */}

          <div className="hero-right">

          </div>

        </div>

      </Container>
    </section>
  );
}

export default RestaurantHero;