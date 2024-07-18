import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";

export const usePromotionsStore = defineStore({
  id: "Promotions",
  state: () => ({
    promotions: useLocalStorage("promotions", []),
    statusCount: useLocalStorage("statusCount", []),
  }),
  getters: {
    getPromotions: (state) => {
      return state.promotions;
    },
  },
  persist: true,
  actions: {
    setPromotions(data) {
      this.promotions = data;
    },
    setStatusCount(data) {
      this.statusCount = data;
    },
    removeHighSchool(id) {
      this.promotions = this.promotions.filter((obj) => obj.id !== id);
    },
  },
});
