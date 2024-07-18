<!--<template>
  <div class="d-flex justify-content-between mx-4 px-3">
    <form action="" class="w-85" @submit.prevent="filterPromotion()">
      <div class="row m-w-100">
        <div class="form-group col">
          <label for="courseCode" class="font-weight-bold mb-1"
            >Course Code</label
          >
          <input
            id="courseCode"
            type="search"
            v-model="courseCode"
            class="form-control border w-100 border-warning outline-none py-2 userInput"
          />
        </div>
        <div class="form-groups col">
          <label for="programName" class="font-weight-bold mb-1"
            >Program Name</label
          >
          <input
            id="programName"
            type="search"
            v-model="programName"
            class="form-control border w-100 py-2 border-warning outline-none userInput"
          />
        </div>
        <div class="form-group col">
          <label for="dateCreated" class="font-weight-bold d-block mb-1"
            >Date Created</label
          >
          <Calendar
            v-model="dateCreated"
            dateFormat="dd/mm/yy"
            id="dateCreated"
            class="userInput"
          />
        </div>
      </div>

      <!-- Second form line --
      <div class="d-flex justify-content-between mt-4 align-items-end row">
        <div class="form-group col">
          <label for="courseCode" class="font-weight-bold d-block mb-1"
            >Status</label
          >
          <Dropdown
            :options="promotionStatus"
            v-model="status"
            placeholder="Select a status"
            class="userInput"
          />
        </div>
        <div class="form-group col">
          <label for="courseCode" class="font-weight-bold mb-1">Duration</label>

          <input
            id="courseCode"
            type="search"
            v-model="duration"
            class="form-control border w-100 py-2 border-warning outline-none userInput"
          />
        </div>
        <div class="col d-flex justify-content-end">
          <button class="btn btn-secondary px-4">Search</button>
        </div>
      </div>
    </form>
    <!-- buttons --
    <div class="">
      <button
        class="backgroundImage d-block mb-4"
        @click="$emit('closeFilter')"
      >
        <img
          :src="require(`/src/assets/images/fiter-icon.svg`)"
          style="height: 20px; width: 20px; margin-bottom: 2px"
        />
        Filter
      </button>
      <button
        class="btn border border-secondary backgroundImage"
        style="background: #eee"
        @click="clearForm()"
      >
        Clear All
      </button>
    </div>
  </div>
</template>

<script>
import Calendar from "primevue/calendar";
import Dropdown from "primevue/dropdown";
export default {
  components: {
    Calendar,
    Dropdown,
  },
  data() {
    return {
      courseCode: "",
      programName: "",
      dateCreated: null,
      status: null,
      duration: "",
      promotionStatus: ["ongoing", "expired"],
      promoionStatus: [
        {
          name: "ongoing",
        },
        {
          name: "expired",
        },
      ],
    };
  },
  methods: {
    filterPromotion() {
      if (
        this.courseCode == "" &&
        this.programName == "" &&
        this.status == null &&
        this.dateCreated == null &&
        this.duration == ""
      ) {
        alert("Please fill in at least one field");
        return;
      }
      const newFilter = {
        courseCode: this.courseCode,
        programName: this.programName,
        status: this.status,
        dateCreated: this.dateCreated,
        duration: this.duration,
      };
      console.log(newFilter);
      this.clearForm();
      this.$emit("closeFilter");
    },
    clearForm() {
      this.courseCode = "";
      this.programName = "";
      this.status = null;
      this.dateCreated = null;
      this.duration = "";
    },
  },
};
</script>
<style scoped>
.backgroundImage {
  display: inline-block;
  background-color: #fac515;
  border-radius: 8px;
  padding: 8px 27px;
  border: none;
  font-size: 16px;
}
.userInput {
  min-width: 100%;
  background: white;
  border: 1px solid #fac515;
  border-radius: 8px;
  outline: none;
}
</style>
