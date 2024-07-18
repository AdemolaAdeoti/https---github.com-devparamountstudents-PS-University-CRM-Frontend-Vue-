<template>
  <div class="AdmissionDeadlineTabBlock row">
    <div class="inputGroupContainer col-6 d-flex flex-column align-items-start">
      <!--Semester Name -->
      <label style="font-weight: 600 !important" class="mb-1"
        >Semester Name <span class="text-danger">*</span></label
      >
      <DropDown
        v-model="selectedSemesterName"
        @change="$emit('update:semesterName', $event.value)"
        :options="semesterNameOptions"
        placeholder="Select Semester"
        class="w-100"
      />
    </div>
    <div class="inputGroupContainer col-3 d-flex flex-column align-items-start">
      <!-- Registered Date -->
      <label style="font-weight: 600 !important" class="mb-1">Start Date</label>

      <div
        style="border-radius: 8px; overflow: hidden"
        class="position-relative"
      >
        <CalendarComponent style="width: 100%" v-model="selectedStartDate" />
        <i
          style="
            background-color: rgb(253, 176, 34);
            position: absolute;
            height: 100%;
            right: 0;
            display: flex;
            align-items: center;
            font-size: 1.75rem;
            top: 0;
            bottom: 0;
            padding: 5px;
            color: black;
          "
          class="pi pi-calendar"
        ></i>
      </div>
    </div>
    <div class="inputGroupContainer col-3 d-flex flex-column align-items-start">
      <!-- Registered Date -->
      <label style="font-weight: 600 !important" class="mb-1">End Date</label>

      <div
        style="border-radius: 8px; overflow: hidden"
        class="position-relative"
      >
        <CalendarComponent
          dateFormat="dd/mm/yy"
          style="width: 100%"
          v-model="selectedEndDate"
        />
        <i
          style="
            background-color: rgb(253, 176, 34);
            position: absolute;
            height: 100%;
            right: 0;
            display: flex;
            align-items: center;
            font-size: 1.75rem;
            top: 0;
            bottom: 0;
            padding: 5px;
            color: black;
          "
          class="pi pi-calendar"
        ></i>
      </div>
    </div>
    <div
      style="margin-top: 10px !important"
      class="inputGroupContainer col-12 d-flex flex-column align-items-start"
    >
      <!--Description -->
      <label style="font-weight: 600 !important" class="mb-1"
        >Description <span class="text-danger">*</span></label
      >
      <textarea
        class="inputTypeText"
        type="text"
        cols="10"
        :value="description"
        @change="$emit('update:description', $event.target.value)"
        rows="3"
        placeholder="More info about semester addmission"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "AdmissionDeadlineTabBlock",
  props: ["semesterName", "startDate", "endDate", "description", "data"],
  emits: [
    "update:semesterName",
    "update:startDate",
    "update:endDate",
    "update:description",
  ],
  data() {
    return {
      semesterNameOptions: this.data.semesterNames,
      selectedSemesterName: this.semesterName,
      selectedStartDate: this.startDate,
      selectedEndDate: this.endDate,
    };
  },
  methods: {},
  updated() {
    this.$emit("update:endDate", this.selectedEndDate);
    this.$emit("update:startDate", this.selectedStartDate);
  },
};
</script>

<style scoped>
.AdmissionDeadlineTabBlock {
  margin-top: 24px;
  width: 100%;
  border: 2px solid rgba(250, 197, 21, 0.5);
  min-height: 240px;
  padding: 24px;
  border-radius: 12px;
}
.inputGroupContainer {
  margin-top: 0 !important;
}
.inputTypeText {
  width: 100%;
  padding: 10px 14px 10px 12px;
  border: 0.5px solid #000000;
  border-radius: 4px;
  resize: none;
}
</style>
