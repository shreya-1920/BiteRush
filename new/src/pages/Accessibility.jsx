import Header from "../Components/Header";
import Footer from "../Components/Footer";
import "../styles/StaticPages.css";

function Accessibility() {
  return (
    <>
      <Header />

      <div className="static-page">

        <div className="static-container">

          <h1 className="static-title">
            Accessibility
          </h1>

          <p className="static-subtitle">
            BiteRush is committed to creating an inclusive experience for every user.
          </p>

          <div className="static-section">

            <h2>Our Commitment</h2>

            <p>
              We continuously improve our platform to ensure that it
              remains accessible to all users regardless of ability.
            </p>

          </div>

          <div className="static-section">

            <h2>Keyboard Navigation</h2>

            <p>
              BiteRush supports keyboard navigation to help users
              browse restaurants and place orders easily.
            </p>

          </div>

          <div className="static-section">

            <h2>Screen Reader Support</h2>

            <p>
              We aim to make our interface compatible with modern
              screen readers by using semantic HTML and meaningful labels.
            </p>

          </div>

          <div className="static-section">

            <h2>Color Contrast</h2>

            <p>
              Our design follows accessible color combinations to
              improve readability and usability.
            </p>

          </div>

          <div className="static-section">

            <h2>Need Assistance?</h2>

            <p>
              If you experience accessibility issues while using
              BiteRush, please contact our support team and we will
              be happy to assist you.
            </p>

          </div>

        </div>

      </div>

      <Footer />
    </>
  );
}

export default Accessibility;