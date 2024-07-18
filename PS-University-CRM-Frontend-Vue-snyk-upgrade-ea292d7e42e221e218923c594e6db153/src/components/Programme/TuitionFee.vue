<template>
  <div
    style="width: 730px; margin: auto; margin-top: 0px"
    class="d-flex flex-column"
  >
    <div
      v-for="(block, index) in blocks"
      :key="index"
      class="inputGroupContainer d-flex flex-column align-items-start p-4"
    >
      <!-- High School Name -->
      <div class="row col-12">
        <div class="col-6">
          <label style="font-weight: 600 !important" class="mb-1"
            >Students<span style="color: red">*</span></label
          >
          <DropDown
            v-model="blocks[index].student_type"
            :options="highSchoolTypes"
            placeholder=""
            class="w-100"
          />
          <p
            v-if="
              showValidationObject.show &&
              showValidationObject.id == 'student_type'
            "
            class="text-danger text-center"
            >Field is required</p
          >
        </div>
        <div class="col-6">
          <label style="font-weight: 600 !important" class="mb-1"
            >Payment Type<span style="color: red">*</span></label
          >
          <DropDown
            v-model="blocks[index].payment_type"
            :options="paymentTypes"
            placeholder=""
            class="w-100"
          />
          <p
            v-if="
              showValidationObject.show &&
              showValidationObject.id == 'payment_type'
            "
            class="text-danger text-center"
            >Field is required</p
          >
        </div>
      </div>
      <div class="row col-12 mt-5">
        <div class="col-4">
          <!-- Amount -->
          <label style="font-weight: 600 !important" class="mb-1"
            >Enter Amount<span style="color: red">*</span></label
          >
          <div
            style="border-radius: 8px; overflow: hidden; width: 80%"
            class="position-relative"
          >
            <input
              style="
                width: 100%;
                height: 45px;
                border: 0.5px solid #333;
                padding-left: 1.5rem;
              "
              id="amount"
              type="number"
              @keyup="calcAmount(index, blocks[index].amount)"
              v-model="blocks[index].amount"
            />
            <span
              style="
                background-color: #a8a2a2;
                position: absolute;
                height: 100%;
                left: 0;
                display: flex;
                align-items: center;
                font-size: 1.25rem;
                top: 0;
                bottom: 0;
                padding: 5px;
                color: black;
              "
              >$</span
            >
          </div>
          <p
            v-if="
              showValidationObject.show && showValidationObject.id == 'amount'
            "
            class="text-danger text-center"
            >Field is required</p
          >
        </div>
        <div class="col-4">
          <!-- scholarships -->
          <label style="font-weight: 600 !important" class="mb-1"
            >Scholarships<span style="color: red">*</span></label
          >
          <div
            style="border-radius: 8px; overflow: hidden; width: 80%"
            class="position-relative"
          >
            <input
              style="
                outline: none;
                border: 0.5px solid #333;
                padding-left: 1.7rem;
                width: 100%;
                height: 45px;
              "
              id="discount"
              type="number"
              @keyup="calcAmount(index, blocks[index].amount)"
              v-model="blocks[index].scholarship_percent"
            />

            <span
              style="
                background-color: #a8a2a2;
                position: absolute;
                height: 100%;
                left: 0;
                display: flex;
                align-items: center;
                font-size: 1.25rem;
                top: 0;
                bottom: 0;
                padding: 5px;
                color: black;
              "
              >%</span
            >
          </div>
          <p
            v-if="
              showValidationObject.show &&
              showValidationObject.id == 'scholarship_percent'
            "
            class="text-danger text-center"
            >Field is required</p
          >
        </div>
        <div class="col-4">
          <!-- After Scholarship Discount -->
          <label style="font-weight: 600 !important" class="mb-1"
            >After Scholarships<span style="color: red">*</span></label
          >
          <div
            style="border-radius: 8px; overflow: hidden; width: 80%"
            class="position-relative"
          >
            <input
              style="
                outline: none;
                border: 0.5px solid #333;
                width: 100%;
                height: 45px;
              "
              type="number"
              @keyup="reversecalcAmount(index)"
              v-model="blocks[index].after_scholarship"
            />
          </div>
          <p
            v-if="
              showValidationObject.show &&
              showValidationObject.id == 'after_scholarship'
            "
            class="text-danger text-center"
            >Field is required</p
          >
        </div>
      </div>
      <label style="font-weight: 600 !important" class="mb-1 mt-4"
        >Description<span style="color: red">*</span></label
      >
      <textarea
        v-model="blocks[index].comment"
        style="resize: none; outline: none; border: none"
        col="15"
        rows="4"
        class="inputTypeTextArea"
        type="text"
        placeholder="Terms & Conditions: after paying the tuition fee, submit a one time application and upload the recipe or any proof so that we evalute the data"
      />
      <button class="btn mt-2" @click="deleteBlock(index)">Delete</button>
    </div>

    <button class="btn mt-3 mx-auto" v-if="showNewBlockBtn" @click="newBlock"
      >Insert new block</button
    >
  </div>
</template>

<script>
// import { countries } from "@/data";

import {showModal} from "@/plugins/modal";
export default {
  name: "TuitionFee",
  props: ["tuition_fees"],
  components: ["CalendarComponent"],
  data() {
    return {
      amount: "",
      scholarshipDiscount: "",
      number: "0000",
      selectedHighSchoolType: "",
      selectedPaymentType: "",
      highSchoolTypes: ["International School", "Local School"],
      paymentTypes: ["Yearly", "Quarterly", "6 Month", "Full Tuition Fees"],
      countries: {},
      selectedCountry: "",
      programId: "23e45ghET",
      blocks: [
        {
          student_type: "",
          payment_type: "",
          amount: 0,
          scholarship_percent: 0,
          after_scholarship: 0,
        },
      ],
      showNewBlockBtn: true,
      showValidationObject: {
        show: false,
        id: "",
      },
    };
  },
  methods: {
    calcAmount(index, amount) {
      if (parseInt(this.blocks[index].scholarship_percent) < 100) {
        this.blocks[index].after_scholarship =
          ((100 - this.blocks[index].scholarship_percent) / 100) * amount;
      } else {
        showModal({text:"Scholarship % cannot be greater than 100"});
      }
    },

    reversecalcAmount(index) {
      if (this.blocks[index].amount === 0) {
        showModal({text:"Enter an amount"});
        this.blocks[index].after_scholarship = 0;
        return false;
      }
      this.blocks[index].scholarship_percent =
        100 -
        (this.blocks[index].after_scholarship / this.blocks[index].amount) *
          100;
    },
    newBlock() {
      if (this.blocks.length < 2) {
        this.blocks.push({
          student_type: "",
          payment_type: "",
          amount: 0,
          scholarship_percent: 0,
          after_scholarship: 0,
        });
      } else {
        this.showNewBlockBtn = false;
      }
    },
    deleteBlock(index) {
      this.showNewBlockBtn = true;
      this.blocks.splice(index, 1);
    },
    recieveValidation(validateID) {      
      this.showValidationObject.show = true;
      this.showValidationObject.id = validateID;
    },
  },
  created() {
    if (this.tuition_fees) {
      this.blocks = this.tuition_fees;
    }
  },

  computed: {},
  watch: {
    blocks: {
      deep: true, // Watch for nested changes within each block
      handler(newBlock) {
        this.showValidationObject.show = false;
        this.$emit("onUpdateTuitionFee", newBlock);
        this.$emit("on-change", newBlock);
        // Handle changes to the blocks array
      },
    },
  },
};
</script>

<style scoped>
.inputGroupContainer {
  margin-top: 32px;
  border: 0.5px solid #000000;
  border-radius: 6px;
}

.inputTypeText {
  width: 100%;
  padding: 10px 14px 10px 12px;
  border: 0.5px solid #000000;
  border-radius: 4px;
}
.inputTypeTextArea {
  font-size: 14px;
  width: 100%;
  padding: 10px 14px 10px 12px;
  border: 0.5px solid #000000;
  border-radius: 4px;
}
button:hover:not(.p-calendar button) {
  box-shadow: 0px 0px 5px 5px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.25s ease-in-out;
}
</style>
