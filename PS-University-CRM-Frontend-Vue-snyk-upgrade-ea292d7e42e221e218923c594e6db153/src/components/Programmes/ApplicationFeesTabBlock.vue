<template>
  <div class="TuitionFeesTabBlock row">
    <div class="inputGroupContainer col-6 d-flex flex-column align-items-start">
      <!--Students -->
      <label style="font-weight: 600 !important" class="mb-1"
        >Students <span class="text-danger">*</span></label
      >
      <DropDown
        v-model="selectedStudentsType"
        @change="$emit('update:studentsType', $event.value)"
        :options="studentsTypeOptions"
        placeholder="Select Semester"
        class="w-100"
      />
    </div>

    <div class="inputGroupContainer col-3 d-flex flex-column align-items-start">
      <!--program name * -->
      <label style="font-weight: 600 !important" class="mb-1"
        >Enter Amount <span class="text-danger">*</span></label
      >
      <div class="d-flex align-items-center position-relative">
        <span
          style="width: 40px; background-color: rgba(0, 0, 0, 0.3)"
          class="position-absolute h-100 d-flex align-items-center justify-content-center"
        >
          <i class="pi pi-dollar text-white fw-bold"></i>
        </span>
        <input
          :value="amount"
          @change="$emit('update:amount', $event.target.value)"
          style="padding-left: 45px"
          class="inputTypeText"
          type="number"
        />
      </div>
    </div>

    <div
      style="margin-top: 24px !important"
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
  props: ["studentsType", "amount", "description", "data"],
  emits: ["update:studentsType", "update:amount", "update:description"],
  data() {
    return {
      studentsTypeOptions: this.data.students,
      selectedStudentsType: this.studentsType,
    };
  },
};
</script>

<style scoped>
.TuitionFeesTabBlock {
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
  border-radius: 0 !important;
  height: 40px;
  resize: none;
} /* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}
</style>
