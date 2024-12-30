import { writable, derived } from "svelte/store";

// Initialize the user store
export const userInfo = writable({
    userName: "",
    authToken: "",
    used: 0,
    max: 10
});

// Derived store for available credits
export const credits = derived(userInfo, $userInfo => {
    return $userInfo.max - $userInfo.used;
});

// Function to fetch and update user info
export const fetchUserInfo = async () => {
    try {
        let authToken = localStorage.getItem("auth_token");
        if (authToken && authToken.includes("|")) {
            authToken = authToken.split("|")[1];
        }
        
        if (!authToken) {
            throw new Error("No auth token found. Please log in again.");
        }

        const response = await fetch("http://127.0.0.1:8000/api/user", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${authToken}`
            }
        });

        if (!response.ok) {
            throw new Error(`Error fetching user info: ${response.status}`);
        }

        const data = await response.json();
        
        // Update the store with new data
        userInfo.update(currentInfo => ({
            ...currentInfo,
            userName: data.name || "User",
            authToken,
            used: data.used_credits || 0,
            max: data.max_credits || 10
        }));

    } catch (error) {
        console.error("Failed to fetch user info:", error);
        // Optionally reset the store on error
        userInfo.set({
            userName: "",
            authToken: "",
            used: 0,
            max: 10
        });
    }
};