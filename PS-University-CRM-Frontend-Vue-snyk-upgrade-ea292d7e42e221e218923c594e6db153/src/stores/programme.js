import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";

export const useProgrammeStore = defineStore({
  id: "programme",
  state: () => ({
    programmes: [],
    programDetails: useLocalStorage("programDetails", []),
    admissionDetails: useLocalStorage("admissionDetails", []),
    tuitionFees: useLocalStorage("tuitionFees", []),
    academicRequirements: useLocalStorage("academicRequirements", []),
    applicationFees: useLocalStorage("applicationFees", []),
    awardCount: useLocalStorage("awardCount", {}),
  }),
  getters: {
    getProgrammes: (state) => {
      return state.programmes;
    },
  },
  persist: true,
  actions: {
    setProgramme(programme) {
      this.programmes = programme;
    },
    setAwardCount(data) {
      this.awardCount = data;
    },
    setProgrammeDetails(details) {
      this.programDetails = details;
      console.log(this.programDetails);
    },
    removeProgramme(id) {
      this.programmes = this.programmes.filter((obj) => obj.id !== id);
    },
  },
});
