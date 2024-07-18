<template>
  <div>
    <p>Replies</p>
    <ul class="ms-3">
      <li v-if="ticket?.length == 0">No reply</li>
      <li class="mb-2 ps-2 d-flex" style="height:24px;" v-for="(reply, index) in ticket" :key="index">
        <b style="border-left:2px solid green;" class="ps-2" v-if="reply.user_type == 'admin'">Support:</b>
        <b style="border-left:2px solid orange;" class="ps-2" v-else>You:</b>
        <p v-html="reply?.message"></p>
      </li>
    </ul>
    <div class="d-flex flex-row-reverse">
      <button type="button" class="btn btn-warning btn-lg" :style="{ 'visibility': showReplyButton }" v-if="!showReplyForm"
        @click="showReply()">
        Reply
      </button>
    </div>
    <form class="d-flex" v-if="showReplyForm" @submit.prevent="submitReply()">
      <Editor placeholder="Tell us a little about the issue" v-model="message" editorStyle="height: 200px; width:100% "
        id="reply" />
      <button type="submit" class="btn btn-warning btn-lg ms-3 align-self-end">
        Submit
      </button>
    </form>
  </div>
</template>

<script>
import { post } from "@/api/client";
import Editor from "primevue/editor";

export default {
  props: ["replies", "ticket_id", "showReplyButton"],
  components: {
    Editor,
  },
  data() {
    return {
      showReplyForm: false,
      message: "",
      ticket: this.replies
    };
  },
  methods: {
    showReply() {
      this.showReplyForm = true;
    },
    async submitReply() {
      let res = await post("tickets/ticket/replies", {
        ticket_id: this.ticket_id,
        message: this.message,
        user_type: "user",
      });
      if (res?.message) {
        this.ticket.push({
          ticket_id: this.ticket_id,
          message: this.message,
          user_type: "user",
        })
        this.message = "";
        this.showReplyForm = false;
      }
    },
  },
};
</script>
<style lang=""></style>