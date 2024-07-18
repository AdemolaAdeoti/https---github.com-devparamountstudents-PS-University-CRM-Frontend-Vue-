import { defineStore } from "pinia";

export const useStudentApplicationStore = defineStore({
  id: "studentApplications",
  state: () => ({
    studentApplications: [],
  }),
  getters: {
    getHighSchools: (state) => {
      return state.studentApplications;
    },
  },
  persist: true,
  actions: {
    setHighSchools(data) {
      this.studentApplications = data;
    },
    removeHighSchool(id) {
      this.studentApplications = this.studentApplications.filter(
        (obj) => obj.id !== id
      );
    },
    setStudentApplications(data){
      this.studentApplications = data;
    }
  },
});
