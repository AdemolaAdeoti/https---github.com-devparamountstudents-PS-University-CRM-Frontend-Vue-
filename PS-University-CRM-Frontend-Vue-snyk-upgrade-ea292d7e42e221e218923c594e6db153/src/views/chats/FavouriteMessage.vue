<template>
  <div class="row w-90 mx-auto">
    <!-- <div class="container-fluid h-100 p-0" style="background-color: aqua"> -->
    <div class="">
      <div class="col-12 d-flex justify-content-between">
        <div>
          <h3 class="fw-bold display">favourite</h3>
        </div>
        <div class="col-8">
          <div class="input-group">
            <div class="input-group-prepend">
              <span
                type="button"
                class="input-icon input-group-text bg-transparent border-0"
                id="basic-addon1"
              >
                <img
                  :src="require(`/src/assets/images/search_icon.png`)"
                  alt=""
              /></span>
            </div>
            <div class="col-8">
              <input
                type="text"
                name="search"
                class="form-control border-left-0"
                placeholder="Search"
                aria-label="Search"
                aria-describedby="basic-addon1"
                v-model.trim="search"
              />
            </div>
          </div>
        </div>
        <div class="">
          <i class="pi pi-bars fs-4" @click="showDetails1()"></i>
          <div name="slide-fade">
            <div
              v-if="trackDetails1"
              class="tracking-container"
              style="position: absolute; z-index: 1"
            >
              <ul class=" " style="background-color: sea">
                <li
                  class="fw-light btn"
                  style="
                    width: 90px;
                    font-size: 10px;
                    border-bottom: 2px solid black;
                  "
                >
                  Delete Msg
                </li>
                <li
                  class="fw-light btn"
                  style="
                    width: 90px;
                    font-size: 10px;
                    border-bottom: 2px solid black;
                  "
                >
                  Edit Msg
                </li>
                <li
                  class="fw-light btn"
                  style="
                    width: 90px;
                    font-size: 10px;
                    border-bottom: 2px solid black;
                  "
                >
                  Delete Msg
                </li>
                <li
                  class="fw-light btn"
                  style="
                    width: 90px;
                    font-size: 10px;
                    border-bottom: 2px solid black;
                  "
                >
                  Edit Msg
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <hr class="mt-1" />
    <div name="slide-fade">
      <div
        v-if="trackDetails2"
        class="tracking-container"
        style="position: absolute; z-index: 1"
      >
        <ul
          class=" "
          style="
            background-color: seashell;
            border-radius: 5px;
            width: 90px;
            text-align: center;
            position: relative;
            right: 32px;
            bottom: 22px;
          "
        >
          <li
            class="fw-light btn"
            style="width: 90px; font-size: 10px; border-bottom: 2px solid black"
          >
            Delete Msg
          </li>
          <li
            class="fw-light btn"
            style="width: 90px; font-size: 10px; border-bottom: 2px solid black"
          >
            Edit Msg
          </li>
        </ul>
      </div>
    </div>
    <div class="row d-flex" v-for="chat in chats" :key="chat.id">
      <div class="col-12 d-flex align-items-center">
        <div class="col d-flex justify-content-between align-items-center">
          <div class="col-1">
            <img class="" :src="chat.sender.imgURL" alt="" />
          </div>
          <div class="col-12">
            <div class="">
              <div class="row">
                <div class="text-secondary col-10 px-1">
                  <span class="text-dark">{{ chat.sender.username }}</span>
                  <p class="text-dark mb-0">
                    {{ chat.sender.body }}
                  </p>
                </div>
                <div class="text-secondary track-cell col-2">
                  <i @click="showDetails2()" class="pi pi-ellipsis-v fs-6"></i>

                  <div>
                    <span style="margin-right: 5px">{{
                      chat.sender.receivedtime
                    }}</span
                    ><span>star</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr class="mt-1" />
    </div>
  </div>
</template>

<script>
import { ChatMessages } from "@/data";
export default {
  name: "ChatsMessage",
  data() {
    return {
      chats: ChatMessages,
      trackDetails2: false,
      trackDetails1: false,
    };
  },
  components: {},
  methods: {
    showDetails2() {
      console.log(this.trackDetails2);
      this.trackDetails2 = !this.trackDetails2;
    },
    showDetails1() {
      console.log(this.trackDetails1);
      this.trackDetails1 = !this.trackDetails1;
    },
  },
};
</script>

<style lang="scss">
$primary: #fac515;
$warning: #fdb022;
$scrollbar-thumb-bg: #dc6803;
$scrollbar-color: #f79009;
$gray: #d0d5dd;

.texteditor {
  width: 95%;
  margin: auto;
  padding-bottom: 20px;
  padding-top: 10px;
}

.paperclip {
  padding-left: 70px !important;
  font-size: 30px;
  padding-top: 70px !important;
  color: rgb(199, 204, 197);
}

.sendicon {
  padding-top: 80px !important;
  color: rgb(204, 197, 197);
}
.trackform-input {
  input {
    padding-right: 40px;
  }
  .form-btna {
    position: absolute;
    right: 10px;
    z-index: 5;
    padding: 4px;
    border: 1px solid #98a2b3;
    border-radius: 100%;
    font-size: 10px;
    background-color: #98a2b3;
    color: white;

    &:hover {
      background-color: #c0c8d4;
    }
  }
}
.active {
  background-color: $primary !important;
}

.search-btn {
  background-color: $gray;
  padding: 8px 24px;
}
.search-btn {
  font-size: 14px !important;
}

.filter-btn {
  background-color: $gray;
}
.text-xs {
  font-size: 0.85rem !important;
}
</style>
