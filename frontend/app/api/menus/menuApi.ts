import { apiClient } from "../axiosInstance";

export const menuApi = {
  async fetchMenus() {
    const response = await apiClient.get("/menu");
    return response.data;
  },

  async addMenu(menuData: { name: string; parentId?: string }) {
    const response = await apiClient.post("/menu", menuData);
    return response.data;
  },

  async deleteMenu(id: string) {
    await apiClient.delete(`/menu?id=${id}`);
    return id;
  },
};
