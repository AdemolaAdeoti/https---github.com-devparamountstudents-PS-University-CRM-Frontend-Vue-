<!--<template>
  <SuccessPayment v-if="paymentSuccessful" @close="closeModal" />
  <teleport to="body">
    <TheModal fixed v-if="otpIsVisible">
      <div class="d-flex justify-content-center">
        <img
          src="./../../assets/images/email-message.png"
          alt=""
          class="mx-auto"
        />
      </div>
      <h4 class="w-75 text-center mx-auto font-weight-bold mt-5">
        Please Verify OTP code
      </h4>
      <p class="w-75 text-center mx-auto" style="font-size: 13px">
        The OTP code has been sent to your registered email address and phone
        number. It expires in 5mins
      </p>
      <form @submit.prevent="confirmOTP" class="w-75 mx-auto">
        <div class="row gx-4 w-100 mx-auto mt-4">
          <div class="col-3 text-center" v-for="code in codes" :key="code.id">
            <input
              type="text"
              maxlength="1"
              class="border border-warning border-1 p-2 w-100 text-center"
              placeholder="0"
              style="font-size: 30px"
              v-model="code.val"
            />
          </div>
        </div>
        <div class="text-center my-5">
          <button class="w-100 rounded btn btn-warning">Verify OTP Code</button>
        </div>
        <div class="text-center">
          <p>
            Didn’t receive the OTP?
            <span class="text-primary">Click to resend</span>
          </p>
        </div>
      </form>
    </TheModal>
  </teleport>
  <div>
    <component
      :is="promotionStage"
      :amountToPay="amount"
      @setOTP="setOTP"
      @makePayment="setPayment"
    ></component>
  </div>
</template>

<script>
import PromotionAudience from "./PromotionAudience";
import PromotionPayment from "./PromotionPayment";
import SuccessPayment from "./SuccessPayment.vue";
export default {
  components: {
    PromotionAudience,
    SuccessPayment,
    PromotionPayment,
  },
  data() {
    return {
      promotionStage: "PromotionAudience",
      amount: null,
      otpIsVisible: false,
      paymentSuccessful: false,
      codes: [
        {
          id: 1,
          val: null,
        },
        {
          id: 2,
          val: null,
        },
        {
          id: 3,
          val: null,
        },
        {
          id: 4,
          val: null,
        },
      ],
    };
  },
  methods: {
    closeModal() {
      this.otpIsVisible = false;
      this.paymentSuccessful = false;
      this.$router.push("/create-promotions");
    },
    setOTP() {
      this.otpIsVisible = true;
    },
    confirmOTP() {
      const codeArray = this.codes.map((code) => {
        return code.val;
      });
      const code = codeArray.join("");
      console.log(code);
      this.otpIsVisible = false;
      this.paymentSuccessful = true;
    },
    setPayment({ amount }) {
      this.amount = amount;
      this.promotionStage = "PromotionPayment";
    },
  },
};
</script>

<style scoped>
.text-primary {
  cursor: pointer;
}
</style>
