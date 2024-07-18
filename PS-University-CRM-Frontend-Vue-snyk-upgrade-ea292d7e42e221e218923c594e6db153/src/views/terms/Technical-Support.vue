<template>
  <div class="container-fluid">
    <!-- <ModalSuccessfull
      :head="otpVerify.head"
      :img="otpVerify.img"
      :subText="otpVerify.subText"
    /> -->

    <div class="row">
      <div class="col-xl-6 px-4">
        <div class="technical-support px-5 mx-5 py-3">
          <router-link to="/login"
            ><div class="back-arrow py-4 mb-3 cursor">
              <img
                :src="require('/src/assets/images/arrow-left-black.svg')"
                alt=""
              /> </div
          ></router-link>
          <h2 class="f-w-600">
            Paramount Students <br />
            Technical Service Center
          </h2>
          <h5 class="pt-3">
            You can reach us anytime via
            <span><a href="">Support@paramountstudents.com</a></span>
          </h5>
        </div>
        <div class="form pt-3">
          <div class="">
            <div class="">
              <form class="row g-3 position-relative">
                <div class="col-md-9 mb-2 mx-auto">
                  <label for="inputEmail4" class="form-label">Full Name</label>
                  <input
                    type="text"
                    class="form-control p-2"
                    id="userId"
                    placeholder="Your name"
                  />
                </div>
                <div class="col-md-9 mx-auto mb-2 position-relative">
                  <label for="inputPassword4" class="form-label">Email</label>
                  <input
                    type="password"
                    class="form-control p-2"
                    id="password"
                    placeholder="you@company.com"
                  />
                </div>

                <div class="col-md-9 mx-auto mb-2 position-relative">
                  <label for="inputPassword4" class="form-label"
                    >Phone Number</label
                  >
                  <vue-tel-input
                    class="form-control"
                    @onInput="onInput"
                    :preferredCountries="['us']"
                    v-model="country"
                  >
                  </vue-tel-input>
                </div>

                <div class="mb-3 col-md-9 mx-auto">
                  <label for="exampleFormControlTextarea1" class="form-label"
                    >How can we help?</label
                  >
                  <textarea
                    class="form-control"
                    id="exampleFormControlTextarea1"
                    rows="4"
                    style="resize: none"
                  ></textarea>
                </div>

                <div class="col-md-9 py-2 mx-auto">
                  <button
                    class="btn primary-btn col-md-12"
                    @click.stop.prevent=""
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div class="col-xl-6 p-0">
        <img
          :src="require('/src/assets/images/technical-banner.svg')"
          alt=""
          width="100%"
        />
      </div>
    </div>
  </div>
</template>
<script>
// import ModalSuccessfull from "/src/components/OtpSuccessful.vue";

export default {
  // components: {  ModalSuccessfull },

  data() {
    return {
      country: "",
      otpVerify: {
        head: "Request Sent",
        img: "sent-success-icon.svg",
        subText:
          "We'll get back to you within 24 hours. Thank you so much for getting in touch with us",
      },

      tel: "+246-800-000",
    };
  },
  methods: {
    onInput({ number, isValid, country }) {
      console.log(number, isValid, country);
    },
    home() {
      this.$router.push("/login");
    },
  },
  mounted() {
    const telephone = document.getElementsByName("telephone")[0];
    telephone ? (telephone.placeholder = "800 6212 2103 ") : "";
  },
};
</script>
<style></style>
