<template lang="html">
  <div class="container-fluid h-100 p-0">
    <nav class="navbar navbar-expand-lg p-3 py-4">
      <div class="container-fluid align-items-center">
        <a class="navbar-brand" href="" @click="home"
          ><img
            :src="require('/src/assets/images/logo-dark.svg')"
            alt="logo"
            width="210"
          />
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="" id="navbarSupportedContent">
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <v-GoogleTranslateSelect default-language-code="en" default-page-language-code="en"
                :fetch-browser-language="false" trigger="click" @select="handleGoogleTranslateSelect" />                         
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div class="">
      <div class="terms-privacy d-flex align-items-start">
        <div class="side-bar nav flex-column">
          <div class="terms-btn-wrapper">
            <div
              class="btn nav-pills col-12 d-flex"
              v-for="link in links"
              :key="link.id"
              :class="{ termsBtn: link.id === currentId }"
              @click="displayText(link.id, link.termsText)"
            >
              <span class="px-2" v-if="link.id === currentId">
                <img :src="require(`/src/assets/images/${link.img}`)" alt="" />
              </span>
              <span class="px-2" v-else>
               <img :src="require(`/src/assets/images/${link.imgBlack}`)" alt="" />
              </span>
              <span>{{ link.title }}</span>
            </div>
          </div>
        </div>
        <div class="main-bar position-relative mx-5" v-bind="animateClass">
          <h2 class="f-w-600">{{ termsDisplay.title }}</h2>
          <div class="terms-context">
            <p>
              {{ termsAndCondition.textOne }} <br />
              <br />
              {{ termsAndCondition.textTwo }}
            </p>
          </div>
          <p></p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { termsAndCondition } from "@/data";
import { privacyPolicy } from "@/data";

export default {
  mounted() {
    if (this.termsDisplay === "") {
      this.termsDisplay = termsAndCondition;
    } else {
      this.termsDisplay;
    }
  },

  data() {
    return {
      termsAndCondition,
      privacyPolicy,
      termsDisplay: "",
      links: [
        {
          id: 1,
          title: "Terms and conditions",
          termsText: termsAndCondition,
          img: "gavel-yellow.svg",
          imgBlack: "gavel-black.svg",
        },
        {
          id: 2,
          title: "Privacy Policy",
          termsText: privacyPolicy,
          img: "policy-yellow.svg",
          imgBlack: "policy-black.svg",
        },
      ],
      currentId: 1,
      animate: true,
    };
  },

  methods: {
    handleGoogleTranslateSelect(select){
      //@ts-ignore
      select
    },
    home() { this.$router.push("/"); },

    displayText(id, termsText) {
      this.currentId = id;
      this.termsDisplay = termsText;

      let mainBar = document.querySelector(".main-bar");
      if (mainBar.classList.contains("fadeIn") === false) {
        mainBar.classList.add("fadeIn");
      }
      setTimeout(() => {
        mainBar.classList.remove("fadeIn");
      }, 1000);
    },
  },

  computed: {
    animateClass() {
      return !this.animate;
    },
  },
};
</script>
<style lang=""></style>
