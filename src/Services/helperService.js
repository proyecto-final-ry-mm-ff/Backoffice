
import { useSelector } from 'react-redux';


export const GetBearerToken = () => {
    const user = useSelector((state) => state.userStore);
    return user.token || null;
    // return localStorage.getItem("token") || null;
}