
import { useEffect, useRef, useState } from "react";
import {
  getProfile,
  updateProfile,
} from "../services/RestaurantProfileServices";
import {
  FaCamera,
  FaStar,
  FaMapMarkerAlt,
  FaInstagram,
  FaFacebookF,
  FaGlobe
  
} from "react-icons/fa";

import { toast } from "react-toastify";
import "../styles/Restaurant-panel.css";

function RestaurantProfile() {

const [coverPreview, setCoverPreview] = useState("");
const coverInputRef = useRef(null);
const [logoPreview, setLogoPreview] = useState("");
const logoInputRef = useRef(null);
const [gallery,setGallery]=useState([]);
const galleryRef=useRef(null);
const [logoFile, setLogoFile] = useState(null);
const [bannerFile, setBannerFile] = useState(null);
const [galleryFiles, setGalleryFiles] = useState([]);
const handleSave = async () => {
  try {
    if (
      !restaurant.name ||
      !restaurant.ownerName ||
      !restaurant.email
    ) {
      toast.warning("Please fill all required fields.");
      return;
    }

    const formData = new FormData();

Object.keys(restaurant).forEach((key) => {
    if (["logo", "banner", "gallery"].includes(key)) return;

    formData.append(key, restaurant[key] ?? "");
});

if (logoFile) {
    formData.append("logo", logoFile);
}

if (bannerFile) {
    formData.append("banner", bannerFile);
}

galleryFiles.forEach((file) => {
    formData.append("gallery", file);
});

await updateProfile(formData);

    toast.success("Profile Updated Successfully!");

    fetchProfile();
  } catch (err) {
    toast.error(
      err.response?.data?.message || "Unable to update profile"
    );
  }
};
 const [restaurant, setRestaurant] = useState({
  name: "",
  ownerName: "",
  email: "",
  phone: "",
  address: "",
  website: "",
  instagram: "",
  facebook: "",
  opening: "",
  closing: "",
  description: "",
});

  const handleChange = (e)=>{

    setRestaurant({

      ...restaurant,
      [e.target.name]:e.target.value

    });

  };
const fetchProfile = async () => {
  try {
    const data = await getProfile();
  
    console.log(JSON.stringify(data.restaurant, null, 2));
    setRestaurant(data.restaurant);

    setGallery(data.restaurant.gallery || []);

    setLogoPreview(data.restaurant.logo || "");

    setCoverPreview(data.restaurant.banner || "");

  } catch (err) {
    toast.error("Unable to load profile");
  }
};
useEffect(() => {
  fetchProfile();
}, []);
console.log("Restaurant State:", restaurant);

  return (

<div className="profile-page">

{/* COVER */}

<div
    className="profile-cover"
    style={{
        backgroundImage: coverPreview
            ? `url(${coverPreview})`
            : "",
        backgroundSize: "cover",
        backgroundPosition: "center",
    }}
>

    <input
        type="file"
        accept="image/*"
        hidden
        ref={coverInputRef}
        onChange={(e) => {

            const file = e.target.files[0];

            if (!file) return;

           setBannerFile(file);
setCoverPreview(URL.createObjectURL(file));

            toast.success("Cover image updated!");

        }}
    />

    <button
        onClick={() => coverInputRef.current.click()}
    >
        <FaCamera />
        Change Cover
    </button>

</div>

{/* PROFILE */}

<div className="profile-card">

<div
    className="profile-logo"
    onClick={() => logoInputRef.current.click()}
>

    <input
        type="file"
        hidden
        accept="image/*"
        ref={logoInputRef}
        onChange={(e)=>{

            const file = e.target.files[0];

            if(!file) return;

           setLogoFile(file);
setLogoPreview(URL.createObjectURL(file));

            toast.success("Logo updated!");

        }}
    />

    {

        <img
    src={logoPreview || restaurant.logo}
    alt={restaurant.name}
/>

        

        

    }

</div>

<h2>{restaurant.name}</h2>

<div className="rating">

<FaStar/>

{restaurant.rating} ({restaurant.reviews} Reviews)

</div>

<span className="verified">

✔ Verified Partner

</span>

<div className="status-container">

    <div>

        <label>Restaurant Status</label>

       <p className={restaurant.isOpen ? "status-open" : "status-closed"}>
           {restaurant.isOpen ? "🟢 OPEN" : "🔴 CLOSED"}
        </p>

    </div>

    <label className="toggle-switch">

        <input
            type="checkbox"
            checked={restaurant.isOpen}
onChange={() => {
    const next = !restaurant.isOpen;

    setRestaurant(prev => ({
        ...prev,
        isOpen: next
    }));

    toast.info(
        next
            ? "Restaurant is now Open 🟢"
            : "Restaurant is now Closed 🔴"
    );
}}
        />

        <span className="toggle-slider"></span>

    </label>

</div>

<div className="cuisines">

{restaurant.cuisine
    ?.split("•")
    .map((item, index) => (
        <span key={index}>
            {item.trim()}
        </span>
))}

</div>

</div>


{/* FORM */}

<div className="profile-form">

<h3>Restaurant Information</h3>

<div className="profile-grid">

<div>

<label>Restaurant Name</label>

<input
name="name"
value={restaurant.name}
onChange={handleChange}
/>

</div>

<div>

<label>Owner Name</label>

<input
name="ownerName"
value={restaurant.ownerName}
onChange={handleChange}
/>

</div>

<div>

<label>Opening Time</label>

<input
type="text"
name="opening"
value={restaurant.opening}
onChange={handleChange}
/>

</div>

<div>

<label>Closing Time</label>

<input
type="text"
name="closing"
value={restaurant.closing}
onChange={handleChange}
/>

</div>

</div>

<h3>Contact Information</h3>

<div className="profile-grid">

<div>

<label>Email</label>

<input
name="email"
value={restaurant.email}
onChange={handleChange}
/>

</div>

<div>

<label>Phone</label>

<input
name="phone"
value={restaurant.phone}
onChange={handleChange}
/>

</div>

<div className="full">

<label>Address</label>

<div className="address-box">

<input
name="address"
value={restaurant.address}
onChange={handleChange}
/>

<button
    onClick={()=>

        window.open(

            `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(restaurant.address)}`

        )

    }
>

<FaMapMarkerAlt/>

View Map

</button>
</div>

</div>

</div>

<h3>Gallery</h3>

<div className="gallery">

<div
    className="upload-box"
    onClick={()=>galleryRef.current.click()}
>

<FaCamera/>

<p>Upload Photo</p>

<input
type="file"
hidden
multiple
accept="image/*"
ref={galleryRef}
onChange={(e)=>{

const files=Array.from(e.target.files);
setGalleryFiles(files);
setGallery(prev=>[

...prev,

...files.map(file=>URL.createObjectURL(file))

]);

toast.success(`${files.length} image(s) uploaded`);

}}
/>

</div>

{
gallery.map((img,index)=>(

<div
className="gallery-img"
key={index}
>

<img
src={img}
alt=""
/>

</div>

))
}




</div>

<h3>Social Links</h3>

<div className="profile-grid">

<div>

<label>Instagram</label>

<div className="icon-input">

<FaInstagram/>

<input
name="instagram"
value={restaurant.instagram}
onChange={handleChange}
/>

</div>

</div>

<div>

<label>Facebook</label>

<div className="icon-input">

<FaFacebookF/>

<input
name="facebook"
value={restaurant.facebook}
onChange={handleChange}
/>

</div>

</div>

<div className="full">

<label>Website</label>

<div className="icon-input">

<FaGlobe/>

<input
name="website"
value={restaurant.website}
onChange={handleChange}
/>

</div>

</div>

</div>

<button
    className="save-btn"
    onClick={handleSave}
>

Save Changes

</button>

</div>

</div>

  );

}

export default RestaurantProfile;