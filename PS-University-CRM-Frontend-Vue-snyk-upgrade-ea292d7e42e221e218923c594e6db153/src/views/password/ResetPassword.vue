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
    <div class="forgot-password">
      <div class="col-lg-6 mx-auto">
        <div class="mx-auto py-3 text-center">
          <img
            :src="require('/src/assets/images/key-icon.svg')"
            alt=""
            srcset=""
          />
        </div>
        <div class="col-lg-10 mx-auto text-center">
          <h2>Set new password</h2>
          <p>
            Your new password must be different to previously used passwords.
          </p>
        </div>
        <form class="row g-3 pt-3 position-relative justify-content-center">
          <div class="col-md-7 pt-3">
            <label for="inputEmail4" class="form-label">Password</label>
            <input
              type="text"
              class="form-control p-2"
              id="userId"
              v-model="password"
              placeholder="Please enter password"
            />
          </div>
          <div class="col-md-7 pt-3">
            <label for="inputEmail4" class="form-label">Confirm Password</label>
            <input
              type="text"
              class="form-control p-2"
              id="userId"
              v-model="newPassword"
              placeholder="Please Confirm password"
            />
          </div>
          <div class="col-md-7 text-small">
            <small>Must be at least 8 character long</small> <br />
            <small>Include at least 1 uppercase letter</small> <br />
            <small>Include at least 1 numeric</small>
          </div>
          <div class="col-7 pt-3">
            <button
              type="button"
              @click.stop.prevent="submit()"
              class="btn primary-btn col-12 py-2 px-5"
            >
              Reset password
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
        url: "email-verification",
        click: "Click here",
      },
      password: "",
      newPassword: "",
      oldPassword: "password",
      userEmail: this.$route.params.email,
    };
  },
  methods: {
    checkUpperCase(char) {
      return char === char.toUpperCase();
    },
    checkNumeric(str) {
      return str.includes(
        "1" || "2" || "3" || "4" || "5" || "6" || "7" || "8" || "9" || "0"
      );
    },
    validatePassword() {
      if (
        this.password === this.newPassword &&
        this.password !== "" &&
        this.newPassword !== ""
      ) {
        if (this.oldPassword !== this.password) {
          for (let char of this.password) {
            if (this.checkUpperCase(char) && this.checkNumeric(this.password))
              return true;
          }
        }
      }
      return false;
    },
    async resetPassword() {
      try {
        const response = await post("reset_uv", {
          salte: this.password,
          keyu: this.newPassword,
          password: this.oldPassword,
        });
        this.hasRequestSent = true;
        if (response.status === "success") return true;
      } catch (err) {
        const { response } = err;
        this.otpVerify.subText = response.data.message;
        this.otpVerify.img = "sent-failed-icon.svg";
        this.otpVerify.head = "Request Sending Failed";
        this.otpVerify.url = "forgot-password";
        this.hasRequestSent = true;
        return false;
      }
    },
    submit() {
      if (this.validatePassword()) {
        this.resetPassword()
          ? this.$router.push("/confirm-reset-password")
          : "";
      }
    },
    closeModal() {
      this.hasRequestSent = false;
    },
  },
};
</script>
<style lang=""></style>
