const API_URL = "http://localhost:5000/api/contact";

export const sendContactMessage = async (formData) => {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    });

    return await response.json();
};