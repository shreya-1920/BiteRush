import { createContext, useContext, useEffect, useState } from "react";

const LocationContext = createContext();

export const LocationProvider = ({ children }) => {

   const [location, setLocation] = useState(
    localStorage.getItem("location") || ""
);

    useEffect(() => {

        if (localStorage.getItem("location")) return;

        if (!navigator.geolocation) {

            setLocation("Jaipur, Rajasthan");
            return;

        }

        navigator.geolocation.getCurrentPosition(

            async ({ coords }) => {

                try {

                    const response = await fetch(
                        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${coords.latitude}&lon=${coords.longitude}`
                    );

                    const data = await response.json();

                    const city =
                        data.address.city ||
                        data.address.town ||
                        data.address.village ||
                        "Unknown";

                    const state =
                        data.address.state || "";

                    const currentLocation = `${city}, ${state}`;

                    setLocation(currentLocation);

                    localStorage.setItem(
                        "location",
                        currentLocation
                    );

                }
                catch {

                    setLocation("Jaipur, Rajasthan");

                }

            },

            () => {

                setLocation("Jaipur, Rajasthan");

            }

        );

    }, []);

    return (

        <LocationContext.Provider
            value={{
                location,
                setLocation
            }}
        >
            {children}
        </LocationContext.Provider>

    );

};

export const useLocation = () => useContext(LocationContext);