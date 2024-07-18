<template lang="html">
  <div>
    <h2 class="text-center mb-5">Frequently Asked Questions</h2>
    <div class="faq-container mx-auto w-80">
      <SkeletalLoader v-show="faqsLoading" />
      <div v-for="(faq, index) in faqs" :key="index" class="position-relative">
        <h3 class="d-flex justify-content-between inactiveFAQ" @click="openFaq($event)">
          <span>{{ faq?.question }}</span>
        </h3>
        <p class="p-3 inactiveFAQ" v-html="convertYouTubeLinksToEmbedded(faq?.answer)" ></p>
      </div>
    </div>
    <h2 class="text-center mb-2 mt-5">
      <span lang="en" class="notranslate" translate="no"> Paramount Students </span> help guide in videos
    </h2>
    <div class="text-center mb-5">
      <a href="https://docs.google.com/document/d/1xFCO2X-b7r-NT4PV42Q6gndEIIzjFpXcmFj-ViJqYfE/edit?usp=sharing" target="_blank">
        View Frequently Asked Questions Document
      </a>
    </div>
    <div class="help-videos-container position-relative">
      <div class="help-videos mb-3">
        <SkeletalLoader v-show="guidesLoading" />
        <div v-for="(guide, index) in help_guides" :key="index">
          <div class="videoContainer help-video" v-if="isVideoUrl(guide.link)">
            <video :src="guide.link" width="250" height="130" controls></video>
          </div>
          <div class="videoContainer help-video" v-else-if="isYouTubeUrl(guide.link)">
            <iframe width="250" height="130" src="https://www.youtube.com/embed/FRW_cuCNMGg" frameborder="0" allowfullscreen></iframe>
          </div>
          <div class="videoContainer help-video" v-else-if="isImageUrl(guide.link)">
            <img :src="guide.link" width="250" height="130" />
          </div>
          <h3>{{ guide.title }}</h3>
        </div>
      </div>
    </div>
    <div class="tech-form-container">
      <h3 class="text-center">
        <span lang="en" class="notranslate" translate="no">
          Paramount Students
        </span>
        Technical Service Center
      </h3>
      <p class="text-center pt-4">
        You can reach us anytime via
        <a href="mailto: support@paramountstudents.com" lang="en" class="notranslate" translate="no">
          support@paramountstudents.com</a>
      </p>
      <div class="ps-5 border-bottom w-100 d-flex align-items-center">
        <div @click="currentTab = 1" :class="{ 'tabs p-3': true, activeTab: currentTab === 1 }">
          Create Ticket
        </div>
        <div @click="currentTab = 2" :class="{ 'tabs p-3': true, activeTab: currentTab === 2 }">
          Opened Tickets
        </div>
        <div @click="currentTab = 3" :class="{ 'tabs p-3': true, activeTab: currentTab === 3 }">
          Closed Tickets
        </div>
      </div>
      <div v-show="currentTab === 1" style="height: 500px">
        <form @submit.prevent="submitForm()" class="tech-service-form">
          <div class="d-flex flex-column">
            <label for="subject"><span class="label-txt">Subject</span></label>
            <input type="text" v-model="form.subject" name="subject" id="subject"
              placeholder="Please write your subject of issue" />
          </div>
          <div class="d-flex flex-column">
            <label for="description"><span class="label-txt">Category</span></label>
            <select v-model="form.ticket_category_id" class="form-select form-select-lg"
              aria-label=".form-select-lg example">
              <option disabled>Open this select menu</option>
              <option v-for="option in options" :value="option.id" :key="option.id">
                {{ option.name }}
              </option>
            </select>
          </div>
          <div class="d-flex flex-column">
            <label for="description"><span class="label-txt">How can we help you?</span></label>
           <Editor placeholder="Tell us a little about the issue" v-model="form.description"
                editorStyle="height: 230px; width:100% " />
          </div>
          <div class="d-flex justify-content-between pt-2">
            <button :disabled="disableSubmit" id="submit" :style="submittingStyle">
              Submit{{ submitting ? "ting" : "" }}
            </button>
          </div>
        </form>
      </div>
      <div v-show="currentTab === 2" style="height: 500px" class="accordion mx-auto overflow-auto"
        id="accordionOpenTicket">
        <h4 v-if="openTickets.length == 0" class="mx-auto mt-4" style="width: fit-content">
          You don`t have any open ticket.
        </h4>
        <div v-else v-for="ticket in openTickets" :key="ticket.id" class="accordion-item">
          <h2 class="accordion-header" :id="'headingOne_' + ticket.id">
            <button class="accordion-button" type="button" data-bs-toggle="collapse"
              :data-bs-target="'#collapseOne_' + ticket.id" aria-expanded="true" aria-controls="collapseOne">
              Subject:: {{ ticket.subject }}
            </button>
          </h2>
          <div :id="'collapseOne_' + ticket.id" class="accordion-collapse collapse"
            :aria-labelledby="'headingOne_' + ticket.id" data-bs-parent="#accordionOpenTicket">
            <div class="accordion-body">
              <div class="d-flex flex-row justify-content-between">
                <div>
                  <b class="mt-2">Issue:</b>
                  <p class="mb-3"  v-html="ticket.description"></p>
                </div>
                <button type="button" @click="updateTicketStatus(ticket.id, 'closed')"
                  class="btn btn-success align-self-start" style="background-color: #1d2939">
                  Resolved
                </button>
              </div>
              <ReplyTicket :ticket_id="ticket.id" :replies="ticket.replies" showReplyButton="visible" />
            </div>
          </div>
        </div>
      </div>
      <div v-show="currentTab === 3" style="height: 500px" class="accordion mx-auto overflow-auto"
        id="accordionClosedTicket">
        <div class="accordion mx-auto" id="accordionExample3">
          <h4 v-if="closedTickets.length == 0" class="mx-auto mt-4" style="width: fit-content">
            You don`t have any closed ticket.
          </h4>
          <div v-else v-for="ticket in closedTickets" :key="ticket.id" class="accordion-item">
            <h2 class="accordion-header" :id="'headingOne_' + ticket.id">
              <button class="accordion-button" type="button" data-bs-toggle="collapse"
                :data-bs-target="'#collapseOne_' + ticket.id" aria-expanded="true"
                :aria-controls="'collapseOne' + ticket.id">
                Subject:: {{ ticket.subject }}
              </button>
            </h2>
            <div :id="'collapseOne_' + ticket.id" class="accordion-collapse collapse"
              :aria-labelledby="'headingOne_' + ticket.id" data-bs-parent="#accordionClosedTicket">
              <div class="accordion-body">
                <div class="d-flex flex-row justify-content-between">
                  <div>
                    <b class="mt-2">Issue:</b>
                    <p class="mb-3" v-html="ticket.description"></p>
                  </div>
                  <button type="button" @click="updateTicketStatus(ticket.id, 'open')"
                    class="btn btn-success align-self-start" style="background-color: #1d2939">
                    Reopen
                  </button>
                </div>
                <ReplyTicket :ticket_id="ticket.id" :replies="ticket.replies" showReplyButton="hidden" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="live-chat-container text-end">
      <button id="live-chat" @click="navigateToChatDetails()">
        <img :src="require(`/src/assets/images/message-square.png`)" alt="" />
        Live Chat With Us
      </button>
    </div>
    <ResendModal :head="modalProps.heading" :subText="modalProps.response" :img="modalProps.image" />
  </div> <!-- Added closing tag here -->
</template>
<script>
import ReplyTicket from "@/components/ReplyTicket.vue";
import ResendModal from "@/components/Global/ResendModal.vue";

import { useAuthStore } from "@/stores/auth";
import { get, post, postFormData } from "@/api/client";
import SkeletalLoader from "@/components/Global/SkeletalLoader.vue";
import jquery from "jquery";
const $ = jquery;
import Editor from "primevue/editor";
export default {
  name: "HelpAndSupport",
  data() {
    return {
      questions: [],
      currentId: 1,
      animate: true,
      attachedFileName: "",
      submitting: false,
      submittingStyle: {},
      modalProps: {
        response:
          "We'll get back to you within 24 hours. Thank you so much for getting in touch with us",
        image: "sent-success-icon.svg",
        heading: "request sent",
      },
      form: {
        subject: "",
        description: "",
        ticket_category_id: "",
      },
      options: [],
      openTickets: [],
      closedTickets: [],
      currentTab: 1,
      fetchInterval: null,
      faqs: [],
      help_guides: [],
      guidesLoading: true,
      faqsLoading: true,
    };
  },
  methods: {
    navigateToChatDetails() {
      localStorage.setItem('chatInfo', JSON.stringify(
        { "sender_email": '', "user_type": "admin", "sender_id": 1, "total_unread": "0", "message": "", "is_read": 1, "created_at": "", "profile_photo_url": '', "full_name": 'Paramount Students', "receiver_type": null, "sender_type": null, "time_at": "" }
      ))
      this.$router.push({
        name: 'ChatDetails',
      });
    },
    convertYouTubeLinksToEmbedded(text) {
      const youtubeRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w\\-]+)(?:\S+)?/g;
      return text.replace(youtubeRegex, (match, videoId) => {
        return `<div style="display: flex; justify-content: center;"><iframe width="260" height="155" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe></div>`;
      });
    },
    isYouTubeUrl(url) {
      const youtubeRegex =
        /^(https?:\/\/)?(www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/;
      return youtubeRegex.test(url);
    },
    embedYouTubeUrl(url) {
      const videoId = this.getYouTubeVideoId(url);
      return `https://www.youtube.com/embed/${videoId}`;
    },
    getYouTubeVideoId(url) {
      const youtubeRegex =
        /^(https?:\/\/)?(www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/;
      const match = url.match(youtubeRegex);
      if (match && match[3]) {
        return match[3];
      }
      return "";
    },
    isVideoUrl(url) {
      const videoExtensions = [".mp4", ".avi", ".mov", ".wmv"];
      const extension = url.substr(url.lastIndexOf(".")).toLowerCase();
      return videoExtensions.includes(extension);
    },
    isImageUrl(url) {
      const imageExtensions = [".jpg", ".jpeg", ".png", ".gif"];
      const extension = url.substr(url.lastIndexOf(".")).toLowerCase();
      return imageExtensions.includes(extension);
    },
    async submitForm() {
      const authStore = useAuthStore();
      if (!this.submitting) {
        let params = {
          platform: "university",
          ticket_category_id: `${this.form.ticket_category_id}`,
          subject: this.form.subject,
          description: this.form.description,
          status: "open",
          email: authStore.$state.userInfo.email,
          full_name: `${authStore.$state.userInfo.first_name} ${authStore.$state.userInfo.last_name}`,
          phone_number: authStore.$state.userInfo.phone,
          user_id: `${authStore.$state.userInfo.id}`,
        };
        await post("tickets", params);

        this.submitting = true;
        this.submittingStyle = { opacity: 0.5, cursor: "no-drop" };
        // eslint-disable-next-line no-undef
        var myModal = new Modal(document.getElementById("staticBackdrop"), {
          keyboard: false,
        });

        this.form.description = "";
        this.form.ticket_category_id = "";
        this.form.subject = "";

        myModal.show();

        this.openTickets = await this.fetchTickets("open");

        this.submitting = false;
        this.submittingStyle = {};
      }
    },
    async updateTicketStatus(ticket_id, status) {
      await post("tickets/update_status", { ticket_id, status });
      this.openTickets = await this.fetchTickets("open");
      this.closedTickets = await this.fetchTickets("closed");
    },
    async fetchTickets(status) {
      const authStore = useAuthStore();
      let a = await get(
        `tickets/${authStore.$state.userInfo.id} /university/${status}`
      );
      return a.message.data;
    },
    async attachFile(e) {
      let file = e.target.files[0];
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder_name", "TicketsFiles");
      const res = await postFormData("file_upload", formData);

      let url = `<img src="${res?.responseBody}" width="100px" height="90px" >`;
      this.form.description = this.form.description + url;
    },
    openFaq(e) {
      let elt = $(e.target);
      elt.next().slideToggle();
      elt.next().toggleClass(" inactiveFAQ ");
      elt.toggleClass(" activeFAQ ");
      elt.toggleClass(" inactiveFAQ ");
    },
    home() {
      this.$router.push("/");
    },
  },
  components: { ResendModal, ReplyTicket, SkeletalLoader, Editor },
  computed: {
    disableSubmit() {
      if (
        !this.form.subject ||
        !this.form.ticket_category_id ||
        !this.form.description
      )
        return true;
      return false;
    },
  },
  async beforeCreate() {
    let a = await get("api/tickets_categories", false);
    this.options = a.message;
    this.openTickets = await this.fetchTickets("open");
    this.closedTickets = await this.fetchTickets("closed");
    a = await get("faqs/university");
    this.faqs = a.message;
    this.faqsLoading = false;
    a = await get("help_guides/university");
    this.help_guides = a.message;
    this.guidesLoading = false;
  },
  mounted() {
    this.fetchInterval = setInterval(async () => {
      this.openTickets = await this.fetchTickets("open");
    }, 60000);
  },
  beforeUnmount() {
    clearInterval(this.fetchInterval);
  },
};
</script>
<style lang="scss">
$text-color: #1d2939;

p,
h1,
h2,
h3,
h4,
h5,
h6 {
  color: $text-color;
}

// sass mixins
@mixin button-style {
  padding: 0.6rem 0rem;
  border-radius: 0.5rem;
  border: none;
  font-weight: bold;
  width: 200px;
  //width: 274px;
}

.videoContainer {
  position: relative;
  text-align: center;
  color: white;
}

.videoContainer>img:first-child {
  opacity: 0.6;
}

.centered {
  position: absolute;
  top: 50%;
  left: 50%;
  transition: transform 2s, filter 1.5s ease-in-out;
  transform: translate(-50%, -50%) scale(0.9);
}

.hoverable:hover {
  filter: grayscale(0);
  transform: translate(-50%, -50%) scale(1.1);
  cursor: pointer;
}

.timer {
  position: absolute;
  bottom: 0px;
  right: 16px;
  font-size: 12px !important;
  color: rgb(32, 32, 32);
}

.videoContainer {
  position: relative;
  text-align: center;
  color: white;
}

.videoContainer>img:first-child {
  opacity: 0.6;
}

.centered {
  position: absolute;
  top: 50%;
  left: 50%;
  transition: transform 2s, filter 1.5s ease-in-out;
  transform: translate(-50%, -50%) scale(0.9);
}

.hoverable:hover {
  filter: grayscale(0);
  transform: translate(-50%, -50%) scale(1.1);
  cursor: pointer;
}

.timer {
  position: absolute;
  bottom: 0px;
  right: 16px;
  font-size: 12px !important;
  color: rgb(32, 32, 32);
}

// conditional classes
.activeArrow {
  transform: rotate(-90deg);
}

.activeFAQ {
  opacity: 1;
  font-weight: 600;
  border: 1px solid #1d2939;
  border-left: 3px solid black;
}

.inactiveFAQ {
  border: solid gray;
  border-width: 1px 1px 0 1px;
  display: none;
}

div.faq-container {
  & h3 {
    // border: 1px solid gray;
    cursor: pointer;
    font-size: 1rem;
    padding: 1.2rem;
    margin: 0%;
    opacity: 0.75;
    color: #1d2939;

    &:hover {
      background-color: #fff;
      font-weight: bold;
    }

    span {
      transition: background-color 2s, transform 2s;
      display: inline-block;

      img {
        transition: transform 1s;
      }
    }
  }

  //apply borther width to the last element
  & div:last-child {
    h3 {
      border-width: 1px;
    }
  }
}

div.help-videos-container {
  padding: 0 0 0 2rem;

  ::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    border-bottom: 1px solid #f79009;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #f79009;
    border: 1px solid #f79009;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #f79009;
  }

  h3 {
    margin: 5rem 0rem 0rem;
  }

  .help-videos {
    width: 100%;
    display: flex;
    overflow-y: auto;
    flex-wrap: nowrap;
    margin-top: 2rem;
    margin-bottom: 1rem;

    &>div {
      // border: 1px solid rgb(214, 207, 207);
      // padding: 1rem;
      margin: 2rem 1rem;
      flex-grow: 2;

      div {
        border: 1px solid gray;
        padding: 1rem;
        width: 281px;
        height: 181px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #c4c4c4;
      }

      h3 {
        font-size: 1.3rem;
        font-weight: 500;
        margin-top: 1rem;
        color: #101828;
      }
    }
  }
}

div.tech-form-container {
  padding: 4rem 2rem 2rem;

  form {
    ::placeholder {
      color: #98a2b3;
      opacity: 1;
      /* Firefox */
    }

    :-ms-input-placeholder {
      /* Internet Explorer 10-11 */
      color: #98a2b3;
    }

    ::-ms-input-placeholder {
      /* Microsoft Edge */
      color: #98a2b3;
    }

    .label-txt {
      color: #1d2939;
      font-size: 14px;
    }

    &>div {
      margin: 1rem 0rem;

      label {
        padding: 0.5rem 0rem;
      }

      .remove-file {
        padding: 0.25rem;
        border: 1px solid red;
        border-radius: 0.5rem;
        font-size: 0.8rem;

        &:hover {
          cursor: pointer;
          background-color: red;
          color: white;
        }
      }

      #subject,
      #issue-description {
        padding: 0.7rem;
        border: 1px solid #d0d5dd;
      }

      button {
        @include button-style();

        &#attach-file {
          background-color: #eaecf0;
          border: 1px solid#C3B5FD;

          &:hover {
            background-color: #a89bdb;
          }

          img {
            padding-left: 0.5rem;
          }
        }

        &#submit {
          background-color: #fac515;
          font-weight: 500;

          &:hover {
            background-color: #c49a10;
          }
        }
      }
    }
  }
}

div.live-chat-container {
  padding: 2rem;

  button {
    @include button-style();
    background: #85e13a;

    &:hover {
      background-color: #5a9727;
    }
  }
}

.reply-input {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
  outline: none;
  border: 2px solid grey;
  border-image: linear-gradient(to right, #fac415 0%, #fac415 100%) 1;
  border-width: 0px 0px 2px 0px;
}

.tabs {
  cursor: pointer;
  border-bottom: 4px solid transparent;
  color: rgb(29, 41, 57);
  transition: all 0.5s;
}

.tabs:hover {
  color: rgba(99, 65, 2, 0.874);
}

.activeTab {
  background-color: rgba(231, 197, 157, 0.365) a(255, 217, 0, 0.365) (255, 217, 0);
  border-bottom: 4px solid orange;
  color: orange;
}
</style>
