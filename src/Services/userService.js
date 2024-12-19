import { store } from '../redux/store'
import { login } from '../redux/features/user/userSlice'
import { GetBearerToken } from './helperService';
import { connectToHub } from './signalRService';

const urlApi = "http://localhost:5015";


export const loginApi = async (userData) => {
    const response = await fetch(`${urlApi}/login`, {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify({ email: userData.email, password: userData.password }), //Password1!
    });

    const parsedResponse = await response.json();
    //console.log({ parsedResponse });
    if (response.ok) {
        store.dispatch(login(parsedResponse));
        localStorage.setItem('token', parsedResponse.accessToken);
        localStorage.setItem('refreshToken', parsedResponse.refreshToken);
        localStorage.setItem('logged', true);
        await connectToHub();
        return parsedResponse;
    }

    return false;
}
