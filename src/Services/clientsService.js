// src/Services/clientsService.js

const urlClient = "http://localhost:5015/Client";

// Obtener todos los clientes
export const fetchClients = async () => {
  const response = await fetch(urlClient);
  if (!response.ok) {
    throw new Error("Error al obtener los clientes");
  }
  return response.json();
};

// Obtener un cliente por ID
export const fetchClientById = async (id) => {
  const response = await fetch(`${urlClient}/${id}`);
  if (!response.ok) {
    throw new Error("Error al obtener el cliente");
  }
  return response.json();
};

// Crear un nuevo cliente
export const postClient = async (clientDto) => {
  const response = await fetch(urlClient, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(clientDto),
  });

  if (!response.ok) {
    throw new Error("Error al crear el cliente");
  }
  return response.json(); // Devuelve el cliente creado
};

// Actualizar un cliente
export const putClient = async (id, clientDto) => {
  const response = await fetch(`${urlClient}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(clientDto),
  });

  if (!response.ok) {
    throw new Error("Error al actualizar el cliente");
  }

  // Manejar respuestas sin cuerpo
  try {
    return await response.json();
  } catch {
    return null; // Si no hay respuesta JSON, devuelve null
  }
};

// Eliminar un cliente
export const deleteClient = async (id) => {
  const response = await fetch(`${urlClient}/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Error al eliminar el cliente");
  }
};
