<template lang="html">
  <div
    class=""
    :class="[page ? 'mx-4 mt-5 mb-4 overflow-auto' : 'mx-4 mt-5 mb-4']"
  >
    <div :class="[page ? 'd-flex gap-3' : 'row']">
      <div
        :class="docCount.class"
        v-for="docCount in docFileCount"
        :key="docCount.id"
      >
        <div v-if="docCount.title === 'Create A User'">
          <div
            class="d-flex flex-column align-items-center"
            :class="docCount.style"
            :style="docCount.borderColor"
          >
            <router-link
              style="
                color: unset;
                margin: 0;
                padding: 0;
                display: flex;
                flex-direction: column;
              "
              to="/users-and-roles/create-user"
            >
              <div class="d-flex align-items-center justify-content-center">
                <img
                  class="mt-1"
                  src="@/assets/images/users-and-roles/create-new-user.svg"
                  alt=""
                />
              </div>
              <small>{{ docCount.subTitle }}</small>
              <h6 class="mt-3">{{ docCount.title }}</h6>
              <h4>{{ docCount.excerpt }}</h4></router-link
            >
          </div>
        </div>
        <div v-else :class="docCount.style" :style="docCount.borderColor">
          <router-link v-if="docCount.to" :to="docCount.to">
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
          </router-link>
          <div v-else>
            <div class="fw-bold d-flex justify-content-between align-self-end">
              <h1 class="">{{ docCount.count }}</h1>
              <div class="d-flex align-items-start"></div>
            </div>
            <small>{{ docCount.subTitle }}</small>
            <h6>{{ docCount.title }}</h6>
            <h4>{{ docCount.excerpt }}</h4>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "StatKeeper",
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
  beforeUpdate() {
    this.$emit("filterOnClick");
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
.gradientPrimary {
  background: linear-gradient(
    180deg,
    rgba(115, 117, 253, 0.2) 0%,
    rgba(115, 117, 253, 0) 100%
  );
}
.gradientSuccess {
  background: linear-gradient(
    180deg,
    rgba(50, 213, 131, 0.2) 0%,
    rgba(50, 213, 131, 0) 100%
  );
}
.gradientWarning {
  background: linear-gradient(
    180deg,
    rgba(253, 176, 34, 0.2) 0%,
    rgba(253, 176, 34, 0) 100%
  );
}
.gradientDanger {
  background: linear-gradient(
    180deg,
    rgba(249, 112, 102, 0.2) 0%,
    rgba(249, 112, 102, 0) 100%
  );
}
.gradientSecondary {
  background: linear-gradient(
    180deg,
    rgba(234, 236, 240, 1) 0%,

    rgba(255, 255, 255, 0) 100%
  );
}
</style>
