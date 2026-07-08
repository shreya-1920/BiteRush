import { Container, Breadcrumb, Form, Button } from "react-bootstrap";
import {
  FaSearch,
  FaMapMarkerAlt,
  FaClock,
  FaStar,
  FaTag,
} from "react-icons/fa";



function RestaurantHero({
    searchTerm,
    setSearchTerm
}) {
  return (
    <section className="restaurant-hero">
      <Container>

        <div className="hero-content">

          {/* LEFT */}

          <div className="hero-left">

            <Breadcrumb className="hero-breadcrumb">
              <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
              <Breadcrumb.Item active>Restaurants</Breadcrumb.Item>
            </Breadcrumb>

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
                  <p>Jaipur,RJ</p>
                
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

             <Button className="search-btn" type="button">
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