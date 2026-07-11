import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../Context/CartContext";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import { LuShoppingCart } from "react-icons/lu";

import logo from "../assets/images/logo.png";
import { logoutUser } from "../services/AuthServices";
import { toast } from "react-toastify";

function Header() {

  const { cartItems } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await logoutUser();

      localStorage.removeItem("token");
      localStorage.removeItem("user");

      toast.success("Logged out successfully!");

      navigate("/");
      window.location.reload();
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed.");
    }
  };

  return (
    <Navbar
      expand="lg"
      fixed="top"
      className={`custom-navbar ${scrolled ? "scrolled" : ""}`}
    >
      <Container>
        <Navbar.Brand
    as={Link}
    to="/"
    className="logo"
>
          <img src={logo} alt="BiteRush Logo" className="logo-img" />

          <span className="brand-name">
            <span className="bite">Bite</span>
            <span className="rush">Rush</span>
          </span>
        </Navbar.Brand>

        <Nav className="menu">
          <Nav.Link as={Link} to="/">
            Home
          </Nav.Link>

          <Nav.Link as={Link} to="/restaurants">
            Restaurants
          </Nav.Link>

          <Nav.Link as={Link} to="/about">
            About
          </Nav.Link>

          <Nav.Link as={Link} to="/contact">
            Contact
          </Nav.Link>
        </Nav>

        <div className="d-flex align-items-center">
         <Link to="/cart" className="cart-link">

    <div className="cart-icon">

        <LuShoppingCart size={26} />

        {cartItems.length > 0 && (

            <span className="cart-count">

                {cartItems.length}

            </span>

        )}

    </div>

</Link>

          {localStorage.getItem("token") ? (
            <Button className="register-btn" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <>
              <Button
                className="login-btn"
                onClick={() => navigate("/auth", { state: { mode: "login" } })}
              >
                Sign In
              </Button>

              <Button
                className="register-btn"
                onClick={() =>
                  navigate("/auth", { state: { mode: "register" } })
                }
              >
                Register
              </Button>
            </>
          )}
        </div>
      </Container>
    </Navbar>
  );
}

export default Header;
