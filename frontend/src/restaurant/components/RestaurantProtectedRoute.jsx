import { Navigate } from "react-router-dom";

const RestaurantProtectedRoute = ({ children }) => {

  const token = localStorage.getItem(
    "restaurantToken"
  );

  if (!token) {
    return <Navigate to="/restaurant/login" />;
  }

  return children;
};

export default RestaurantProtectedRoute;