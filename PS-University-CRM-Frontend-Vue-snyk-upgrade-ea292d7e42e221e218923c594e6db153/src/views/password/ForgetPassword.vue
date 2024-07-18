<template lang="">
  <div class="container">
    <ModalSuccessfull
      @close-modal="closeModal"
      :head="otpVerify.head"
      :img="otpVerify.img"
      :subText="otpVerify.subText"
      :url="otpVerify.url"
      :click="otpVerify.click"
      :hasRequestSent="hasRequestSent"
    />
    <div class="dflex justify-content-between">
      <div></div>
      <div>
        <v-GoogleTranslateSelect default-language-code="en" default-page-language-code="en"
        :fetch-browser-language="false" trigger="click" @select="handleGoogleTranslateSelect" />           
      </div>
    </div>
    <div class="forgot-password">
      <div class="col-lg-6 mx-auto">
        <div class="mx-auto py-3 text-center">
          <img
            :src="require('/src/assets/images/mailbox-icon.svg')"
            alt=""
            srcset=""
          />
        </div>
        <div class="col-lg-10 mx-auto text-center">
          <h2>Forgot Password?</h2>
          <p>
            Confirm the email address that you provided in your registration :
            n***@****.com
          </p>
        </div>
        <form class="row g-3 pt-3 position-relative justify-content-center">
          <div class="col-md-7">
            <label for="inputEmail4" class="form-label">Email ID</label>
            <input
              type="text"
              class="form-control p-2"
              id="userId"
              v-model="userEmail"
              placeholder="Please enter Email ID"
            />
          </div>

          <div class="col-7 pt-4">
            <button
              type="button"
              @click="renderModal"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              class="btn primary-btn col-12 py-2 px-5"
              id="btn"
            >
              Send
            </button>
          </div>
          <h6 @click="home()" class="cursor text-center mt-5">
            <span class="px-2"
              ><img :src="require('/src/assets/images/arrow-left.svg')" alt=""
            /></span>
            Back to log in
          </h6>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import ModalSuccessfull from "/src/components/Global/OtpSuccessful.vue";
import { post } from "@/api/client";
export default {
  components: { ModalSuccessfull },
  data() {
    return {
      otpVerify: {
        head: "Reset Link Sent",
        img: "sent-success-icon.svg",
        subText: `We sent a password reset link to ${this.userEmail}`,
        url: `reset-password/${this.userEmail}`,
        click: "Click here",
      },
      userEmail: "",
      hasRequestSent: false,
    };
  },
  methods: {
    home() {
      this.$router.push("/");
    },
    closeModal() {
      this.hasRequestSent = false;
    },
    async renderModal() {
      try {
        const data = await post("forgot_uv", {
          email: this.userEmail,
        });
        data?.status === "success" ? (this.hasRequestSent = true) : "";
      } catch (err) {
        this.otpVerify.subText = "Sending Failed";
        this.otpVerify.img = "sent-failed-icon.svg";
        this.otpVerify.head = "Request Sending Failed";
        this.otpVerify.url = "";
        this.hasRequestSent = true;
      }
    },
  },
};
</script>
<style lang=""></style>
