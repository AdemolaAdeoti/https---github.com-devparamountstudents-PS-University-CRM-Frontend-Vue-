<template lang="html">
  <div class="banner-container">
    <RequestLoader />
    <LangModel />

    <div class="d-flex w-100 h-100 justify-content-center align-items-center">
      <div
        class="col-xl-5 col-lg-7 mx-auto col-md-9 col-sm-5 align-self-center px-4 py-4 bg-white"
      >
        <div class="form">
          <div class="">
            <div class="">
              <div class="d-flex justify-content-center">
                <img
                  src="../../assets/images/logo-dark.svg"
                  alt="logo"
                  width="210"
                />
              </div>
              <div class="">
                <h3>Welcome</h3>
                <p>Please fill the form below to sign up.</p>
              </div>
              <form
                class="row col-12 g-3 pt-4 position-relative"
                @submit.prevent="submit()"
              >
                <div class="row">
                  <div class="col-6">
                    <label for="inputEmail4" class="form-label"
                      >First Name</label
                    >
                    <input
                      v-model.lazy="form.firstName"
                      type="text"
                      class="form-control col-12 p-2"
                      id="firstName"
                      @click="clearText"
                      placeholder="Please enter your name"
                    />
                    <span
                      @click="deleteText"
                      v-show="showIcon"
                      class="h4 position-absolute top-0 end-0 login-toggle"
                    >
                      <ion-icon name="close-circle"></ion-icon>
                    </span>
                  </div>
                  <div class="col-6">
                    <label for="inputEmail4" class="form-label"
                      >Last Name</label
                    >
                    <input
                      v-model.lazy="form.lastName"
                      type="text"
                      class="form-control col-12 p-2"
                      id="lastName"
                      @click="clearText"
                      placeholder="Please enter your name"
                    />
                    <span
                      @click="deleteText"
                      v-show="showIcon"
                      class="h4 position-absolute top-0 end-0 login-toggle"
                    >
                      <ion-icon name="close-circle"></ion-icon>
                    </span>
                  </div>
                </div>
                <div class="row my-2">
                  <div class="col-6">
                    <label for="inputEmail4" class="form-label">Email</label>
                    <input
                      v-model.lazy="form.email"
                      type="email"
                      @focusout="validateEmail"
                      class="form-control col-12 p-2"
                      id="email"
                      @click="clearText"
                      placeholder="Please enter your email"
                    />
                    <span
                      @click="deleteText"
                      v-show="showIcon"
                      class="h4 position-absolute top-0 end-0 login-toggle"
                    >
                      <ion-icon name="close-circle"></ion-icon>
                    </span>
                  </div>
                  <div class="col-6 position-relative">
                    <label for="inputPassword4" class="form-label"
                      >Password</label
                    >
                    <input
                      v-model.lazy="form.userPassword"
                      type="password"
                      class="form-control col-12 p-2"
                      id="password"
                      placeholder="Please enter password"
                    />
                    <span class="h4 position-absolute password-toggle-2">
                      <ion-icon
                        id="closeEye"
                        class="d-none"
                        name="eye"
                        @click="togglePassword()"
                      ></ion-icon>
                      <ion-icon
                        id="openEye"
                        name="eye-off"
                        @click="togglePassword()"
                      ></ion-icon>
                    </span>
                  </div>
                </div>

                <div style="margin: auto !important; width: 100%" class="col-6">
                  <!-- Upload Cover Photo -->
                  <label class="fw-bold mb-1"
                    >Upload Profile Photo
                    <span class="text-danger"> * </span></label
                  >
                  <div
                    style="
                      height: 120px !important;
                      border: 1px dashed #4d5056;

                      border-radius: 12px;
                    "
                    class="px-3 d-flex align-items-center justify-content-between"
                  >
                    <div class="d-flex align-items-center">
                      <div>
                        <img
                          class="me-3"
                          src="@/assets/images/upload-image.svg"
                          alt=""
                          id="upload-img"
                        />
                      </div>
                    </div>
                    <div>
                      <form @submit.prevent className="">
                        <label className="custom-file-upload" id="file">
                          <input
                            accept=".jpg, .jpeg, .png"
                            @change="showFile"
                            type="file"
                            id="file-input"
                          />
                          Browse
                        </label>
                      </form>
                      <a class="border py-2 px-5" @click="openFileInput"
                        >Browse</a
                      >
                    </div>
                  </div>
                </div>
                <div class="my-3 text-center">
                  <router-link to="/login">
                    Already have an account? Login
                  </router-link>
                </div>
                <div class="col-xl-12">
                  <button
                    type="submit"
                    :disabled="isDisabled"
                    :click="submit"
                    :class="
                      isDisabled
                        ? 'btn btn-disabled col-12 py-2'
                        : 'btn primary-btn col-12 py-2'
                    "
                  >
                    Sign Up
                  </button>
                </div>
              </form>
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
import { setToken } from "@/utilities/authTokens";
import RequestLoader from "@/components/Global/RequestLoader";
import axios from "axios";
export default {
  components: {
    LangModel,
    RequestLoader,
  },

  data() {
    return {
      form: {
        firstName: "",
        lastName: "",
        email: "",
        profilePhoto: {},
        userPassword: null,
      },
      isDisabled: true,
      showIcon: false,
    };
  },
  methods: {
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

    submit() {
      const authStore = useAuthStore();
      authStore
        .signup(
          this.form.lastName,
          this.form.firstName,
          this.form.email,
          this.form.userPassword,
          this.form.profilePhoto
        )
        .then((res) => {
          console.log(res);
          if (res) {
            // console.log(res.token);
            // sessionStorage.setItem("userToken", res.token);
            authStore.setStoreToken(res.token);
            this.dashboard(res.token);
            // this.$router.push("/dashboard");
          }
        });
    },
    async setImage(file) {
      // const { url } = await get("someroute");
      const user = localStorage.getItem("userToken");
      try {
        const response = await axios.get(
          "https://crm.paramountstudents.com/api/upload-url",
          {
            headers: {
              Accept: "*/*",
              Authorization: `Bearer ${user}`,
            },
          }
        );
        console.log(response);
        // const HTTP = axios.create({
        //   baseUrl: response.data.url,

        // });
        await axios.put(response.data.url, file, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${user}`,
            Accept: "*/*",
          },
        });
        const imageUrl = response.data.url.split("?")[0];
        this.profilePhoto == imageUrl;
      } catch (error) {
        console.log(error);
      }
    },
    openFileInput() {
      document.getElementById("file").click();
    },
    showFile(e) {
      const [file] = e.currentTarget.files;
      if (file) {
        const uploadImg = document.getElementById("upload-img");
        uploadImg.style.width = "80px";
        uploadImg.style.height = "80px";
        uploadImg.src = URL.createObjectURL(file);
        uploadImg.style.borderRadius = "12px";
        // const data = new FormData();
        // data.set("cover_photo_url", e.currentTarget.files[0]);
        // this.coverPhoto = data;
        this.setImage(file);
      }
    },
    dashboard(token) {
      setToken(token);
      setTimeout(() => {
        // const token = localStorage.getItem("user");
        // console.log(token);
        this.$router.push("/dashboard");
      }, 1000);
    },
    clearText() {
      this.showIcon = true;
    },

    validateEmail(e) {
      var email = e.currentTarget.value;
      var regex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      if (email.trim() == "" || !regex.test(email)) {
        this.showWarning = true;
        setTimeout(() => {
          this.showWarning = false;
        }, 1500);
      } else {
        this.showIsValid = true;
        this.isEmailValid = true;
        this.$emit("validate-email", this.isEmailValid);
        setTimeout(() => {
          this.showIsValid = false;
        }, 1500);
      }
    },
    deleteText() {
      console.log("hello");
      this.form.firstName = "";
      this.form.lastName = "";
      this.form.email = "";
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
        console.log(newValue.userPassword, newValue.firstName);
        if (newValue.firstName !== null || "") {
          this.isDisabled = false;
        } else if (newValue.userID === "" || null) {
          this.isDisabled = true;
        }
      },
      deep: true,
    },
  },

  mounted() {
    document
      .getElementById("firstName")
      .addEventListener("keydown", function (e) {
        if (e.which === 38 || e.which === 40) {
          e.preventDefault();
        }
      });
  },
};
</script>
<style lang="css">
.banner-container {
  background: url("../../assets/images/Turkey\ uni\ 1.svg") no-repeat
    center/cover;
  height: 100vh;
}
.password-toggle-2 {
  top: 55% !important;
  right: 6% !important;
  cursor: pointer;
  color: #98a2b3;
  box-sizing: border-box;
  overflow: hidden;
}
.cont {
  background: red;
}
#file-input {
  display: none;
}
.custom-file-upload {
  display: none !important;
  text-decoration: underline;
  color: #0017ff;
  cursor: pointer;
}
</style>
