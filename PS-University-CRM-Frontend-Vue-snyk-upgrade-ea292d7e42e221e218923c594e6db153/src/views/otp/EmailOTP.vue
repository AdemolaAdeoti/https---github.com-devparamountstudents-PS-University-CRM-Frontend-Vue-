<template lang="html">
  <div class="container">
    <RequestLoader />
    <div v-show="show">

    
    <ModalResend
      :head="otpSent.head"
      :img="otpSent.img"
      :subText="otpSent.subText"
    />
    <ModalSuccessfull
      :head="otpVerify.head"
      :img="otpVerify.img"
      :subText="otpVerify.subText"
    />
    </div>

    <div class="verify-otp">
      <div class="col-lg-6 mx-auto">
        <div class="mx-auto py-2">
          <img
            :src="require('/src/assets/images/mailbox-icon.svg')"
            alt=""
            srcset=""
          />
        </div>
        <div class="text-">
          <h2>Please Verify OTP code</h2>
          <p>The OTP code has been sent to your registered email address.</p>
        </div>
        <form
          class="row g-3 pt-3 position-relative justify-content-center"
          @submit.prevent="verifyOtp"
        >
          <div class="d-flex justify-content-center otp-box mx-2">
            <v-otp-input
              ref="otpInput"
              input-classes="otp-input"
              separator=""
              :num-inputs="4"
              :should-auto-focus="true"
              :is-input-num="true"
              @on-complete="handleOnComplete"
            />
          </div>
          <div class="col-7 pt-3">
            <button type="submit" class="btn primary-btn col-12 py-2 px-5">
              Verify OTP Code
            </button>
            <button
              ref="modalSuccess"
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              style="display: none"
            ></button>
          </div>
          <p class="pt-3">
            Didn’t receive the email?
            <span
              class="text-blue cursor"
              @click="resendOtp"
              >Click to resend</span
            >
          </p>

          <h6 @click="home()" class="cursor">
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
import ModalResend from "/src/components/Global/ResendModal.vue";
import ModalSuccessfull from "/src/components/Global/OtpSuccessful.vue";
import { post } from "@/api/client";
import {showModal } from '@/plugins/modal';
// import axios from "axios";
import { useAuthStore } from "@/stores/auth";
import { useUserStore } from "@/stores/user";
import Swal from "sweetalert2";
import { setToken } from "@/utilities/authTokens";
import initializeEcho from '@/plugins/pusher.js';
export default {
  components: { ModalResend, ModalSuccessfull },
  data() {
    return {
      otp: "",
      otpSent: {
        head: "OTP Sent",
        img: "sent-success-icon.svg",
        subText: "Your verified emailaddress has received an OTP code.",
      },
      show:true,
      otpVerify: {
        head: "OTP verified",
        img: "otp-successfull.svg",
        subText: "Your OTP code has been verified.",
      },
    };
  },
  methods: {
    async resendOtp(){
      const authStore = useAuthStore();
      let res = await post("api/resend_otp", {
        platform: 'university',
        unique_id: authStore.userId,
        password: authStore.password,
      },false);
      console.log(res,3232323)
      if(res){
        showModal({text:res.message})
      }

    },
    home() {
      this.$router.push("/");
    },
    handleOnComplete(value) {
      this.otp = value;
      //console.log("OTP completed: ", value);
    },
    verifyOtp() {
      const authStore = useAuthStore();
      // console.log(authStore);
      // const HTTP = axios.create({
      //   baseURL: `http://localhost:8080/university/`,
      //   headers: {
      //     "Content-Type": "application/json",
      //     // Authorization: token ? `Bearer ${token}` : "",
      //     Accept: "*/*",
      //   },
      // });
      
      post("otp_uv", {
        otp: this.otp,
        unique_id: authStore.userId,
        password: authStore.password,
      })
        .then((response) => {
          // const res = response.data;          

          authStore.$state.userInfo = response.user
          // this.$state.userInfo.src = `${user.profile_photo_url}`;
          if (response.status == "success") {
            // console.log("Here");
            const userStore = useUserStore();
            userStore.setUser(response.user);
            authStore.setStoreToken(response.authorisation.token);
            initializeEcho(window.baseUrl, response.authorisation.token);
            setToken(response.authorisation.token);
            const Toast = Swal.mixin({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener("mouseenter", Swal.stopTimer);
                toast.addEventListener("mouseleave", Swal.resumeTimer);
              },
            });

            Toast.fire({
              icon: "success",
              title: "Verified successfully",
            });
            this.$router.push("/dashboard");
          }
          /*
        this.$refs.modalSuccess.click()
         setTimeout(() => {
        }, 3000); */
        })
        .catch((error) => {
          showModal({text:error.response.message ?? "something went wrong"})          
          //console.log(error)
        });
    },
  },
};
</script>
<style lang=""></style>
