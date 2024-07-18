<template>
  <div style="width: 90%" class="m-auto">
    <TuitionFeesTabBlock
      :data="data"
      v-model:studentsType="block.student_type"
      v-model:paymentType="block.payment_type"
      v-model:description="block.description"
      v-model:amount="block.amount"
      v-model:scholarship="block.scholarship_percent"
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
import TuitionFeesTabBlock from "./TuitionFeesTabBlock.vue";
export default {
  name: "TuitionFeesTab",
  components: { TuitionFeesTabBlock },
  props: ["data"],
  data() {
    return {
      blocks: [
        {
          id: 1,
          student_type: "",
          payment_type: "",
          description: "",
          amount: 0,
          scholarship_percent: 0,
        },
      ],
    };
  },
  methods: {
    insertBlock() {
      this.blocks.push({
        id: this.blocks.length + 1,
        student_type: "",
        payment_type: "",
        description: "",
        amount: 0,
        scholarship_percent: 0,
      });
    },
  },
  updated() {
    this.$emit("update:tuitionFees", this.blocks);
  },
};
</script>

<style></style>
