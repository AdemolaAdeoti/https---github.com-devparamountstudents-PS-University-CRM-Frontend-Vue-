<template>
  <div class="ApplicationFeesTab">
    <div
      v-for="applicationFee in program.application_fees"
      :key="applicationFee.id"
      class="applicationFeesBlock px-2 py-4"
    >
      <ul class="">
        <li class="row d-flex">
          <span class="col-4">
            <strong>Students:</strong>
          </span>
          <span class="col">{{ applicationFee.student_type }}</span>
        </li>
        <li class="row d-flex">
          <span class="col-4">
            <strong>Amount:</strong>
          </span>
          <span class="col">{{ applicationFee.amount }}</span>
        </li>
      </ul>
      <h5 class="my-3">Description</h5>
      <p>{{ applicationFee.description }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "ApplicationFeesTab",
  props: ["program"],
};
</script>

<style scoped>
.ApplicationFeesTab {
  overflow: scroll;
  color: #4d5056;
}
.applicationFeesBlock {
  background: #ffffff;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
}
.applicationFeesBlock:not(:first-of-type) {
  margin-top: 2rem !important;
}
</style>
