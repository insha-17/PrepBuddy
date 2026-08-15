import api from "./api";

export const getCurrentUser = async () => {

    const response = await api.get("/users/me");

    return response.data;

};

export const updateUser = async (id, userData) => {

    const response = await api.put(`/users/${id}`, userData);

    return response.data;

};