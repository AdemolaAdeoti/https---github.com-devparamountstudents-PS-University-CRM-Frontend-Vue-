<template>
  <div class="AcademicRequirementTab">
    <h5>Education Requirements</h5>
    <div class="requirementsBlock px-3 py-4 mt-2">
      <p style="white-space: pre-line" v-html="program.academic_description"></p>
    </div>
  </div>
</template>

<script>
export default {
  name: "AcademicRequirementTab",
  props: ["program"],
};
</script>

<style scoped>
.requirementsBlock {
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);
}
</style>
