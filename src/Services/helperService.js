

export const getBearerToken = () => {
    return localStorage.getItem("token") || null;
}