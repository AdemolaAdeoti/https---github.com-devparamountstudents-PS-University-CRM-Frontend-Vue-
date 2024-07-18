<template>
  <div class="AdmissionDeadlineTab">
    <div
      v-for="admission in program.admission_deadlines"
      :key="admission.id"
      class="admissionDeadlinesBlock px-2 py-4"
    >
      <ul class="">
        <li class="row d-flex">
          <span class="col-4">
            <strong>Semester Name:</strong>
          </span>
          <span class="col">{{ admission.semester_name }}</span>
        </li>
        <li class="row d-flex">
          <span class="col-4">
            <strong>Start Date:</strong>
          </span>
          <span class="col">{{ admission.start_date }}</span>
        </li>
        <li class="row d-flex">
          <span class="col-4">
            <strong>End Date:</strong>
          </span>
          <span class="col">{{ admission.end_date }}</span>
        </li>
      </ul>
      <h5 class="my-3">Description</h5>
      <p>{{ admission.description }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "AdmissionDeadlineTab",
  props: ["program"],
};
</script>

<style scoped>
.AdmissionDeadlineTab {
  overflow: scroll;
  color: #4d5056;
}
.admissionDeadlinesBlock {
  background: #ffffff;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
}
.admissionDeadlinesBlock:not(:first-of-type) {
  margin-top: 2rem !important;
}
</style>
