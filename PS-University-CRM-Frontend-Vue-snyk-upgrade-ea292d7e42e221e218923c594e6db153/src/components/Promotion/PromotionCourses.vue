<!--<template>
  
    <div
      class="row d-flex shadow px-1 py-3 my-4 mx-3 rounded-3"
      style="white-space: pre; background-color: #fff;min-width:1000px">
      <div class="col-12 d-flex align-items-center">
        <div class="row col d-flex justify-content-between align-items-center">
          <div class="col-10">
            <div class="">
              <div class="row">
                <div class="text-secondary track-cell col-2 px-1">
                  <span>Course Code</span>
                  <p class="text-dark mb-0 text-truncate">
                    {{ course.program.program_code }}
                  </p>
                </div>
                <div class="text-secondary track-cell col-4 px-1">
                  <span>Program Name </span>
                  <p class="text-dark mb-0 text-truncate">
                    {{ course.program.program_name }}
                  </p>
                </div>
                <div class="text-secondary track-cell col-2 px-1">
                  <span>Date Created </span>
                  <p class="text-dark mb-0 text-truncate">
                    {{
                      course.created_at
                    }}
                  </p>
                </div>
                <div class="text-secondary track-cell col-2 px-1">
                  <span>Duration (days)</span>
                  <p class="text-dark mb-0 text-truncate">
                    {{ course.duration }}
                  </p>
                </div>
                <div class="text-secondary track-cell col-2 px-1">
                  <span>Status </span>
                  <p class="text-dark mb-0 d-flex align-items-center">
                    <span style="margin-right: 5px">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="10"
                        height="10"
                        border-radius="5px"
                        class="bi bi-circle"
                        :style="{
                          backgroundColor: getIcon,
                          fill: getIcon,
                          borderRadius: '5px',
                        }"
                        viewBox="0 0 16 16"
                      >
                        <path
                          d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
                        />
                      </svg>
                    </span>
                    <span class="text-truncate">
                      {{ course.status }}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="col-2">
            <button
              @click="view(course.id)"
              class="view-track btn text-dark px-4 py-2"
              :class="trackDetails ? 'primary-btn' : 'btn-disabled'"
            >
              Insight
            </button>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
export default {
  props: {
    course: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      trackDetails: false,
    };
  },
  methods: {
    view(id) {
      this.$router.push(`/promotions/insights/${id}`);
    },
  },
  computed: {
    getIcon() {
      return this.course.status == "active" ? "#00b300" : "#ff0000";
    },
  },
};
</script>

<style lang="scss" scoped>
$primary: #fac515;
$warning: #fdb022;
$scrollbar-thumb-bg: #dc6803;
$scrollbar-color: #f79009;
$gray: #d0d5dd;

.track-cell {
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-size: 14px !important;
  p {
    font-size: 14px !important;
  }
}
// import ConfirmModal from "@/components/Programme/ViewProgramme/ConfirmModal.vue";
.tracking-container {
  ::-webkit-scrollbar {
    width: 5px !important;
    height: 7px;
    border-bottom: $scrollbar-thumb-bg;
    border-bottom-width: 1px;
    border-bottom-style: solid;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    border-radius: 10px;
    //background: $scrollbar-color;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: $scrollbar-color;
    border-radius: 10px;
  }

  /* Handle on hover */
  // ::-webkit-scrollbar-thumb:hover {
  //     background: $scrollbar-thumb-bg;
  // }

  h3 {
    margin: 3rem 0rem 0rem;
  }

  .track-details {
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
    padding: 0 0 3rem;
    //padding-bottom: 3rem;
    max-width: calc(100% - 3px);

    & > div {
      display: flex;
      flex-direction: column;
      margin: 0rem 1rem 0rem 0rem;
      min-width: 350px;

      div {
        flex-direction: column;
        //padding: 1rem;
        //min-height: 181px;
        display: flex;
      }

      h3 {
        font-size: 1.3rem;
        font-weight: 600;
        margin-top: 1rem;
      }
    }
  }
  .no-details {
    flex-direction: column;
    padding: 1.5rem;
    align-items: center;

    h2 {
      color: #93370d;
      font-size: 35px;
      line-height: 44px;
      font-weight: 600;
    }
    p {
      font-size: 14px;
      line-height: 20px;
    }
  }
  .card {
    .card-header {
      padding: 1rem;
      background-color: inherit;
      border-bottom-color: $warning;
      border-bottom-style: solid;
      border-top-color: $warning;
      border-width: 1px;
      border-top-style: solid;
    }
  }
}

.active,
.view-track:active {
  background-color: $primary !important;
}

.view-track {
  font-size: 14px !important;
  //transition: all 0.3s ease;
  box-shadow: inset 0 0 0 0 $primary !important;
  -webkit-transition: ease-out 0.4s !important;
  -moz-transition: ease-out 0.4s !important;
  transition: ease-out 0.4s !important;

  &:hover {
    // background-color: $primary !important;
    color: #1d2939 !important;
    //transition: color 0.5s;
    box-shadow: inset 150px 0 0 0 $primary !important;
  }
}

.text-xs {
  font-size: 0.85rem !important;
}

.slide-fade-enter-active {
  transition: all 0.3s linear;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(0px);
  opacity: 0;
}

.button_slide {
  color: #000;
  box-shadow: inset 0 0 0 0 #d80286;
  -webkit-transition: ease-out 0.4s;
  -moz-transition: ease-out 0.4s;
  transition: ease-out 0.4s;
  &:hover {
    box-shadow: inset 600px 0 0 0 #d80286;
  }
}
</style>
