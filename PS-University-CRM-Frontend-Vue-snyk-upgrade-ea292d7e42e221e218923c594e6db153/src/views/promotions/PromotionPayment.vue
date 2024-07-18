<!--<template>
  <div class="w-75 shadow rounded p-5">
    <header
      class="d-flex align-items-center rounded p-3"
      style="background-color: #fef6dc"
    >
      <img
        src="./../../assets/images/card-yellow.png"
        alt=""
        style="height: 24px; margin-right: 1rem"
      />
      <h6
        class="font-weight-bold align-self-center p-0 m-0"
        style="height: 24px"
      >
        Add new card
      </h6>
      <img
        src="./../../assets/images/visa.png"
        alt=""
        style="height: 24px; margin-left: 1rem"
      />
      <img
        src="./../../assets/images/mc.png"
        alt=""
        style="height: 24px; margin-left: 4px"
      />
    </header>

    <form @submit.prevent="payMoney" class="mt-5">
      <div>
        <p class="font-weight-bold" style="font-weight: bold">Card Number</p>
        <p>Enter the 16-digit card number on the card</p>
        <div class="row w-100 mx-auto">
          <div class="col-2 p-0">
            <div
              class="m-0 d-flex align-items-center justify-content-center"
              style="
                border: 2px solid #68696b;
                border-radius: 10px 0 0 10px;
                border-right: 0px;
                margin-right: -6px !important;
                height: 46px;
                background: transparent;
                position: relative;
                z-index: 10;
              "
            >
              <img
                src="./../../assets/images/mc.png"
                alt=""
                style="height: 20px"
              />
            </div>
          </div>
          <div class="col-8 p-0">
            <input
              type="number"
              class="p-2 m-0"
              style="
                border: 2px solid #68696b;
                border-radius: 0 0 0 0 !important;
                border-right: 0px;
                border-left: 0px;
                width: 100%;
                background: transparent;
                outline: none;
                min-height: 46px;
              "
            />
          </div>
          <div class="col-2 p-0">
            <div
              class="m-0 d-flex align-items-center justify-content-center"
              style="
                border: 2px solid #68696b;
                border-radius: 0 10px 10px 0;
                border-left: 0px;
                padding: 0 20px;
                margin-left: -6px !important;
                height: 46px;
                background: transparent;
                position: relative;
                z-index: 10;
              "
            >
              <img
                src="./../../assets/images/valid-tick.png"
                alt=""
                style="height: 20px"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="mt-4">
        <p class="font-weight-bold" style="font-weight: bold">
          Cardholder Name
        </p>
        <p>Enter the cardholder name on the card</p>
        <div>
          <input
            type="text"
            class="p-2 m-0"
            style="
              border: 2px solid #68696b;
              border-radius: 10px;
              width: 100%;
              background: transparent;
              outline: none;
              min-height: 46px;
            "
          />
        </div>
      </div>
      <div class="row w-100 mx-auto mt-4">
        <div class="col p-0">
          <h6 class="font-weight-bold" style="font-weight: bold">CVV Number</h6>
          <p>Enter the 3 or 4-digit number on the card</p>
        </div>
        <div class="col p-0">
          <input
            maxlength="4"
            class="p-2"
            type="password"
            placeholder="***"
            style="
              border: 2px solid #68696b;
              border-radius: 10px;
              width: 100%;
              background: transparent;
              outline: none;
              min-height: 46px;
            "
          />
        </div>
      </div>
      <div class="row w-100 mx-auto mt-4">
        <div class="col p-0">
          <h6 class="font-weight-bold" style="font-weight: bold">
            Expire Date
          </h6>
          <p>Enter the expiration date of the card</p>
        </div>
        <div class="col p-0 row w-100 mx-auto">
          <div class="col p-0">
            <input
              type="number"
              min="0"
              max="12"
              class="p-2"
              style="
                border: 2px solid #68696b;
                border-radius: 10px;
                width: 100%;
                background: transparent;
                outline: none;
                min-height: 46px;
              "
            />
          </div>
          <div class="col p-0 d-flex justify-content-center align-items-center">
            <img
              src="./../../assets/images/slash.png"
              alt=""
              style="height: 32px; margin-top: -15px"
            />
          </div>
          <div class="col p-0">
            <input
              type="number"
              class="p-2"
              min="0"
              max="99"
              style="
                border: 2px solid #68696b;
                border-radius: 10px;
                width: 100%;
                background: transparent;
                outline: none;
                min-height: 46px;
              "
            />
          </div>
        </div>
      </div>
      <div class="d-flex align-items-center mt-5">
        <img src="./../../assets/images/payment-safe.png" alt="" />

        <p class="p-0" style="margin: 0; margin-left: 10px">
          Your payment information is safe with us
        </p>
      </div>
      <div class="text-center my-5">
        <button class="w-100 rounded btn btn-warning">
          Pay ${{ amountToPay }}
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
    emits:["setOTP"],
  props: ["amountToPay"],
  methods: {
    payMoney() {
      this.$emit("setOTP");
    },
  },
};
</script>
