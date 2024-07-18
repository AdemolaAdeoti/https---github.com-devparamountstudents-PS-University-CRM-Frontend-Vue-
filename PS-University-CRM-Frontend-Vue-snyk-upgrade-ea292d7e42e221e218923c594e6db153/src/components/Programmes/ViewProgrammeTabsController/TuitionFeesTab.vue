<template>
  <div class="TuitionFeesTab">
    <div
      v-for="tuitionFee in programme"
      :key="tuitionFee.id"
      class="tuitionFeeBlock px-2 py-4"
    >
      <ul class="">
        <li class="row d-flex">
          <span class="col-4">
            <strong>Student:</strong>
          </span>
          <span class="col">{{ tuitionFee.student_type }}</span>
        </li>
        <li class="row d-flex">
          <span class="col-4">
            <strong>Payment Type:</strong>
          </span>
          <span class="col">{{ tuitionFee.payment_type }}</span>
        </li>
        <li class="row d-flex">
          <span class="col-4">
            <strong>Amount:</strong>
          </span>
          <span class="col">{{ tuitionFee.amount }}</span>
        </li>
        <li class="row d-flex">
          <span class="col-4">
            <strong>Scholarship:</strong>
          </span>
          <span class="col">{{ tuitionFee.scholarship_percent }} %</span>
        </li>
        <li class="row d-flex">
          <span class="col-4">
            <strong>Scholarship After:</strong>
          </span>
          <span class="col">{{ tuitionFee.after_scholarship }}</span>
        </li>
        <li class="row d-flex">
          <span class="col-4">
            <strong>Student Type:</strong>
          </span>
          <span class="col">{{ tuitionFee.student_type }}</span>
        </li>
      </ul>
      <h5 class="my-3">Description</h5>
      <p>{{ tuitionFee.description }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "TuitionFeesTab",
  props: ["programme"],
};
</script>

<style scoped>
.TuitionFeesTab {
  overflow: scroll;
  color: #4d5056;
}
.tuitionFeeBlock {
  background: #ffffff;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
}
.tuitionFeeBlock:not(:first-of-type) {
  margin-top: 2rem !important;
}
</style>
