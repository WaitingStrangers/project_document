import api from "./api";

export const roleService = {
    getAllRoles() {
        return api.get("/roles");
    },
    getRoleById(id) {
        return api.get(`/roles/${id}`);
    },
    createRole(role) {
        return api.post("/roles", role);
    },
    updateRole(id, role) {
        return api.put(`/roles/${id}`, role);
    },
    deleteRole(id) {
        return api.delete(`/roles/${id}`);
    }
};
