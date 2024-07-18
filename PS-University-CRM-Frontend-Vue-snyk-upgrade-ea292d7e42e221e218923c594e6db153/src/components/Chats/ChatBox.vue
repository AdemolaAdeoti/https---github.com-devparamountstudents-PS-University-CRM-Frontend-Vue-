<template>
  <div class="card my-2" style="height: 600px">
    <SearchChatModel />
    <div class="card-body">
      <div class="col-sm-12">
        <div class="direct-chat direct-chat-primary">
          <div class="">
            <div class="row d-flex flex-row">
              <div class="col-1 ml-3" style="padding-left: 1px">
                <img
                  :src="require('/src/assets/images/d-img.svg')"
                  alt="logo"
                  width="60"
                />
              </div>
              <div class="col-sm-4 mx-3 my-2">
                <p
                  class="m-1 text-dark text-xl"
                  style="font-size: 16px !important"
                >
                  Seth Hallam
                </p>
                <span class="position-relative">
                  <span
                    class="badge position-absolute translate-custom-middle p-1 mt-2 bg-orange"
                  >
                    <span class="visually-hidden">hiddde </span>
                  </span>
                  <p class="m-1">online</p>
                </span>
              </div>
              <div class="text-secondary track-cell col-3 px-1"></div>
              <div class="col-1" style="padding-left: 1px">
                <i
                  @click="showForm()"
                  @click.stop.prevent
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  class="pi pi-search text-dark m-3 px-2 py-2 d-flex"
                >
                </i>
              </div>

              <div class="col-1 m-3 px-2 d-flex" style="position: relative">
                <i
                  @click="showDetails()"
                  style="position: absolute; z-index: 1"
                  class="pi pi-ellipsis-v view-track px-4 py-2"
                  :class="trackDetails ? '' : ''"
                >
                </i>
              </div>

              <Transition name="slide-fade">
                <div
                  v-if="trackDetails"
                  class="tracking-container"
                  style="position: absolute; z-index: 1"
                >
                  <ul class="px-3 text-end date">
                    <li
                      class="fw-light btn"
                      style="
                        background-color: white;
                        position: relative;
                        top: 45px;
                        right: 12%;
                      "
                    >
                      Block Msg
                    </li>
                  </ul>
                </div>
              </Transition>

              <hr class="mt-3" />
              <div class="row" v-for="chat in chats" :key="chat.id">
                <div class="col-1 py-1 px-1">
                  <img :src="chat.sender.imgURL" alt="sender dp" width="60" />
                </div>
                <div class="col-sm-5 px-3 py-3">
                  <h6 class="card-title text-truncate px-4 py-2 row mb-0">
                    <span class="text-dark col-6 px-2"
                      >{{ chat.sender.username }}
                      <span
                        class="pl-2"
                        style="
                          margin-left: 10px !important;
                          font-size: 12px !important;
                          border-bottom: 1px solid black;
                          width: 50px;
                        "
                        >{{ chat.sender.receivedTime }}</span
                      ></span
                    >
                  </h6>
                  <span class="text-truncate text-dark">
                    <p style="font-size: 12px !important ">
                      {{ chat.sender.body }}
                    </p>
                  </span>
                </div>
                <div class="text-secondary col-2 px-1 mb-4">
                  <button
                    class="btn btn-warning"
                    p
                    style="font-size: 36% !important"
                  >
                    {{ chat.sender.receivedDate }}
                  </button>
                </div>
              </div>

              <hr />
              <div class="col-1 py-1 px-1">
                <img
                  :src="require('/src/assets/images/d-img.svg')"
                  alt="logo"
                  width="60"
                />
              </div>
              <div class="col-sm-5 px-3 py-3">
                <h6 class="card-title text-truncate px-4 py-2 row mb-0">
                  <span class="text-dark col-6 px-2"
                    >Seth Hallam
                    <span
                      class="pl-2"
                      style="
                        margin-left: 10px !important;
                        font-size: 12px !important;
                        border-bottom: 1px solid black;
                        width: 50px;
                      "
                      >12:23pm</span
                    ></span
                  >
                </h6>
                <span class="text-truncate text-dark">
                  <p style="font-size: 12px !important ">
                    Hello i applied for the programme please let me know if you
                    required additional document
                  </p>
                </span>
              </div>
              <div class="text-secondary col-2 px-1 mb-4">
                <button
                  class="btn btn-warning"
                  p
                  style="font-size: 36% !important"
                >
                  Today
                </button>
              </div>
              <div class="col-1 px-4">
                <div class="col-2 m-3 px-2 d-flex" style="padding-left: 10px">
                  <i
                    @click="showDetails2()"
                    class="pi pi-ellipsis-h view-track px-4 py-2"
                    :class="trackDetails ? '' : ''"
                  >
                  </i>
                </div>
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

          <div></div>
        </div>
      </div>
    </div>
    <section style="background-color: rgb(87, 86, 86)">
      <div class="texteditor row">
        <div class="col-2 paperclip">
          <PaperclipIcon />
        </div>
        <div
          class="col-8"
          style="
            background-color: rgb(230, 221, 221);
            border-radius: 10px !important;
          "
        >
          <Editor v-model="value" editorStyle="height: 120px">
            <template #toolbar>
              <span class="ql-formats">
                <button class="ql-bold"></button>
                <button class="ql-italic"></button>
                <button class="ql-underline"></button>
                <button class="ql-strike"></button>
                <button class="ql-link"></button>
              </span>
            </template>
          </Editor>
        </div>
        <div class="col-2 sendicon">
          <!-- <button style="background-color: none; outline: none; border: none;">
                Send <SendIcon fillColor="#515151" />
               </button> -->
          Send <SendIcon fillColor="#515151" />
        </div>
      </div>
    </section>
    <div class="student-app px-4 mb-5 mx-auto position-relative">
      <!-- <div v-for="(student, index) in Student" :key="index"> -->
      <template v-if="showSearch && trackForm">
        <TrackingResults :searchItem="filteredData" />
      </template>

      <!-- </div> -->
    </div>
  </div>
</template>

<script>
import SendIcon from "vue-material-design-icons/Send.vue";
import PaperclipIcon from "vue-material-design-icons/Paperclip.vue";
import "@vueup/vue-quill/dist/vue-quill.snow.css";

import Editor from "primevue/editor";
import TrackingResults from "@/components/StudentsTrack/TrackingResults.vue";
import { Students } from "@/data";
import SearchChatModel from "/src/components/Chats/SearchChatModel.vue";
import { Chats } from "@/data";
export default {
  data() {
    return {
      trackDetails: false,
      trackDetails2: false,
      trackForm: false,
      selectedStatus: null,
      trackingStatus: ["No Apply", "Applying", "Got Admissions"],
      firstName: "",
      lastName: "",
      emailAddr: "",
      showSearch: false,

      chats: Chats,
      students: Students,
      student: [
        {
          status: "online",
        },
      ],
    };
  },
  components: {
    SendIcon,
    PaperclipIcon,
    Editor,
    TrackingResults,
    SearchChatModel,
  },
  computed: {
    getIcon() {
      return this.student.status === "offline"
        ? "red"
        : this.student.status == "online"
        ? "#66C61C"
        : "rgb(74, 184, 40)";
    },
  },
  methods: {
    showDetails() {
      console.log(this.trackDetails);
      this.trackDetails = !this.trackDetails;
    },
    showDetails2() {
      console.log(this.trackDetails2);
      this.trackDetails2 = !this.trackDetails2;
    },
    showForm() {
      this.trackForm = !this.trackForm;
    },
  },
  // data () {
  //   return {
  //     services: [
  //       {
  //         title: 'Block Msg',
  //         link: '#'
  //       },

  //     ]
  //   }
  // },
  // props: {
  //   modelValue: { type: String, default: 'text' },
  //   defaultValue: "",
  // },
  // data() {
  //   return {
  //     services: [
  //        {
  //          title: 'Block Msg',
  //          link: '#'
  //        },

  //      ],
  //     editor: null,
  //   };
  // },
  // mounted() {
  //   var _this = this;

  //   this.editor = new Quill(this.$refs.editor, {
  //     modules: {
  //       toolbar: [
  //         // [{ header: [1, 2, 3, 4, false]} ],
  //         ["bold", "italic", "underline", "strike", ],
  //         [{ 'list': 'ordered'}, { 'list': 'bullet' }],

  //       ],
  //     },
  //     theme: "snow",
  //     formats: ["bold", "underline", "header", "italic", "link"],
  //     placeholder: this.placeholder
  //   });
  //   this.editor.root.innerHTML = this.defaultValue;
  //   this.editor.on("text-change", function () {
  //     return _this.update();
  //   });
  // },
  // methods: {
  //   update: function update() {
  //     this.$emit(
  //         "update:modelValue",
  //         this.editor.getText() ? this.editor.root.innerHTML : ""
  //     );
  //   },
  // }
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
