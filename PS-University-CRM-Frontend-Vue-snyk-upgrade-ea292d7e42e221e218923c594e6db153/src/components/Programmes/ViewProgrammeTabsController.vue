<template>
  <div class="ViewprogramTabsController row my-5 pt-3">
    <div
      class="my-2 p-2 col col-md col-sm-4 d-flex align-items-center justify-content-center"
      v-for="tab in tabs.slice(0, 3)"
      :key="tab.id"
    >
      <button
        @click="activeTab = tab.id"
        :class="activeTab == tab.id ? 'activeTabButton' : 'tabButton'"
        class="text-center p-2"
      >
        {{ tab.tabName }}
      </button>
    </div>

    <div
      class="p-2 col col-md col-sm-6 d-flex align-items-center justify-content-center"
      v-for="tab in tabs.slice(3, 5)"
      :key="tab.id"
    >
      <button
        @click="activeTab = tab.id"
        :class="activeTab == tab.id ? 'activeTabButton' : 'tabButton'"
        class="text-center p-2"
      >
        {{ tab.tabName }}
      </button>
    </div>
    <hr style="border: 1.3px solid black !important; opacity: 1 !important" />
    <div class="tabsContainer">
      <ProgrammeDetailsTab :program="program" v-if="activeTab == 1" />
      <AdmissionDeadlineTab :program="program" v-else-if="activeTab == 2" />
      <TuitionFeesTab
        :program="program.tuition_fees"
        v-else-if="activeTab == 3"
      />
      <AcademicRequirementTab
        :program="program"
        v-else-if="activeTab == 4"
      />
      <ApplicationFeesTab :program="program" v-else-if="activeTab == 5" />
    </div>
  </div>
</template>

<script>
import ProgrammeDetailsTab from "@/components/Programmes/ViewProgrammeTabsController/ProgrammeDetailsTab.vue";
import AdmissionDeadlineTab from "@/components/Programmes/ViewProgrammeTabsController/AdmissionDeadlineTab.vue";
import TuitionFeesTab from "@/components/Programmes/ViewProgrammeTabsController/TuitionFeesTab.vue";
import AcademicRequirementTab from "@/components/Programmes/ViewProgrammeTabsController/AcademicRequirementTab.vue";
import ApplicationFeesTab from "@/components/Programmes/ViewProgrammeTabsController/ApplicationFeesTab.vue";
export default {
  name: "ViewprogramTabsController",
  components: { 
    ProgrammeDetailsTab,
    AdmissionDeadlineTab,
    TuitionFeesTab,
    AcademicRequirementTab,
    ApplicationFeesTab,
  },
  props: ["program"],
  data() {
    return {
      activeTab: 1,
      tabs: [
        {
          id: 1,
          tabName: "program Details",
        },
        {
          id: 2,
          tabName: "Admission Deadline",
        },
        {
          id: 3,
          tabName: "Tuition Fees",
        },
        {
          id: 4,
          tabName: "Academic Requirement",
        },
        {
          id: 5,
          tabName: "Application Fees",
        },
      ],
    };
  },
};
</script>

<style scoped>
.tabButton {
  border: 1px solid transparent;
  background: transparent;
}
.tabButton:hover {
  background: #fff9e8;
  border: 1px solid #fdb022;
  opacity: 0.5;
  border-radius: 8px;
}
.activeTabButton {
  background: #fff9e8;
  border: 1px solid #fdb022;
  border-radius: 8px;
  box-shadow: none !important;
  cursor: default !important;
}
</style>
