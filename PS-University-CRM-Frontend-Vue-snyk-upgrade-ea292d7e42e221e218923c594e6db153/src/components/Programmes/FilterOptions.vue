<template>
  <div id="animatedFilterOptions" class="ps-3 d-flex flex-column w-100">
    <div class="row d-flex justify-content-evenly align-items-center">
      <div class="col inputGroupContainer">
        <!-- Course Code -->
        <label style="font-weight: 600 !important" class="mb-1"
          >Course Code</label
        >

        <input
          :value="code"
          @change="$emit('update:code', $event.target.value)"
          class="inputTypeText"
          type="number"
          placeholder="Course Code"
        />
      </div>
      <div class="col inputGroupContainer">
        <!-- Location -->
        <label style="font-weight: 600 !important" class="mb-1"
          >Study Location</label
        >

        <input
          :value="location"
          @change="$emit('update:location', $event.target.value)"
          class="inputTypeText"
          type="text"
          placeholder="Location"
        />
      </div>
      <div class="col inputGroupContainer">
        <!-- Program Type -->
        <label style="font-weight: 600 !important" class="mb-1"
          >Program Type</label
        >

        <DropDown
          v-model="selectedProgramType"
          @change="$emit('update:programType', $event.value)"
          :options="programTypes"
          placeholder="Program Type"
          class="inputTypeSelect"
        />
      </div>
    </div>
    <div class="row d-flex ps-3 justify-content-evenly align-items-center">
      <div class="col inputGroupContainer">
        <!-- University Status -->
        <label style="font-weight: 600 !important" class="mb-1">Status</label>

        <DropDown
          v-model="selectedStatus"
          @change="$emit('update:status', $event.value)"
          :options="statusOptions"
          placeholder="Status"
          class="inputTypeSelect"
        />
      </div>

      <div class="col inputGroupContainer">
        <!-- Learning Mode -->
        <label style="font-weight: 600 !important" class="mb-1"
          >Learning Mode</label
        >

        <DropDown
          @change="$emit('update:learningMode', $event.value)"
          v-model="selectedLearningMode"
          :options="learningModes"
          placeholder="Learning Mode"
          class="inputTypeSelect"
        />
      </div>
    </div>
    <div class="mt-4 d-flex align-items-center justify-content-start">
      <button @click="$emit('clearAll')" class="border py-2 px-5">
        Clear All
      </button>
      <button
        @click="$emit('changeFiltered')"
        class="ms-5 bg-warning border py-2 px-5"
      >
        Search
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "FilterOptions",
  props: ["code", "location", "status", "learningMode", "programType"],
  emits: [
    "update:code",
    "update:location",
    "update:status",
    "update:learningMode",
    "update:programType",
  ],
  data() {
    return {
      programTypes: [
        "Bachelor Degree",
        "Master Degree",
        "Diploma Program",
        "PHD Degree",
      ],
      selectedProgramType: this.programType,
      statusOptions: ["Published", "Not Published", "Draft"],
      selectedStatus: this.status,
      learningModes: ["On Campus", "Online"],
      selectedLearningMode: this.learningMode,
    };
  },
};
</script>

<style scoped>
#animatedFilterOptions {
  animation-name: animate;
  animation-duration: 0.5s;
  animation-timing-function: ease-in-out;
  animation-iteration-count: 1;
}

@keyframes animate {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

.inputGroupContainer {
  margin-top: 32px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.inputTypeText {
  width: 90%;
  padding: 10px 14px 10px 12px;
  border: 0.5px solid #000000;
  border-radius: 4px;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}

.inputTypeSelect {
  width: 90%;
  padding: 2px 2px 2px 2px;
  border: 0.5px solid #000000;
  border-radius: 8px;
}
</style>
