

const urlOperator = `${process.env.REACT_APP_API_URL}`;

//Registrar operador
export const postOperator = async (operatorDto) => {
    const response = await fetch(`${urlOperator}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(operatorDto),
    });

    if (!response.ok) {
        throw new Error("Error al crear el operador. Por favor intente nuevamente");
    }
    return true;
};
