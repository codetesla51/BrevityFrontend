export function checkAuthentication(
    redirectTo = "/auth",
    dashboardRedirect = "/dashboard"
) {
    return new Promise(resolve => {
        const authToken = localStorage.getItem("auth_token") || "";

        setTimeout(() => {
            if (authToken) {
                if (window.location.pathname === redirectTo) {
                    window.location.href = dashboardRedirect;
                }
                resolve(true);
            } else {
                if (window.location.pathname !== redirectTo) {
                    window.location.href = redirectTo;
                }
                resolve(false);
            }
        }, 500); 
    });
}
