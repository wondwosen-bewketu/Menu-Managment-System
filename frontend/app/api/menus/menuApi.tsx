import { apiClient } from "../axiosInstance";

export const menuApi = {
  async fetchMenus() {
    const response = await apiClient.get("/menu");
    return response.data;
  },

  async fetchParents() {
    const response = await apiClient.get("/menu/parents");
    return response.data;
  },

  async addMenu(menuData: { name: string; parentId?: string }) {
    const response = await apiClient.post("/menu", menuData);
    return response.data;
  },

  // Changed to use URL parameter instead of query string
  async deleteMenu(id: string) {
    await apiClient.delete(`/menu/${id}`);
    return id;
  },

  // Changed to use URL parameter instead of query string
  async updateMenu(id: string, menuData: { name: string; parentId?: string }) {
    const response = await apiClient.put(`/menu/${id}`, menuData);
    return response.data;
  },
};
