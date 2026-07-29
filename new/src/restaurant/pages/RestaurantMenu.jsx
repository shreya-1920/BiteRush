import { useState, useEffect } from "react";
import {
  FaPlus,
  
  FaEdit,
  FaTrash,
  FaLeaf,
  FaDrumstickBite,
} from "react-icons/fa";
import DeleteDishModal from "../components/DeleteDishModal";
import {
  getMenu,
  addDish,
  updateDish,
  deleteDish,
  toggleDishStatus,
} from "../services/RestaurantMenuServices";
import { toast } from "react-toastify";
import "../styles/Restaurant-panel.css";
import AddDishModal from "../components/AddDishModal";
import { useSearch } from "../context/SearchContext";
function RestaurantMenu() {
  const [category, setCategory] = useState("All");
const [showModal, setShowModal] = useState(false);
const { search } = useSearch();

const [editingDish, setEditingDish] = useState(null);
const [showDeleteModal, setShowDeleteModal] = useState(false);
const [dishToDelete, setDishToDelete] = useState(null);
  const [dishes, setDishes] = useState([]);
const [loading, setLoading] = useState(true);
const filteredDishes = dishes.filter((dish) => {

    const query = search.toLowerCase();

    const matchCategory =
        category === "All" ||
        dish.category === category;

    const matchSearch =
        dish.name.toLowerCase().includes(query) ||
        dish.category.toLowerCase().includes(query) ||
        String(dish.price).includes(query);

    return matchCategory && matchSearch;

});
useEffect(() => {
    fetchMenu();
}, []);

const fetchMenu = async () => {
  try {
    setLoading(true);

    const data = await getMenu();

console.log(data.menu);
    setDishes(data.menu);
  } catch (error) {
    console.log(error);
    toast.error("Unable to load menu");
  } finally {
    setLoading(false);
  }
};
if (loading) {
  return <h2>Loading Menu...</h2>;
}

  return (
    <div className="rm-page">

      {/* Header */}

      <div className="rm-header">

        <div>

          <h1>Menu Management</h1>

          <p>Manage your dishes and pricing.</p>

        </div>

       <button
    className="rm-add-btn"
    onClick={() => setShowModal(true)}
>
    <FaPlus />
    Add New Dish
</button>

      </div>

      {/* Toolbar */}

      

      {/* Cards */}

      <div className="rm-grid">

        {filteredDishes.map((dish) => (

          <div
            key={dish._id}
            className="rm-card"
          >

<img
  src={dish.image || "https://placehold.co/400x300"}
  alt={dish.name}
/>

            <div className="rm-card-body">

              <div className="rm-top">

                <h3>{dish.name}</h3>

                {dish.isVeg ? (
                  <FaLeaf className="veg" />
                ) : (
                  <FaDrumstickBite className="nonveg" />
                )}

              </div>

              <span className="rm-category">
                {dish.category}
              </span>

              <div className="rm-price">

                ₹{dish.price}

                <span>⭐ 4.8</span>

              </div>

             <div className="rm-status">

    <span
        className={
            dish.status === "Available"
                ? "available"
                : "unavailable"
        }
   onClick={async () => {
  try {
    await toggleDishStatus(dish._id);

    toast.success("Dish status updated!");

    fetchMenu();
  } catch (err) {
    toast.error(
      err.response?.data?.message ||
        "Unable to update status"
    );
  }
}}
        
        style={{ cursor: "pointer" }}
    >
                  {dish.status === "Available"
                    ? "Available"
                    : "Unavailable"}
                </span>

              </div>

             <div className="rm-actions">

    <button className="edit-btn"   onClick={() => {
        setEditingDish(dish);
        setShowModal(true);
    }}>
        <FaEdit />
    </button>
<button
    className="delete-btn"
    onClick={() => {
        setDishToDelete(dish);
        setShowDeleteModal(true);
    }}
>
    <FaTrash />
</button>

</div>

            </div>

          </div>

        ))}
<AddDishModal
    open={showModal}
    dishData={editingDish}
    onClose={() => {
        setShowModal(false);
        setEditingDish(null);
    }}
 onSave={async (newDish) => {
  try {
    const formData = new FormData();

    formData.append("name", newDish.name);
    formData.append("description", newDish.description);
    formData.append("category", newDish.category);
    formData.append("price", Number(newDish.price));
    formData.append("isVeg", newDish.veg);
    formData.append(
      "status",
      newDish.available ? "Available" : "Unavailable"
    );

    if (newDish.image instanceof File) {
      formData.append("image", newDish.image);
    }

    if (editingDish) {
      await updateDish(editingDish._id, formData);
      toast.success("Dish updated successfully!");
    } else {
      await addDish(formData);
      toast.success("Dish added successfully!");
    }

    await fetchMenu();

    setShowModal(false);
    setEditingDish(null);
  } catch (err) {
    toast.error(
      err.response?.data?.message ||
      "Something went wrong"
    );
  }
}}
/>
       

    
<DeleteDishModal
    open={showDeleteModal}
    dish={dishToDelete}
    onClose={() => {
        setShowDeleteModal(false);
        setDishToDelete(null);
    }}
onDelete={async () => {
  try {
    await deleteDish(dishToDelete._id);

    toast.success("Dish deleted successfully!");

    await fetchMenu();

    setShowDeleteModal(false);
    setDishToDelete(null);
  } catch (err) {
    toast.error(
      err.response?.data?.message ||
      "Unable to delete dish"
    );
  }
}}
/>
      </div>

    </div>
  );
}

export default RestaurantMenu;