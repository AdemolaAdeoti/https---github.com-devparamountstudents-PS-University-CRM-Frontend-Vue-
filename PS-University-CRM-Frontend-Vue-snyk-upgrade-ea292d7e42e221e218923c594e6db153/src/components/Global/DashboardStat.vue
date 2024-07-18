<template >
  <div  :class="[page ? 'mx-auto mt-3 mb-0 overflow-auto' : 'mx-auto mt-3 mb-0']">
    <div :class="[page ? 'd-flex gap-3' : 'row']">
      <div      
        :class="docCount.class"
        v-for="docCount in docFileCount"
        :key="docCount.id"
      >
        <div  :class="docCount.style" :style="docCount.borderColor">
          <div class="fw-bold d-flex justify-content-between align-self-end">
            <h1 class="">{{ docCount.count }}</h1>
            <div class="d-flex align-items-start">
              <img
                :src="require(`/src/assets/images/d-board/${docCount.img}`)"
                alt=""
              />
            </div>
          </div>
          <small>{{ docCount.subTitle }}</small>
          <h6>{{ docCount.title }}</h6>
          <h4>{{ docCount.excerpt }}</h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DashboardStat",
  props: {
    docFileCount: {
      type: Array,
      default: () => [],
    },
    page: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      // docFileCount: [
      // 	{
      // 		id: 1,
      // 		style: "border border-primary px-lg-3 p-3 py-4 rounded border-2",
      // 		count: 86,
      // 		img: "arrow-1.svg",
      // 		title: "Total Applications",
      // 		excerpt: "Number of students documents for evaluation.",
      // 	},
      // 	{
      // 		id: 2,
      // 		style: "border border-warning px-lg-3 p-3 py-4 rounded border-2",
      // 		count: 12,
      // 		img: "arrow-2.svg",
      // 		title: "In Progress",
      // 		excerpt: "Number of students documents for evaluation.",
      // 	},
      // 	{
      // 		id: 3,
      // 		style: "border border-success px-lg-3 p-3 py-4 rounded  border-2",
      // 		count: 22,
      // 		img: "arrow-3.svg",
      // 		title: "Approved",
      // 		excerpt: "Number of students documents for evaluation.",
      // 	},
      // 	{
      // 		id: 4,
      // 		style: "border border-danger px-lg-3 p-3 py-4 rounded border-2",
      // 		count: "04",
      // 		img: "arrow-4.svg",
      // 		title: "Rejected",
      // 		excerpt: "Number of students documents for evaluation.",
      // 	},
      // ],
    };
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
