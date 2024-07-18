<template>
  <div style="width: 90%" class="m-auto">
    <ApplicationFeesTabBlock
      :data="data"
      v-model:studentsType="block.student_type"
      v-model:amount="block.amount"
      v-model:description="block.description"
      v-for="block in blocks"
      :key="block.id"
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
import ApplicationFeesTabBlock from "./ApplicationFeesTabBlock.vue";
export default {
  name: "ApplicationFeesTab",
  props: ["data"],
  components: { ApplicationFeesTabBlock },
  data() {
    return {
      blocks: [
        {
          id: 1,
          student_type: "",
          amount: 0,
          description: "",
        },
      ],
    };
  },
  methods: {
    insertBlock() {
      this.blocks.push({
        id: this.blocks.length + 1,
        student_type: "",
        amount: 0,
        description: "",
      });
    },
  },
  updated() {
    this.$emit("update:applicationFees", this.blocks);
  },
};
</script>

<style></style>
