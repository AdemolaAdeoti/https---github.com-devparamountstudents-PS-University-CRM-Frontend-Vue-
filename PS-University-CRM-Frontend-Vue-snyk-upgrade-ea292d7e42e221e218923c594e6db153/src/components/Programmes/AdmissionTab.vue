<template>
  <div style="width: 90%" class="m-auto">
    <AdmissionDeadlineTabBlock
      v-for="block in blocks"
      :key="block.id"
      :data="data"
      v-model:startDate="block.start_date"
      v-model:endDate="block.end_date"
      v-model:description="block.description"
      v-model:semesterName="block.semester_name"
    />
    <div class="mt-3 w-100 d-flex align-items-center justify-content-center">
      <button
        style="
          border: none;
          background: transparent;
          padding: 3px;
          border-radius: 12px;
        "
        @click="insertBlock"
        class="backgroundImage px-4"
      >
        <img
          :src="require(`/src/assets/images/add-outline.svg`)"
          style="height: 20px; width: 20px; margin-bottom: 2px"
        />
        Insert New Block Here
      </button>
    </div>
  </div>
</template>

<script>
import AdmissionDeadlineTabBlock from "./AdmissionDeadlineTabBlock.vue";
export default {
  name: "AdmissionTab",
  components: { AdmissionDeadlineTabBlock },
  props: ["data"],
  emits: ["update:admissions"],
  data() {
    return {
      blocks: [
        {
          id: 1,
          start_date: "",
          end_date: "",
          description: "",
          semester_name: "",
        },
      ],
    };
  },
  methods: {
    insertBlock() {
      this.blocks.push({
        id: this.blocks.length + 1,
        start_date: "",
        end_date: "",
        description: "",
        semester_name: "",
      });
    },
  },
  updated() {
    this.$emit("update:admissions", this.blocks);
  },
};
</script>

<style></style>
