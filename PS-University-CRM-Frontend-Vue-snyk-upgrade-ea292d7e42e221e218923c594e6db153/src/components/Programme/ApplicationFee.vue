<template>
  <div
    style="width: 730px; margin: auto; margin-top: 0px"
    class="d-flex flex-column"
  >
  <div v-for="(block, index) in blocks" :key="index"  class="inputGroupContainer d-flex flex-column align-items-start p-4">
      <!-- High School Name -->
      <div class="row col-12">
        <div class="col-6">
          <label style="font-weight: 600 !important" class="mb-1"
            >Student<span style="color: red">*</span></label
          >
          <DropDown
            v-model="blocks[index].student_type"
            :options="highSchoolTypes"
            placeholder=""
            class="w-100"
          />
          <p v-if="showValidationObject.show && showValidationObject.id=='student_type'" class="text-danger text-center">Field is required</p>
        </div>
        <!-- Amount -->
        <div class="col-6">
          <label style="font-weight: 600 !important" class="mb-1"
            >Enter Amount <span style="color: red">*</span></label
          >

          <div
            style="border-radius: 8px; overflow: hidden; width: 60%"
            class="position-relative"
          >
            <input
            type="number"
              style="padding-left: 1.5rem; width: 100%; height: 45px"
              @input="checkInput"
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
          <p v-if="showValidationObject.show && showValidationObject.id=='amount'" class="text-danger text-center">Field is required</p>
        </div>
      </div>

      <!-- Comments -->
      <label style="font-weight: 600 !important" class="mb-1"
        >Description<span style="color: red">*</span></label
      >
      <textarea
        style="resize: none"
        col="15"
        rows="4"
        class="inputTypeTextArea"
        type="text"
        v-model="blocks[index].description"
        placeholder="Terms & Conditions: after paying the application fee, submit a one time applicationand upload the recipe or any proof so that we evalute the data"
      />
      <button class="btn mt-2" @click="deleteBlock(index)">Delete</button>
      </div>
      
      <button class="btn mt-3 mx-auto" v-if="showNewBlockBtn" @click="newBlock" >Insert new block</button> 
  </div>
</template>

<script>
// import { countries } from "@/data";
import { useCreateProgrammeStore } from "../../stores/createProgramme";
const constBlock =   {
          amount:0,
          student_type:'',
          description:''
        }
export default {
  name: "TuitionFee",
  components: ["CalendarComponent"],
  props: ["isSubmitBtnClicked", "application_fees"],
  data() {
    return {
      amount: "",
      student_type: "",
      highSchoolTypes: ["International School", "Local School"],
      description: "",
      countries: {},
      selectedCountry: "",
      programId: "23e45ghET",
      blocks:[
        constBlock
      ],
      showNewBlockBtn:true,
      showValidationObject:{
        show:false,
        id:''
      }
    };
  },
  watch: {
    blocks: {
      deep: true, // Watch for nested changes within each block
      handler(newBlock) {        
        this.$emit('onUpdateApplicationFee', newBlock);
        this.$emit('on-change', newBlock);
        this.showValidationObject.show = false    
        // Handle changes to the blocks array        
      },
     
    },
  },
  methods: {
    recieveValidation(validateID){      
      this.showValidationObject.show = true      
      this.showValidationObject.id = validateID
    },
    newBlock() {
      if(this.blocks == null){
        this.blocks = []
      }
      if(this.blocks?.length <2){
        this.blocks.push(
          {
          amount:0,
          student_type:'',
          description:''
        }     
        );
      }else{
        this.showNewBlockBtn = false
      }
    },
    deleteBlock(index) {
      this.showNewBlockBtn = true
      this.blocks.splice(index, 1);
    },
    checkInput(e) {
      const previousValue = e.currentTarget.value;
      // console.log(isNaN(Number(previousValue)));
      if (isNaN(Number(previousValue))) {
        previousValue.length == 0
          ? (e.currentTarget.value = "")
          : (e.currentTarget.value = previousValue.slice(
              0,
              previousValue.length - 1
            ));
        return false;
      }
      return true;
    },
    setPreviousApplicationFees() {
      const applicationFees = JSON.parse(
        localStorage.getItem("applicationFees")
      );
      if (applicationFees) {
        this.student_type = applicationFees.student_type;
        this.amount = applicationFees.amount;
        this.description = applicationFees.description;
      }
    },
    setUserInfo() {
      const store = useCreateProgrammeStore();
      store.setApplicationFees({
        program_id: this.programId,
        student_type: this.student_type,
        amount: Number(this.amount),
      });
    },
  },
  computed: {
    maskValue() {
      return this.selectedCountry.dial_code;
    },
  },
  updated() {
    if (this.isSubmitBtnClicked) {
      this.setUserInfo();
    }
  },
  created(){
    if(this.application_fees){
      this.blocks = this.application_fees
    }
  }
  // unmounted() {

  // },
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
