<template>
  <div
    style="width: 730px; margin: auto; margin-top: 0px"
    class="d-flex flex-column"
  >
  <div v-for="(block, index) in blocks" :key="index" class="inputGroupContainer d-flex flex-column align-items-start p-4">
      <!-- High School Name -->
      <div class="row col-12">
        <div class="col-6">
          <label style="font-weight: 600 !important" class="mb-1"
            >Semester Name<span style="color: red">*</span></label
          >
          <DropDown           
            v-model="blocks[index].semester_name"
            :options="highSchoolTypes"
            placeholder=""
            class="w-100"
          />
          <p v-if="showValidationObject.show && showValidationObject.id=='semester_name'" class="text-danger text-center">Field is required</p>
        </div>
        <div class="col-3">
          <!-- Registered Date -->
          <label style="font-weight: 600 !important" class="mb-1"
            >Start Date<span style="color: red">*</span></label
          >
          <div style="border-radius: 8px; overflow: hidden; width: 95%" class="position-relative">
            <input type="date"
              style="width: 100%; height: 45px"
              v-model="blocks[index].start_date"
            />

           <!--  <i style=" position: absolute;height: 100%;right: 0;display: flex;align-items: center;font-size: 1.75rem;top: 0;bottom: 0;padding: 5px;color: black;opacity: 0.5;" class="pi pi-calendar"></i> -->
          </div>
          <p v-if="showValidationObject.show && showValidationObject.id=='start_date'" class="text-danger text-center">Field is required</p>
        </div>
        <div class="col-3">
          <!-- Registered Date -->
          <label style="font-weight: 600 !important" class="mb-1"
            >End Date<span style="color: red">*</span></label
          >
          <div
            style="border-radius: 8px; overflow: hidden; width: 95%"
            class="position-relative"
          >
          <input type="date"
              style="width: 100%; height: 45px"
              v-model="blocks[index].end_date"
            />

            <!-- <i style="position: absolute;height: 100%;right: 0;display: flex;align-items: center;font-size: 1.75rem;top: 0;bottom: 0;padding: 5px;color: black;opacity: 0.5;" class="pi pi-calendar"></i> -->
          </div>
          <p v-if="showValidationObject.show && showValidationObject.id=='end_date'" class="text-danger text-center">Field is required</p>
        </div>
      </div>

      <label style="font-weight: 600 !important" class="mb-1 mt-4"
        >Description<span style="color: red">*</span></label
      >
      <textarea      
        style="resize: none"
        col="15"
        rows="4"
        v-model="blocks[index].description"
        class="inputTypeTextArea"
        type="text"
        placeholder="More About Semester Admission"
      />
      <button class="btn mt-2" @click="deleteBlock(index)">Delete</button>
      </div>
      
      <button class="btn mt-3 mx-auto" @click="newBlock" >Insert new block</button> 
  </div>
</template>

<script>
// import { countries } from "@/data";


export default {
  name: "AdminssionDeadline",
  props:["admission_deadlines"],
  components: ["CalendarComponent","Button"],
  data() {
    return { 
      blocks: [
        {
            semester_name: "",
            start_date: "",
            end_date: "",
            description: "",
          }
      ],
      programId: "23e45ghET",
      number: "0000",
      highSchoolTypes: ["Summer Semester", "Winter Semester", "Spring Semester", "Fall Semester"],      
      showValidationObject:{
        show:false,
        id:''
      }
    };
  },
  computed: {
    maskValue() {
      return this.selectedCountry.dial_code;
    },    
  },
  watch: {
    blocks: {
      deep: true, // Watch for nested changes within each block
      handler(newBlock) {
             
        this.$emit('onUpdateDeadlines', newBlock);
        this.$emit('on-change',newBlock)
        this.showValidationObject.show = true    
        /* this.$emit('update:modelValue', this.blocks); */
        // Handle changes to the blocks array        
      },
     
    },
  },
  methods: {
    recieveValidation(validateID){      
      this.showValidationObject.show = true      
      this.showValidationObject.id = validateID

    },
    dateReformat(d){
      const date = d;

      const year = date.getFullYear().toString().substr(-2); // Extract the last two digits of the year
      const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Add leading zero if month is single digit
      const day = date.getDate().toString().padStart(2, "0"); // Add leading zero if day is single digit

      return `${year}-${month}-${day}`;
    },
    newBlock() {      
      this.blocks.push({
        semester_name: '',
        start_date: '',
        end_date: '',
        description: '',
      });
    },
    deleteBlock(index) {
      this.blocks.splice(index, 1);
    },   
  },
  mounted() {
    
  },
  created(){
    if(this.admission_deadlines){
      this.blocks = this.admission_deadlines
    }
  }
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
