<template lang="html">
  <div class="main-container">
    <RequestLoader />
    <LangModel />
    <div class="container-fluid position-relative">
      <div class="nav-logo">
        <div class="position-absolute d-flex w-100 pt-4 align-items-center justify-content-between ppx md:ppx" style="--md-ppx:12px; --ppx:2rem">
          <div class="">
            <img :src="require('/src/assets/images/logo.svg')" alt="logo" width="210" />
          </div>
          <div class="lang notranslate">
            <v-GoogleTranslateSelect default-language-code="en" default-page-language-code="en"
                :fetch-browser-language="false" trigger="click" @select="handleGoogleTranslateSelect" />           
          </div>
        </div>
      </div>
    </div>

    <div class="row position-relative" style="max-height:100vh">
      <div class="col-lg-6 col-md-6">
        <div class="banner hh md:hh position-relative" style="--hh: 100dvh; --md-hh: 40dvh;">
          <!-- <img
            :src="require('/src/assets/images/banner.png')"
            height="100%"
            width="100%"
            alt=""
          /> -->
          <div class="inner-login"></div>
        </div>
      </div>
      <div class="col-xl-3 col-lg-4 mx-auto col-md-5 px-0 align-self-center ppx md:ppx" style="--md-ppx:12px; --ppx:2rem">
        <div class="form w-100">
          <div class="px-4">
            <div class="pt-sm-0 pt-2">
              <h2>Welcome Back</h2>
              <p>Welcome back! Please enter your details.</p>
              <form class="row g-3 pt-4  mx-auto position-relative mb-4" >
                <div class="col-md-12 position-relative px-0">
                  <label for="inputEmail4" class="form-label">Login With Your ID</label>
                  <input v-model.lazy="form.userId" type="text" class="form-control p-2" id="userId" @click="clearText"
                    placeholder="Please enter the paramount ID" />
                  <span @click="deleteText" v-show="showIcon" class="h4 position-absolute end-0 login-toggle" >
                    <ion-icon name="close-circle"></ion-icon>
                  </span>
                </div>
                <div class="col-md-12 position-relative px-0">
                  <label for="inputPassword4" class="form-label">Password</label>
                  <input v-model.lazy="form.userPassword" type="password" class="form-control p-2" id="password"
                    placeholder="Please enter password" />
                  <span class="h4 position-absolute  end-0 password-toggle">
                    <ion-icon id="closeEye" class="d-none" name="eye" @click="togglePassword()"></ion-icon>
                    <ion-icon id="openEye" name="eye-off" @click="togglePassword()"></ion-icon>
                  </span>
                  <div class="my-3 text-center">
                    <router-link to="/forgot-password">
                      Forget Password
                    </router-link>
                  </div>
                  <!--    <div class="my-3 text-center">
                    <router-link to="/sign-up">
                      Don't have an account? Sign Up
                    </router-link>
                  </div> -->
                </div>
                <div class="col-xl-12 px-0">
                  <ButtonButton type="button" :onClick="submit" :loader="true" :disabled="isDisabled" :class="isDisabled
                    ? 'btn btn-disabled col-12 py-2'
                    : 'btn primary-btn col-12 py-2'
                    " name=" Sign In" :showIcon="false" />
                </div>
              </form>
            </div>
          </div>
        </div>

      </div>
    
    <div class="row container-fluid position-relative" style="bottom:30px;">
      <div class="">
        <div class="w-100 bottom-0 end-0">
          <div class="d-flex justify-content-around md:mm" style="--md-mm:25px">
            <div class="w-50 xl:dflex justify-content-around">
              <p class="md:text-dark text-light mb-0 tx md:tx" style="--tx:16px; --md-tx:10px">
               <span> © 2017 - 2022 </span> <span class="notranslate"> Paramount Students. </span> <span> Allrights reserved</span>

              </p>
            </div>
            <div class="footer-link w-50" >
              <ul class="tx md:tx dflex md:dblock  justify-content-between" style="--tx:16px; --md-tx:10px">
                <li class="sm:dblock ppx-3 md:ppx notranslate" style="--md-ppx:5px;"><a href="">Paramountstudents.network</a></li>
                <li class="sm:dblock ppx-3 md:ppx" style="--md-ppx:5px;">
                  <router-link to="/technical-support">Technical Support</router-link>
                </li>
                <li class="sm:dblock ppx-3 md:ppx" style="--md-ppx:5px;"><router-link to="/terms-privacy">Terms</router-link></li>
                <li class="sm:dblock ppx-3 md:ppx" style="--md-ppx:5px;"><router-link to="/terms-privacy">Privacy</router-link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>
<script>
import LangModel from "/src/components/Global/LangModel";
import { useAuthStore } from "@/stores/auth";
// import { HTTP } from "@/api/client";
import RequestLoader from "@/components/Global/RequestLoader";
import ButtonButton from "@/components/Global/ButtonButton";

export default {
  components: {
    LangModel,
    RequestLoader,
    ButtonButton
  },

  data() {
    return {
      form: {
        userId: "",
        userPassword: null,
      },
      isDisabled: true,
      showIcon: false,
    };
  },
  methods: {
    //@ts-ignore
    handleGoogleTranslateSelect(select){
      //@ts-ignore
      select
    },
    togglePassword() {
      let closeEye = document.querySelector("#closeEye");
      let openEye = document.querySelector("#openEye");
      let password = document.querySelector("#password");
      const type =
        password.getAttribute("type") === "password" ? "text" : "password";
      openEye.classList.add("d-none");
      if (closeEye.classList.contains("d-none")) {
        closeEye.classList.remove("d-none");
        openEye.classList.add("d-none");
        password.setAttribute("type", type);
      } else if (openEye.classList.contains("d-none")) {
        openEye.classList.remove("d-none");
        closeEye.classList.add("d-none");
        password.setAttribute("type", type);
      }
    },

    async submit() {
      const authStore = useAuthStore();
      //  this.$axios.post('login', {unique_id: this.form.userId, password: this.form.userPassword})
     let res = await authStore.login(this.form.userId, this.form.userPassword)
      if (res) {
        this.$router.push("/email-verification");
      }      
      //  useAuthStore().login(this.form.userId, this.form.userPassword)
      //   HTTP.post('login', {unique_id: this.form.userId, password: this.form.userPassword}).then(res => console.log(res)).error((err) => alert(err))
    },
    dashbaord() {
      localStorage.setItem("user", "isLoggedin");
      return this.$router.push("/dashboard");
    },
    clearText() {
      this.showIcon = true;
    },

    deleteText() {
      console.log("hello");
      this.form.userId = "";
      this.showIcon = false;
      this.isDisabled = true;
    },
    terms() {
      this.$router.push("terms-privacy");
    },
  },

  watch: {
    form: {
      handler(newValue) {
        console.log(newValue.userPassword, newValue.userId);
        if (newValue.userId !== null || "") {
          this.isDisabled = false;
        } else if (newValue.userID === "" || null) {
          this.isDisabled = true;
        }
      },
      deep: true,
    },
  },

  mounted() {
    document.getElementById("userId").addEventListener("keydown", function (e) {
      if (e.which === 38 || e.which === 40) {
        e.preventDefault();
      }
    });
  },
};
</script>
<style lang=""></style>
