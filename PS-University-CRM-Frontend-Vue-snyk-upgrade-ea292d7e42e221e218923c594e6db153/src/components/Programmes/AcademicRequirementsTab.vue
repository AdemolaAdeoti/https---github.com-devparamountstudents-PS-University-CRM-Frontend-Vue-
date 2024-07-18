<template>
  <div style="width: 90%; margin: auto; margin-top: 24px">
    <label class="fw-bold mb-1">Education Requirements</label>
    <textarea
      v-model="requirementsText"
      @change="$emit('update:academicRequirements', $event.target.value)"
      placeholder="More info about semester addmission"
      style="resize: none; width: 100%; padding: 0.5rem"
      type="text"
      rows="10"
    />
  </div>
</template>

<script>
export default {
  name: "AcademicRequirementsTab",
  emits: ["update:academicRequirements"],
  data() {
    return {
      requirementsText: "",
    };
  },
};
</script>

<style></style>
