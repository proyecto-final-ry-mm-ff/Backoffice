

export const getBearerToken = () => {
    return localStorage.get("token") || null;
}