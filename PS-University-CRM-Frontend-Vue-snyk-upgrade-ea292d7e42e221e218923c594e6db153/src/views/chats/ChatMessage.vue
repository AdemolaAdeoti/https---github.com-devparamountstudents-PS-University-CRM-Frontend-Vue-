<template>
  <div class="row w-100 mx-auto">
    <!-- <div class="container-fluid h-100 p-0" style="background-color: aqua"> -->
    <div class="">
      <div class="col-12 mb-2 d-flex justify-content-between">
        <div>
          <h3 class="fw-bold display">{{ chatsTitle }}</h3>
        </div>
        <div class="col-8">
          <div class="input-group">
            <div class="w-100">
              <span type="button" id="basic-addon1" style="" class="position-relative p-input-icon-left w-100">
                <img style="width: 1.5rem" class="position-absolute mx-2 top-0 my-auto bottom-0"
                  :src="require(`/src/assets/images/search_icon.png`)" alt="" />
                <InputText aria-label="Search" aria-describedby="basic-addon1" v-model.trim="search" type="text"
                  placeholder="Search" />
              </span>
            </div>
          </div>
        </div>
        <div class="position-relative">
          <i style="cursor: pointer" class="pi pi-bars fs-4" @click="showDetails1()"></i>
          <Sidebar style="
              height: 80vh;
              align-self: flex-end;
              border-radius: 10px;
              align-items: flex-start;
            " position="right" v-model:visible="trackDetails1" class="p-sidebar-sm" :show-close-icon="true">
            <ul class="d-flex flex-column w-100" style="background-color: sea">
              <router-link to="/chats/newmessage" @click="showDetails1()" style="
                  font-size: 18px !important;
                  display: flex;
                  justify-content: flex-start;
                  align-items: center;
                " class="fw-light btn">
                <i class="mx-4 pi pi-pencil"></i>
                Create New Messages
              </router-link>
              <router-link to="/chats" @click="showDetails1()" style="
                  font-size: 18px !important;
                  display: flex;
                  justify-content: flex-start;
                  align-items: center;
                " class="fw-light btn">
                <i class="mx-4 pi pi-comments"></i>
                All Messages
              </router-link>
              <router-link to="/chats/inbox#favourites" @click="showDetails1()" style="
                  font-size: 18px !important;
                  display: flex;
                  justify-content: flex-start;
                  align-items: center;
                " class="fw-light btn">
                <i class="mx-4 pi pi-star"></i>
                Favourite Messages
              </router-link>
              <router-link to="/chats/inbox#archived" @click="showDetails1()" style="
                  font-size: 18px !important;
                  display: flex;
                  justify-content: flex-start;
                  align-items: flex-start;
                " class="fw-light btn">
                <i class="mx-4 pi pi-bookmark"></i>
                Archived Messages
              </router-link>
              <router-link to="/chats/inbox/#unread" @click="showDetails1()" style="
                  font-size: 18px !important;
                  display: flex;
                  justify-content: flex-start;
                  align-items: center;
                " class="fw-light btn">
                <i class="mx-4 pi pi-envelope"></i>
                Unread Messages
              </router-link>
            </ul>
          </Sidebar>
        </div>
      </div>
    </div>
    <hr class="mt-1" />
    <div v-for="(chat, i) in filteredChats" :key="i">
      <a href="#"  style="margin-bottom: 1rem; height: 75px; color: unset"
        class="d-flex w-100 align-items-center chatListItem filterable">
        <div class="w-100">
          <!-- Message Options -->
          <div name="slide-fade">
            <div v-if="trackDetails2 === chat.sender_id+i" style="position: absolute; z-index: 1; right: 0">
              <ul class="tracking-container" style="border-radius: 5px;border: 0.5px solid #8a8d93;background-color: #ffff;width: fit-content;display: flex;flex-direction: column;text-align: left;position: relative;box-shadow: 0px 4px 8px 0px #00000040;right: 55px;bottom: 30px;">
                <li class="fw-light btn" style="width: fit-content; font-size: 12px; color: #4d5056">
                  <svg-icon style="margin-right: 10px" type="mdi" :path="deleteIconPath"></svg-icon>
                  Delete
                </li>
                <li class="fw-light btn" style="width: fit-content; font-size: 12px; color: #4d5056">
                  <svg-icon style="margin-right: 10px" type="mdi" :path="unreadIconPath"></svg-icon>

                  Unread
                </li>
                <li class="fw-light btn" style="width: fit-content; font-size: 12px; color: #4d5056">
                  <svg-icon style="margin-right: 10px" type="mdi" :path="archiveIconPath"></svg-icon>
                  Archive
                </li>
              </ul>
            </div>
          </div>
          <!-- Message Options -->
          <div class="align-items-center d-flex justify-content-between align-items-center">
            <div @click="navigateToChatDetails(chat)"  class=" position-relative">
              <img style="width: 50px; height: 50px; border-radius: 50px" class="" :src="chat.photo_url
                  ? chat.photo_url
                  : require('@/assets/images/users-and-roles/user1.svg')
                " alt="" />
              <span style="
                position: absolute;
                top: -5px;
                right: -5px;
                width: 10px;
                height: 10px;
                border-radius: 50%;
                background-color: {{ chat?.isOnline ? 'green' : 'grey' }};"></span>
            </div>            
              <div @click="navigateToChatDetails(chat)"  class="align-items-center d-flex ms-4" style="flex: auto;">
                <div class="row">
                  <div class="text-secondary  p-0" style="white-space: nowrap;">
                    <span style="color: #1d2939; font-weight: 600; font-sizie: 20px" class="text-dark">
                      {{ chat.full_name ||chat.name }} ({{
                        chat.user_type == "user" ? "student" : chat.user_type
                      }})
                      <!-- <span>{{
                        splittedUserName(chat.full_name).before
                      }}</span>
                      <span class="text-warning">{{
                        splittedUserName(chat.full_name).matched
                      }}</span>
                      <span>{{
                        splittedUserName(chat.full_name).after
                      }}</span> -->
                    </span>
                    <p style="color: #546075" v-html="chat.message" class="text-dark mb-0"></p>
                  </div>
                </div>
              </div>            
              <div style="display: flex;flex-basis: min-content;" class="text-secondary p-0 track-cell col-2">
                <div class="d-flex justify-content-between me-3">
                  <span style="margin-right: 5px">{{formatDateTime(chat.created_at)}}</span>
                  <!-- @click="chat.is_fav = !chat?.isFav" -->
                  <i style="cursor: pointer" :class="chat?.isFav
                        ? 'pi pi-star-fill text-warning fs-6'
                        : 'pi pi-star fs-6'
                      "></i>
                </div>
                <i @click="showDetails2(chat.sender_id+i)" class="pi pi-ellipsis-v fs-6"
                  style="width: fit-content; cursor: pointer"></i>
              </div>
          </div>
        </div>
      </a>
      <div style="background:#bbb;height:1px; width:100%;"></div>
    </div>
  </div>
</template>

<script>
import InputText from "primevue/inputtext";
import Sidebar from "primevue/sidebar";
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiEmailMarkAsUnread, mdiPackageDown, mdiDelete } from "@mdi/js";
import { get } from "@/api/client";
export default {
  name: "ChatsMessage",
  data() {
    return {
      search: "",

      chats: [],
      trackDetails2: false,
      trackDetails1: false,
      unreadIconPath: mdiEmailMarkAsUnread,
      archiveIconPath: mdiPackageDown,
      deleteIconPath: mdiDelete,
    };
  },
  mounted() {
     this.showChats();
  },
  watch: {
    '$globals.chats': function (newChats, oldChats) {            
      this.chats = newChats
      this.initContact(this.chats)  
     // console.log(this.userType,this.chats, 555)
      oldChats      
    }
  },
  components: { InputText, Sidebar, SvgIcon },
  async created() {
    this.initContact
    this.chats = this.$globals.chats    
  },
  methods: {
    initContact(chats){           
      chats.forEach((chat)=>{
        window.Echo.join(`go-online.${chat.user_type}-${chat.sender_id}`)    
      })   
    },
    navigateToChatDetails(chat) {
      localStorage.setItem("chatInfo", JSON.stringify(chat));
      localStorage.setItem("chats", JSON.stringify(this.filteredChats));
      this.$router.push({
        name: "ChatDetails",
      });
    },
    filter(e) {
      var input = e.target;
      var filter = input.value.toLowerCase();
      var nodes = document.querySelectorAll(".filterable");

      for (let i = 0; i < nodes.length; i++) {
        console.log(nodes[i].innerText.toLowerCase().includes(filter));
        if (nodes[i].innerText.toLowerCase().includes(filter)) {
          nodes[i].style.display = "flex";
          nodes[i].style.setProperty("display", "flex", "important");
        } else {
          nodes[i].style.display = "none";
          nodes[i].style.setProperty("display", "none", "important");
        }
      }
    },
    formatDateTime(dateTimeStr) {
      if (!dateTimeStr) {
        return "Empty";
      }
      const dateObj = new Date(dateTimeStr);
      const today = new Date(); // Current date

      // Check if the date has passed today
      if (dateObj.toDateString() === today.toDateString()) {
        let hours = dateObj.getHours();
        let minutes = dateObj.getMinutes();
        let period = "AM";

        // Convert hours to 12-hour format and determine AM/PM
        if (hours >= 12) {
          period = "PM";
          if (hours > 12) {
            hours -= 12;
          }
        }

        // Pad single-digit minutes with a leading zero
        if (minutes < 10) {
          minutes = "0" + minutes;
        }

        return hours + ":" + minutes + " " + period;
      } else {
        // Return the full date in "DD/MM/YYYY" format
        const day = dateObj.getDate();
        const month = dateObj.getMonth() + 1;
        const year = dateObj.getFullYear();
        return day + "/" + month + "/" + year;
      }
    },

    showDetails2(id) {
      if (this.trackDetails2 === id) {
        this.trackDetails2 = "";
      } else {
        this.trackDetails2 = id;
        setTimeout(() => {
          this.trackDetails2 = "";
        }, 3000);
      }
    },
    showDetails1() {
      console.log(this.trackDetails1);
      this.trackDetails1 = !this.trackDetails1;
    },
    splittedUserName(userName) {
      if (this.search.length > 0) {
        let index = userName
          .toLowerCase()
          .lastIndexOf(this.search.toLowerCase());
        console.log(index);
        let name = userName.split("");
        let before = index <= 0 ? "" : name.slice(0, index).join("");
        let after = name.slice(index + this.search.length).join("");
        console.log(
          "before: " + before + ", search: " + this.search + ", after: " + after
        );
        return { before: before, matched: this.search, after: after };
      }
      return { before: userName };
    },
    async showChats() {
      const chats = await get("chat", true);
      this.chats = chats.message.chats
    },
  },
  computed: {
    filteredChats() {
      if (this.search.trim().length > 0) {
        return this.chats.filter((res) =>
          res.sender_email.toLowerCase().includes(this.search.toLowerCase())
        );
      }
      if (this.$route.fullPath == "/chats/inbox#unread") {
        return this.chats.filter((res) => res.isRead == true);
      }
      if (this.$route.fullPath == "/chats/inbox#archived") {
        return this.chats.filter((res) => res.isArchived == true);
      }
      if (this.$route.fullPath == "/chats/inbox#favourites") {
        return this.chats.filter((res) => res.isFav == true);
      }

      return this.chats;
    },
    chatsTitle() {
      if (this.$route.hash === "#archived") {
        return "Archived";
      }
      if (this.$route.hash === "#favourites") {
        return "Favourites";
      }
      if (this.$route.hash === "#unread") {
        return "Unread";
      }
      return "Chats";
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

.p-sidebar-sm li:hover {
  background-color: rgba(16, 24, 40, 0);
}

.p-inputtext {
  width: 100%;
  background-color: #e7e6e8 !important;
  text-align: center;
  outline: none !important;
  border: none !important;
}

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
