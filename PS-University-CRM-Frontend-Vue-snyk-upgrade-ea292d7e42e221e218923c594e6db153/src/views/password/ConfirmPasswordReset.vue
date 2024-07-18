<template lang="html">
  <div class="container">
    <ModalSuccessfull
      :head="otpVerify.head"
      :img="otpVerify.img"
      :subText="otpVerify.subText"
      :url="otpVerify.url"
      :click="otpVerify.click"
    />
    <div class="mt-5 pt-5">
      <div class="col-lg-6 mx-auto">
        <div class="mx-auto py-3 text-center">
          <img
            :src="require('/src/assets/images/otp-successfull.svg')"
            alt=""
            srcset=""
          />
        </div>
        <div class="col-lg-10 mx-auto text-center">
          <h1>Password reset</h1>
          <p>
            Your password has been successfully reset. <br> Click below to log in
            magically.
          </p>
        </div>
       

          <div class="col-7 pt-3 mx-auto">
            <button
              type="button"
              @click.stop.prevent="home"
              class="btn primary-btn col-12 py-2 px-5"
            >
              Continue
            </button>
          </div>
          <h6 @click="home()" class="cursor text-center mt-5">
            <span class="px-2"
              ><img :src="require('/src/assets/images/arrow-left.svg')" alt=""
            /></span>
            Back to log in
          </h6>
      </div>
    </div>
  </div>
</template>
<script>
import ModalSuccessfull from "/src/components/Global/OtpSuccessful.vue";
export default {
  components: { ModalSuccessfull },
  data() {
    return {
      otpVerify: {
        head: "Reset Link Sent",
        img: "sent-success-icon.svg",
        subText: `We sent a password reset link to ${this.$route.params.email}`,
        url: "email-verification",
        click: "Click here",
      },
    };
  },
  methods: {
    home() {
      this.$router.push("/");
    },
  },
};
</script>
<style lang=""></style>
