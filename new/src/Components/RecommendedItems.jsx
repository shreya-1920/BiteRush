import { useEffect, useState } from "react";
import MealRecommendationCard from "./MealRecommendationCard";
import { getRecommendations } from "../services/recommendationServices";

function RecommendedItems() {

    const [meals, setMeals] = useState([]);
    const [reason, setReason] = useState("");

    useEffect(() => {

        fetchRecommendations();

    }, []);

    const fetchRecommendations = async () => {

        try {

            const data = await getRecommendations();

            setMeals(data.recommendations);

            setReason(data.reason);

        }

        catch (err) {

            console.log(err);

        }

    };

    if (meals.length === 0) return null;

    return (

        <div className="recommended-section">

          <h2 className="section-title">
    🍽 AI Recommended Meals
</h2>

<p className="recommend-subtitle">
    {reason}
</p>

            <div className="recommend-grid">

                {meals.map((meal) => (

                    <MealRecommendationCard
                        key={meal._id}
                        meal={meal}
                        reason={reason}
                    />

                ))}

            </div>

        </div>

    );

}

export default RecommendedItems;