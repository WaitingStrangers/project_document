import api from "./api";

export const userService = {
    getAllUsers() {
        return api.get("/users");
    },
    getUserById(id) {
        return api.get(`/users/${id}`);
    },
    createUser(user) {
        return api.post("/users", user);
    },
    updateUser(id, user) {
        return api.put(`/users/${id}`, user);
    },
    deleteUser(id) {
        return api.delete(`/users/${id}`);
    },
    login(credentials) {
        return api.post("/users/login", credentials);
    }
};
