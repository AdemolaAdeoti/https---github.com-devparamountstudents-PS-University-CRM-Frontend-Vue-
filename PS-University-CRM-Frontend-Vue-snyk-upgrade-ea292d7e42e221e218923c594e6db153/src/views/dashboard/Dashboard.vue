<template>
  <div class="row ms-2 me-4 mx-auto">
    <h3 class="px-0 fw-bold">Dashboard</h3>
    <hr style="background: #f79009" />

    <DashboardStat :doc-file-count="docFileCount" />

    <hr class="mt-5" />
    <div class="mx-3 p-3 student-app-heading">
      <div class="d-flex justify-content-between align-items-center">
        <h4>
          <img
            class="px-2"
            :src="
              require('/src/assets/images/d-board/student-application-black.svg')
            "
            alt=""
            height="24"
          />
          Student Applications
        </h4>
        <button
          class="btn btn-large bg-yellow px-3 fw-500 ripple h-100"
          @click="() => this.$router.push('/student-application')"
        >
          View All
        </button>
      </div>
    </div>
    
    <SkeletalLoader v-show="sLoading" :col="12" :row="5"/>
    <div v-if="students.length > 0">
      <StudentApplication
        v-for="(student, index) in students"
        :key="index"
        :student="student"
        :index="index"
        :isDashboard="true"
      />
    </div>
    <div class="mx-3 px-0">
      <div class="student-track mx-0 p-3">
        <div class="d-flex justify-content-between align-items-center">
          <h4>
            <img
              class="px-2"
              :src="
                require('/src/assets/images/d-board/student-tracking-black.svg')
              "
              alt=""
              height="24"
            />Programmes
          </h4>
          <button
            class="btn btn-large bg-yellow px-3 fw-500 ripple h-100"
            @click="() => this.$router.push('/programs')"
          >
            View All
          </button>
        </div>
      </div>
    </div>
    <SkeletalLoader v-show="pLoading" :col="12" :row="5"/>
    <div v-if="programs.length > 0">
      <Program
        v-for="(program, index) in programs"
        :key="index"
        :program="program"
        :index="index"
        :isDashboard="true"
      />
    </div>

    <div class="row p-3">
      <div class="col-lg-6 mt-3 mb-4 mr-4">
        <div
          class="shadow p-3 d-flex justify-content-between align-items-center bg-white"
        >
          <h4 class="d-flex mb-0 align-items-center p-header">
            <img
              class="px-2"
              :src="require('/src/assets/images/d-board/inbox-black.svg')"
              alt=""
              height="24"
            />Chat
          </h4>
          <button
            class="btn btn-large bg-yellow px-3 fw-500 ripple h-100"
            @click="() => this.$router.push('/inbox')"
          >
            View All
          </button>
        </div>
        <hr class="mt-5 grey" />
      </div>
      <div class="col-lg-6 mt-3 mb-4">
        <div class="shadow p-3 bg-white">
          <h4 class="p-header">
            <img class="px-2" :src="require('/src/assets/images/d-board/help-support-black.svg')"
              alt="" height="24px"/>Help Support
          </h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DashboardStat from "@/components/Global/DashboardStat.vue";
import SkeletalLoader from "@/components/Global/SkeletalLoader.vue";
import Program from "../../components/Programme/Programs.vue";
import { get } from "@/api/client";
import { useProgrammeStore } from "@/stores/programme";
import { useStudentApplicationStore } from "@/stores/studentApplications";
import StudentApplication from "@/components/StudentsApplication/StudentApplication.vue";

export default {
  name: "UserDashboard",
  components: { DashboardStat, Program, StudentApplication, SkeletalLoader },
  data() {
    return {
      studentApplication: [],
      students: [],
      programs: [],
      programDetails: [],
      admissionDetails: [],
      approved: 0,
      rejected: 0,
      inProgress: 0,
      awardCount: {
        bachelorsDegree: 0,
        mastersDegree: 0,
        diplomaDegree: 0,
        doctorateDegree: 0,
      },
      docFileCount: [
        {
          id: 1,
          style: "border border-primary px-lg-3 p-3 py-4 rounded border-2",
          count: 0,
          img: "arrow-1.svg",
          title: "Total Applications",
          // excerpt: "Number of students documents for evaluation.",
          class: "col-lg-4 col-md-6 col-xl-3 mb-3 bg-white",
        },
        {
          id: 2,
          style: "border border-warning px-lg-3 p-3 py-4 rounded border-2",
          count: 0,
          img: "arrow-2.svg",
          title: "In Progress",
          // excerpt: "Number of students documents for evaluation.",
          class: "col-lg-4 col-md-6 col-xl-3 mb-3 bg-white",
        },
        {
          id: 3,
          style: "border border-success px-lg-3 p-3 py-4 rounded  border-2",
          count: 0,
          img: "arrow-3.svg",
          title: "Approved",
          // excerpt: "Number of students documents for evaluation.",
          class: "col-lg-4 col-md-6 col-xl-3 mb-3 bg-white",
        },
        {
          id: 4,
          style: "border border-danger px-lg-3 p-3 py-4 rounded border-2",
          count: 0,
          img: "arrow-4.svg",
          title: "Rejected",
          // excerpt: "Number of students documents for evaluation.",
          class: "col-lg-4 col-md-6 col-xl-3 mb-3 bg-white",
        },
        {
          id: 5,
          style: "border border-danger px-lg-3 p-3 py-4 rounded border-2",
          count: 0,
          img: "arrow-4.svg",
          title: "got admission",
          // excerpt: "Number of students documents for evaluation.",
          class: "col-lg-4 col-md-6 col-xl-3 mb-3 bg-white",
        },
      ],
            sLoading: true,
      pLoading: true,
    };
  },
  computed: {
    applicationSummary() {
      return this.studentApplication.slice(0, 5);
    },
  },
  methods: {
    setAwardCount(obj) {
      // console.log(obj);
      if (obj.program_award == "Bs.C" || obj.program_award == "B.Sc") {
        const count = this.awardCount.bachelorsDegree;
        this.awardCount.bachelorsDegree = count + 1;
        console.log(this.awardCount.bachelorsDegree, "1");
      } else if (obj.program_award == "M.Sc") {
        let count = this.awardCount.mastersDegree;
        this.awardCount.mastersDegree = count + 1;
      } else if (obj.program_award == "Dip") {
        let count = this.awardCount.diplomaDegree;
        this.awardCount.diplomaDegree = count + 1;
      } else if (obj.program_award == "Ph.D") {
        let count = this.awardCount.doctorateDegree;
        this.awardCount.doctorateDegree = count + 1;
      }
    },
    async getPrograms() {
      const store = useProgrammeStore();
      try {
        const programs = await get("programmes");
        const data = programs?.data;
        data.map((obj) => {
          this.programs.push({
            id: obj.id,
            national_id: obj.id,
            program_code: obj.program_code,
            studyLocation: obj.study_location,
            programType: obj.program_type,
            programAward: obj.program_award,
            studyLanguage: obj.study_language,
            learningMode: obj.learning_mode,
            status: obj.status,
          });        
          this.setAwardCount(obj);
        });
        store.setProgramme(data);
        // store.setProgrammeDetails(this.programDetails);
        store.setAwardCount(this.awardCount);
      } catch (err) {
        store.setProgramme([]);
        // store.setProgrammeDetails([]);
        console.log(err);
      }
    },
    setStudents(students) {
      const store = useStudentApplicationStore();
      store.setStudentApplications(students);
    },
    setProgramme(programs) {
      const store = useProgrammeStore();
      store.setProgramme(programs);
    },
  },
  async created(){
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
    const res =  await get('program/applications?university_id='+this.userInfo.university_id);    
    if(res?.responseBody){
      this.students = res?.responseBody?.data.filter((item,i) => i<3 );
      this.sLoading = false
      this.setStudents(this.students)
    }
    let res2 = await get('student/progams/application/dashboard?university_id='+this.userInfo.university_id);
    if(res2.responseBody){      
      res2 = res2.responseBody;
      let keys = Object.keys(res2);
      this.docFileCount.forEach((item, i) => {
        item.count = res2[keys[i]] || 0;
        item.title = keys[i]?.replaceAll('_',' ');
      });
    }
    let res3 = await get('programs?university_id='+this.userInfo.university_id);
    if(res3?.data){

      this.programs = res3?.data?.filter((item,i) => i<3 );
      this.pLoading = false
      this.setProgramme(this.programs)
    }
  },
};
</script>

<style lang="scss" scoped>
$text-color: #1d2939;
.fs-14 {
  font-size: 14px !important;
}

@media screen and (max-width: 768px) {
  .w-md-18 {
    width: 170%;
  }
}
.p-02 {
  padding: 0.4em 0.4em !important;
}
.fs-6 {
  font-size: 0.8em !important;
}
.inboxImg {
  width: 39.92px;
  height: 40px;
}
.grey {
  color: #98a2b3;
}

.bg-white {
  background-color: #fff;
}

.student-app-heading {
  margin-top: 50px;
  margin-bottom: 20px;
  box-shadow: 0px 4px 16px rgba(16, 24, 40, 0.1);
  background-color: #fff;

  h4 {
    font-weight: 600;
    font-size: 1.5rem;
    margin-bottom: 0;
    line-height: 38px;
    color: $text-color;
  }
}

.student-app {
  .student-app-card {
    box-shadow: 0px 4px 16px rgba(16, 24, 40, 0.1);
    background-color: #fff;
  }
}

.student-track {
  margin-top: 20px;
  margin-bottom: 20px;
  box-shadow: 0px 4px 16px rgba(16, 24, 40, 0.1);
  background-color: #fff;
  h4 {
    font-weight: 600;
    font-size: 1.5rem;
    line-height: 38px;
    color: $text-color;
    margin-bottom: 0;
  }
}
.p-header {
  font-weight: 600;
  font-size: 1.5rem;  
  line-height: 38px;
  color: $text-color;
  margin-bottom: 0;
}

button {
  font-size: 0.8rem;
}
</style>
