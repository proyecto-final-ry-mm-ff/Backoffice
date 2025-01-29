const urlApi = "http://localhost:5015";

export const loginApi = async (email, password) => {
  const response = await fetch(`${urlApi}/login`, {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify({ email, password }), //Password1!
  });

  const parsedResponse = await response.json();

  // Verifica si la respuesta fue exitosa
  if (!response.ok) {
    // ERROR 401 - Credenciales no válidas
    if (response.status === 401) {
      throw new Error("Error al iniciar sesión, credenciales incorrectas");
    }

    // Otros errores
    throw new Error(
      parsedResponse.message || "Ocurrió un error al iniciar sesión."
    );
  }

  return parsedResponse; // Devuelve la respuesta exitosa
};
