import Header from "../Components/Header";
import Footer from "../Components/Footer";
import "../styles/StaticPages.css";

export default function PrivacyPolicy(){

return(

<>

<Header/>

<div className="static-page">

<div className="static-container">

<h1 className="static-title">

Privacy Policy

</h1>

<p className="static-subtitle">

Your privacy matters to BiteRush.

</p>

<div className="static-section">

<h2>Information We Collect</h2>

<p>

We collect basic account information such as your name,
email address, phone number and delivery address to
process orders and improve your experience.

</p>

</div>

<div className="static-section">

<h2>How We Use Your Data</h2>

<ul>

<li>Process food orders</li>

<li>Deliver your meals</li>

<li>Improve our services</li>

<li>Provide customer support</li>

</ul>

</div>

<div className="static-section">

<h2>Data Security</h2>

<p>

Your information is stored securely and is never sold
to third parties.

</p>

</div>

</div>

</div>

<Footer/>

</>

);

}