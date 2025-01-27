const urlApi = "http://localhost:5015";

export const loginApi = async (email, password) => {
  try {
    const response = await fetch(`${urlApi}/login`, {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({ email, password }), //Password1!
    });

    const parsedResponse = await response.json();

    if (!response.ok) {
      throw new Error(parsedResponse.message);
    }
    return parsedResponse;
  } catch (error) {
    throw error;
  }
};
