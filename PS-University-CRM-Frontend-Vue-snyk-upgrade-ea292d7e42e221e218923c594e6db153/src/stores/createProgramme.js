import { defineStore } from "pinia";

export const useCreateProgrammeStore = defineStore({
  id: "createProgramme",
  state: () => ({
    programDetails: {
      cleared:false,
    },
    admissionDetails: {
      cleared:false,
    },
    tuitionFees: {
      cleared:false,
    },
    academicRequirements: {
      cleared:false,
    },
    applicationFees: {
      cleared:false,
    },
  }),
  persist: true,
  actions: {
    setProgramDetails(details) {
      this.programDetails = details;
    },
    setAdmissionDetails(details) {
      this.admissionDetails = details;
    },
    setTuitionFees(details) {
      this.tuitionFees = details;
    },
    setApplicationFees(details) {
      this.applicationFees = details;
    },
    removeProgram(id) {
      this.programmes = this.programmes.filter((obj) => obj.id !== id);
    },
  },
});
