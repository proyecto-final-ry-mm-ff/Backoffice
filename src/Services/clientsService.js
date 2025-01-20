// src/Services/clientsService.js

const BASE_URL = "http://localhost:5015/Client";

// Obtener todos los clientes
export const fetchClients = async () => {
  const response = await fetch(BASE_URL);
  if (!response.ok) {
    throw new Error("Error al obtener los clientes");
  }
  return response.json();
};

// Obtener un cliente por ID
export const fetchClientById = async (id) => {
  const response = await fetch(`${BASE_URL}/${id}`);
  if (!response.ok) {
    throw new Error("Error al obtener el cliente");
  }
  return response.json();
};

// Crear un nuevo cliente
export const postClient = async (clientDto) => {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(clientDto),
  });
  if (!response.ok) {
    throw new Error("Error al crear el cliente");
  }
  return response.json();
};

// Actualizar un cliente
export const putClient = async (id, clientDto) => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(clientDto),
  });
  if (!response.ok) {
    throw new Error("Error al actualizar el cliente");
  }
};

// Eliminar un cliente
export const deleteClient = async (id) => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Error al eliminar el cliente");
  }
};
