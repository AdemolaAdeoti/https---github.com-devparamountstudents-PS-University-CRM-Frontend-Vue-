<template>
  <div>
    <div
      class="row d-flex shadow px-1 py-3 my-4"
      style="white-space: pre; background-color: #fff"
    >
      <div class="col-12 d-flex align-items-center">
        <div class="col d-flex justify-content-between align-items-center">
          <div class="col-1">
            <img
              class=""
              :src="
                student.avatar != ''
                  ? student.avatar
                  : require('/src/assets/images/d-board/avater-1.svg')
              "
              alt=""
            />
          </div>
          <div class="col-9">
            <div class="container">
              <div class="row">
                <div class="text-secondary track-cell col-2 px-1">
                  <span>Full Name</span>
                  <p class="text-dark mb-0 text-truncate">
                    {{ student.fullName }}
                  </p>
                </div>
                <div class="text-secondary track-cell col-4 px-1">
                  <span>Email </span>
                  <p class="text-dark mb-0 text-truncate">
                    {{ student.email }}
                  </p>
                </div>
                <div class="text-secondary track-cell col-2 px-1">
                  <span>Country </span>
                  <p class="text-dark mb-0 text-truncate">
                    {{ student.country }}
                  </p>
                </div>
                <div class="text-secondary track-cell col-2 px-1">
                  <span>National ID</span>
                  <p class="text-dark mb-0 text-truncate">
                    {{ student.nationalID }}
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
                      {{ student.status }}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="col-2" style="text-align: end;">
            <button
              @click="showDetails()"
              class="view-track btn text-dark px-4 py-2"
              :class="trackDetails ? 'primary-btn' : 'btn-disabled'"
            >
              View Track
            </button>
          </div>
        </div>
      </div>
    </div>
    <Transition name="slide-fade">
      <div
        v-if="trackDetails"
        class="tracking-container row no-gutters pb-3 px-0 mb-5"
      >
        <div v-if="student.details.length > 0" class="track-details">
          <div
            v-for="(details, i) of student.details"
            :key="i"
            class="shadow rounded"
            id="cons"
            style="cursor: grab; overflow: auto"
          >
            <div class="card">
              <div class="card-body">
                <h6 class="card-title text-dark px-2 py-3 row mb-0">
                  <span class="text-secondary col-4 text-truncate p-0"
                    >University</span
                  >
                  <span class="col text-truncate p-0">{{
                    details.university
                  }}</span>
                </h6>
                <h6 class="card-title text-dark px-2 py-3 row mb-0">
                  <span class="text-secondary col-4 text-truncate p-0"
                    >Major</span
                  >
                  <span class="col text-truncate p-0">{{ details.major }}</span>
                </h6>
                <h6 class="card-title text-dark px-2 py-3 row mb-0">
                  <span class="text-secondary col-4 text-truncate p-0"
                    >Country</span
                  >
                  <span class="col text-truncate p-0">{{
                    details.country
                  }}</span>
                </h6>
              </div>
              <h6 class="card-header text-bold">Application Status</h6>
              <div class="card-body">
                <div class="row d-flex flex-row py-3">
                  <div class="col-3">
                    <img
                      :src="
                        require('/src/assets/images/application-submission.svg')
                      "
                      height="40"
                    />
                  </div>
                  <div class="col-9" style="padding-left: 10px">
                    <h6 class="m-0">Application Submitted</h6>
                    <p class="m-0 text-secondary text-xs">
                      {{ details.submittedDate }}
                    </p>
                  </div>
                </div>
                <div class="row d-flex flex-row py-3">
                  <div class="col-3">
                    <img
                      :src="
                        require('/src/assets/images/application-status.svg')
                      "
                      height="40"
                    />
                  </div>
                  <div class="col-9" style="padding-left: 10px">
                    <h6 class="m-0">Application Accepted/Rejected</h6>
                    <p class="m-0 text-secondary text-xs">
                      {{ details.isAccepted }}
                    </p>
                  </div>
                </div>
                <div class="row d-flex flex-row py-3">
                  <div class="col-3">
                    <img
                      :src="
                        require('/src/assets/images/application-university.svg')
                      "
                      height="40"
                    />
                  </div>
                  <div class="col-9" style="padding-left: 10px">
                    <h6 class="m-0">Accepted University</h6>
                    <p class="m-0 text-secondary text-xs">
                      {{ details.accUniversity }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="no-details shadow d-flex flex-col mx-auto">
          <h2>No applications yet</h2>
          <p>This user is still finding their desired university</p>
        </div>
      </div>
    </Transition>
  </div>
</template>
<script>
export default {
  name: 'StudentTrack',
  props: ['student'],
  data() {
    return {
      trackDetails: false,
    };
  },
  methods: {
    showDetails() {
      console.log(this.trackDetails);
      this.trackDetails = !this.trackDetails;
    },
  },
  computed: {
    getIcon() {
      return this.student.status.toLowerCase() == 'applyings'
        ? '#4B4EFC'
        : this.student.status.toLowerCase() === 'got admissions'
        ? '#66C61C'
        : '#F79009';

      // if (this.student.status.toLowerCase() == 'applyings') {
      //   return 'red';
      // } else if (this.student.status.toLowerCase() == 'got admissions') {
      //   return 'yellow';
      // }

      // return 'blue';
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
  font-size: 14px!important;
  p{
    font-size: 14px!important;
  }
}
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
    color: rgb(245, 245, 245) !important;
    //transition: color 0.5s;
    box-shadow: inset 150px 0 0 0 $primary !important;
  }
}

.text-xs {
  font-size: 0.85rem !important;
}

/** Styling for transistion**/
// .v-enter-active,
// .v-leave-active {
//   transition: opacity 0.5s ease;
// }

// .v-enter-from,
// .v-leave-to {
//   opacity: 0;
// }

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
  // background-color: #93370d;
  //border: 2px solid rgb(216, 2, 134);
  //border-radius: 0px;
  //padding: 18px 36px;
  //display: inline-block;
  //font-family: 'Lucida Console', Monaco, monospace;
  //font-size: 14px;
  //letter-spacing: 1px;
  // cursor: pointer;
  box-shadow: inset 0 0 0 0 #d80286;
  -webkit-transition: ease-out 0.4s;
  -moz-transition: ease-out 0.4s;
  transition: ease-out 0.4s;
  &:hover {
    box-shadow: inset 600px 0 0 0 #d80286;
  }
}
</style>
