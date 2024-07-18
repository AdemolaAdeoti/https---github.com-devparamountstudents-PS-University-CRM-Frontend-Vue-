<template>  
    <div class="row d-flex shadow px-1 py-3 mb-3 mt-2 w-100 bg-white" :class="from === 'main' ? 'mx-auto' : 'mx-3'" style="overflow-y: auto;">
      <div class="col-12 d-flex align-items-center bg-white" style="white-space: pre; background-color: #fff; min-width:928px;">
        <div class="col d-flex justify-content-between align-items-center">
          <div class="col-1">
          <img style="width:50px" class="" :src="student.user?.document?.formal_photo || '/src/assets/images/d-board/avater-1.svg'"
              @error="onImageError($event)" alt="" />
        </div>

                <div class="text-secondary track-cell col-2 px-1">
                  <span>Full Name</span>
                  <p class="text-dark mb-0 text-truncate">
                    {{ student?.user?.full_name }}
                  </p>
                </div>
                <div class="text-secondary track-cell col-4 px-1">
                  <span>Unique ID </span>
                  <p class="text-dark mb-0 text-truncate">
                    {{ student?.user?.unique_id }}
                  </p>
                </div>
                <div class="text-secondary track-cell col-2 px-1">
                  <span>Country </span>
                  <p class="text-dark mb-0 text-truncate">
                    {{ student?.user?.country }}
                  </p>
                </div>
                <div class="text-secondary track-cell col-2 px-1">
                  <span>National ID</span>
                  <p class="text-dark mb-0 text-truncate">
                    {{ student?.user?.national_id ?? "sasasasa" }}
                  </p>
                </div>
                <div class="text-secondary track-cell col-2 px-1">
                  <span>Status </span>
                  <p class="text-dark mb-0 d-flex align-items-center">
                    <span style="margin-right: 5px">
                      <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" border-radius="5px"
                        class="bi bi-circle" :style="{
                          backgroundColor: getTextColor(student?.application_status),
                          fill: getTextColor(student?.application_status),
                          borderRadius: '5px',
                        }" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                      </svg>
                    </span>
                    <span class="text-truncate" :style="'color:'+ getTextColor(student.application_status)">
                      {{ student.application_status }}
                    </span>
                  </p>
                </div>
          <div class="col-1">
              <button @click="navigateToChatDetails()" class="view-track btn text-dark px-3 py-2"
                :class="trackDetails ? 'primary-btn' : 'btn-disabled'">
                <img class="me-2 " style="width: 14px;" :src="require('/src/assets/images/d-board/chat.svg')" alt="">
                Chat
              </button>
            </div>
          <!--   <div class="col-1" style="text-align: end;">
              <button @click="view(index)" class="view-track btn text-dark px-4 py-2"
                :class="trackDetails ? 'primary-btn' : 'btn-disabled'">
                <img class="me-2 " :src="require('/src/assets/images/d-board/student-application-black.svg')" alt="">
                View
              </button>
            </div> -->
          </div>
          <div class="col-2" style="text-align: end">
            <button
              @click="view(index)"
              class="view-track btn text-dark px-4 py-2"
              :class="trackDetails ? 'primary-btn' : 'btn-disabled'">
              <img
                class="me-2"
                :src="
                  require('/src/assets/images/d-board/student-application-black.svg')
                "
                alt="" />
              View
            </button>
          </div>
        </div>
    </div>    
  
</template>
<script>
export default {
  props: {
    from:{
      default:'dashboard'
    },    
    student: {
      type: Object,
      default: function () {
        return {}
      },
    },
    index: Number,
    isDashboard: {
      type: Boolean,
      default: function () {
        return false
      }
    }
  },
  data() {
    return {
      trackDetails: false,
    };
  },
  methods: {
    view(index) {
      if (this.isDashboard) {
        this.$router.push('/student-application');
        localStorage.setItem("selected_student", JSON.stringify(this.student))
      }
      this.$emit('onClick', index);
    },
    onImageError(event) {      
      event.target.src = require('/src/assets/images/d-board/avater-1.svg');
    },
    navigateToChatDetails() {
      localStorage.setItem('chatInfo', JSON.stringify(
        { "sender_email": this.student?.email, "user_type": "user", "sender_id": this.student?.id, "total_unread": "0", "message": "", "is_read": 1, "created_at": "", "profile_photo_url": this.student?.picture_url, "full_name": this.student.full_name, "receiver_type": null, "sender_type": null, "time_at": "" }
      ))
      this.$router.push({
        name: 'ChatDetails',
      });
    },
    getTextColor(status) {
      try {
        return status.toLowerCase() == 'in review' || status == ''
          ? '#ffb300'
          : status.toLowerCase() === 'approved'
            ? '#198754'
            : status.toLowerCase() === 'rejected' ?
              "#DC3545" : '#555555';
      } catch (e) {
        //console.log(e, status)
      }
      return '';
    },
  },
  // computed: {
  //   getIcon() {
  //     return this.student.application_status.toLowerCase() == 'applying'
  //       ? '#4B4EFC'
  //       : this.student.application_status.toLowerCase() === 'got admission'
  //         ? '#198754'
  //         : this.student.application_status.toLowerCase() === 'accepted'
  //           ? '#fdb022'
  //           : this.student.application_status.toLowerCase() === 'rejected' ?
  //             "#f10e0e" : 'd0d5dd';
  //   },
  // },
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

    &>div {
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
