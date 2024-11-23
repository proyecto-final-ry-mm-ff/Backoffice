import { connectToHub } from './signalRService';

const urlApi = "http://localhost:5015";


export const loginApi = async () => {
    console.log("Paso 1 - Me identifico como Operador");
    const response = await fetch(`${urlApi}/login`, {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify({ email: "felipe@test.com", password: "Password1!" }),
    });

    const authorize = await response.json();
    console.log({ authorize });
    if (response.ok) {
        connectToHub();
        return authorize;
    }

    return false;
}




/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//const urlApiObligatorio = "https://babytracker.develotion.com";

//llega el objeto con usuario y contraseña


// export const loginApi = async (objetoLogin) => {
//     console.log('Objeto Login ->', objetoLogin);

//     var myHeaders = new Headers();
//     myHeaders.append("Content-Type", "application/json");

//     var raw = JSON.stringify(objetoLogin);

//     var requestOptions = {
//         method: 'POST',
//         headers: myHeaders,
//         body: raw
//     };
//     console.log('api requestOptions', requestOptions);

//     try {
//         const response = await fetch(`${urlApiObligatorio}/login.php`, requestOptions);
//         console.log('response de la lllamada a api de login', response)
//         //si no da ok el login
//         if (!response.ok) {
//             //guardamos en errorData un json de response para capturar el (errorData.mensaje) y dar el error
//             const errorData = await response.json();
//             console.log('errorData', errorData)
//             throw new Error(errorData.mensaje || 'Error desconocido');
//         }
//         // si el response.ok == true entonces retorna el result del login como json
//         const result = await response.json();
//         return result;
//     } catch (error) {
//         return { error: error.message };
//     }
// };


/*
export const RegistroApi = (newUser) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(newUser);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    return fetch(`${urlApiObligatorio}/usuarios.php`, requestOptions)
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => { throw new Error(err.message) });
            }
            return response.json();
        })
        .catch(error => {
            console.log('error', error);
            throw error;
        });
};


export const fetchDepartamentos = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders
    };

    return fetch(`${urlApiObligatorio}/departamentos.php`, requestOptions)
        .then(response => response.json())
        .then(result => result)
        .catch(error => console.log('error', error));
};

export const fetchCiudades = (idDepartamento) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders
    };

    return fetch(`${urlApiObligatorio}/ciudades.php?idDepartamento=${idDepartamento}`, requestOptions)
        .then(response => response.json())
        .then(result => result)
        .catch(error => console.log('error', error));
};


// Servicio para agregar un evento
export const addEventoApi = async (evento) => {
    const localStorage = window.localStorage;

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("apiKey", localStorage.getItem("apiKey"));
    myHeaders.append("iduser", localStorage.getItem("idUsuario"));

    var raw = JSON.stringify(evento);
    console.log(raw);
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    try {
        const response = await fetch(`${urlApiObligatorio}/eventos.php`, requestOptions);
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error al agregar evento');
        }

        return await response.json();

    } catch (error) {
        console.log('Error:', error);
        throw error;
    }
};

// Servicio para obtener categorías
export const fetchCategorias = async () => {


    const localStorage = window.localStorage;

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("apiKey", localStorage.getItem("apiKey"));
    myHeaders.append("iduser", localStorage.getItem("idUsuario"));

    const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    const response = await fetch(`${urlApiObligatorio}/categorias.php`, requestOptions);
    if (!response.ok) {
        throw new Error('Error al obtener categorías');
    }
    const respuesta = await response.json();
    return respuesta.categorias;
};

export const fetchEventos = async () => {

    const localStorage = window.localStorage;
    const idUsuario = localStorage.getItem("idUsuario");

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("apiKey", localStorage.getItem("apiKey"));
    myHeaders.append("iduser", idUsuario);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    const response = await fetch(`${urlApiObligatorio}/eventos.php?idUsuario=${idUsuario}`, requestOptions)
    if (!response.ok) {
        throw new Error('Error al obtener eventos');
    }

    const respuesta = await response.json();
    return respuesta.eventos;
}

export const borrarEventoApi = async (idEvento) => {


    const localStorage = window.localStorage;

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("apiKey", localStorage.getItem("apiKey"));
    myHeaders.append("iduser", localStorage.getItem("idUsuario"));

    const requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        redirect: 'follow'
    };

    try {
        const response = await fetch(`${urlApiObligatorio}/eventos.php?idEvento=${idEvento}`, requestOptions);
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error al borrar evento');
        }
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};*/