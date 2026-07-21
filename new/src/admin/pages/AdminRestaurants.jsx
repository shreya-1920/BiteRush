import {
  FaPlus,
  FaSearch,
  FaEdit,
  FaTrash,
  FaStar,
} from "react-icons/fa";
import {
  getRestaurants,
    deleteRestaurant,
} from "../Services/RestaurantService";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import ConfirmModal from "../components/ConfirmModal";
import Modal from "../components/Modal";
import RestaurantForm from "../components/forms/RestaurantForm";
function AdminRestaurants() {
  const [modalType, setModalType] = useState(null);
// "add" | "edit" | "delete"
const [loading, setLoading] = useState(true);
const [selectedRestaurant, setSelectedRestaurant] = useState(null);
 
const handleDelete = async () => {
  try {

    await deleteRestaurant(selectedRestaurant._id);

    toast.success("Restaurant deleted successfully!");

    fetchRestaurants();

    setModalType(null);

    setSelectedRestaurant(null);

  } catch (error) {

    console.log(error);

    toast.error("Failed to delete restaurant.");

  }
};
 const [restaurants, setRestaurants] = useState([]);
 const [search, setSearch] = useState("");
 const [statusFilter, setStatusFilter] = useState("All");
const [cityFilter, setCityFilter] = useState("All");
const fetchRestaurants = async () => {

  try{

    setLoading(true);

    const res = await getRestaurants();

    setRestaurants(res.data);

  }catch(error){

    toast.error("Failed to load restaurants");

  }finally{

    setLoading(false);

  }

}
useEffect(() => {
  fetchRestaurants();
}, []);
const filteredRestaurants = restaurants.filter((restaurant) => {

  const searchText = search.toLowerCase();

  const matchesSearch =
    restaurant.name.toLowerCase().includes(searchText) ||
    restaurant.city.toLowerCase().includes(searchText) ||
    restaurant.category.toLowerCase().includes(searchText);

  const matchesStatus =
    statusFilter === "All" ||
    restaurant.status === statusFilter;

  const matchesCity =
    cityFilter === "All" ||
    restaurant.city === cityFilter;

  return matchesSearch && matchesStatus && matchesCity;

});
const cities = [...new Set(restaurants.map((restaurant) => restaurant.city))];
const statuses = [
  ...new Set(restaurants.map((restaurant) => restaurant.status)),
];
  return (
    <div className="restaurants-page">

      {/* Header */}

      <div className="page-header">

        <div>
          <h2>Restaurants</h2>
          <p>Manage all restaurant partners</p>
        </div>

       <button
    className="admin-btn"
    onClick={() => {
        setSelectedRestaurant(null);
        setModalType("add");
    }}
>
    <FaPlus />
    <span>Add Restaurant</span>
</button>
      </div>

      {/* Filters */}

      <div className="table-toolbar">

        <div className="search-box">

          <FaSearch className="search-icon" />

          <input
    type="text"
    placeholder="Search restaurants..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
/>

        </div>

        <div className="toolbar-right">

<select
  value={statusFilter}
  onChange={(e) => setStatusFilter(e.target.value)}
>
  <option value="All">All Status</option>

  {statuses.map((status) => (
    <option key={status} value={status}>
      {status}
    </option>
  ))}
</select>
<select
  value={cityFilter}
  onChange={(e) => setCityFilter(e.target.value)}
>
  <option value="All">All Cities</option>

  {cities.map((city) => (
    <option key={city} value={city}>
      {city}
    </option>
  ))}
</select>

        </div>

      </div>

      {/* Table */}

      <div className="table-card">

  {loading ? (

    <div className="loading-state">
      Loading restaurants...
    </div>

  ) : (

   

        <table className="admin-table">

          <thead>

            <tr>

              <th>Restaurant</th>
              <th>City</th>
              <th>Rating</th>
              <th>Orders</th>
              <th>Status</th>
              <th>Actions</th>

            </tr>

          </thead>

        <tbody>

  {filteredRestaurants.length > 0 ? (

    filteredRestaurants.map((restaurant) => (

      <tr key={restaurant._id}>

        <td>
          <div className="restaurant-info">
         <div className="restaurant-avatar">

  {restaurant.logo ? (

    <img
      src={restaurant.logo}
      alt={restaurant.name}
    />

  ) : (

    "🍽️"

  )}

</div>

            <div>
              <h4>{restaurant.name}</h4>

<span>

{restaurant.category} • {restaurant.cuisine}

</span>
            </div>
          </div>
        </td>

        <td>{restaurant.city}</td>

        <td>
         <div className="rating">

    <FaStar />

    <span>{restaurant.rating || "N/A"}</span>

</div>
        </td>

        <td>{restaurant.orders || 0}</td>
        <td>
          <span
            className={
              restaurant.status === "Open"
    ? "status active"
    : "status inactive"
            }
          >
            {restaurant.status}
          </span>
        </td>

        <td>
          <div className="table-actions">

            <button
              className="icon-btn edit-btn"
              onClick={() => {
                setSelectedRestaurant(restaurant);
                setModalType("edit");
              }}
            >
              <FaEdit />
            </button>

            <button
              className="icon-btn delete-btn"
              onClick={() => {
                setSelectedRestaurant(restaurant);
                setModalType("delete");
              }}
            >
              <FaTrash />
            </button>

          </div>
        </td>

      </tr>

    ))

  ) : (

    <tr>
      <td colSpan="6" className="empty-table">
        🍔 No restaurants found.
      </td>
    </tr>

  )}

</tbody>
        </table>

  )}

</div>
      <Modal
        open={modalType === "add" || modalType === "edit"}
        title={
          modalType === "add"
            ? "Add Restaurant"
            : "Edit Restaurant"
        }
        onClose={() => setModalType(null)}
      >
        <RestaurantForm
    mode={modalType}
    restaurant={selectedRestaurant}
    onClose={() => setModalType(null)}
    fetchRestaurants={fetchRestaurants}
/>
      </Modal>

      <ConfirmModal
        open={modalType === "delete"}
        title="Delete Restaurant"
        message={`Are you sure you want to delete "${selectedRestaurant?.name}"?`}
        onClose={() => setModalType(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
}

export default AdminRestaurants;