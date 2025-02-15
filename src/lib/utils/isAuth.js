export async function checkAuthentication(
    redirectTo = "/auth",
    dashboardRedirect = "/dashboard"
) {
    return new Promise(async (resolve) => {
        let authToken = localStorage.getItem("auth_token") || "";

        if (authToken.includes("|")) {
            authToken = authToken.split("|")[1];
        }

        try {
            const response = await fetch("https://brevity-backend-kappa.vercel.app/user", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${authToken}`
                }
            });

            if (!response.ok) {
                throw new Error(`Unauthenticated: ${response.status}`);
            }

            // If authenticated and on the login page, redirect to dashboard
            if (window.location.pathname === redirectTo) {
                window.location.href = dashboardRedirect;
            }

            resolve(true);
        } catch (error) {
            console.error("Authentication failed:", error);

            // If not authenticated and not already on the auth page, redirect
            if (window.location.pathname !== redirectTo) {
                window.location.href = redirectTo;
            }

            resolve(false);
        }
    });
}