<template>
  <div class="container h-auto py-3">
    <!-- Read-Only Form -->
    <div class="form-group">
      <label class="label-text" for="usr">Registerd Phone Number</label>
      <div>
        <span class="p-input-icon-left p-input-icon-right p-float-label">
          <i class="pi">
            <img
              :src="require('/src/assets/images/country-img.svg')"
              alt="input-lock"
            />
          </i>
          <InputText
            type="text"
            v-model="value3"
            class="form-input"
            value="+90   |  987 654 3241"
            disabled
          />
          <i class="pi">
            <img
              :src="require('/src/assets/images/lock-icon.svg')"
              alt="input-lock"
            />
          </i>
        </span>
      </div>
    </div>

    <div class="form-group sub-input">
      <label class="label-text" for="usr">Country</label>

      <div>
        <span class="p-input-icon-left p-input-icon-right p-float-label">
          <i class="pi">
            <img
              :src="require('/src/assets/images/country-img.svg')"
              alt="input-lock"
            />
          </i>
          <InputText
            type="text"
            v-model="value3"
            class="form-input"
            value="Turkey"
            disabled
          />
          <i class="pi">
            <img
              :src="require('/src/assets/images/lock-icon.svg')"
              alt="input-lock"
            />
          </i>
        </span>
      </div>

      <!-- <div class="input-groups">
        <i class="pi">
          <img
            class="input-left-icon"
            :src="require('/src/assets/images/country-img.svg')"
            alt="input-lock"
          />
        </i>
        <input
          class="form-control form-input country-form-input"
          type="text"
          placeholder="Turkey"
          aria-label="Disabled input example"
          disabled
          readonly
        />
        <i class="pi">
          <img
            class="input-icon"
            :src="require('/src/assets/images/lock-icon.svg')"
            alt="input-lock"
          />
        </i>
      </div> -->
    </div>

    <!-- <div class="input-group mb-3">
      <div class="input-group-prepend">
        <span class="input-group-text">$</span>
      </div>
      <input
        type="text"
        class="form-control"
        aria-label="Amount (to the nearest dollar)"
      />
      <div class="input-group-append">
        <span class="input-group-text">.00</span>
      </div>
    </div> -->

    <div class="form-group sub-input">
      <label class="label-text" for="usr">City</label>
      <input
        class="form-control form-input"
        type="text"
        value="Istanbul"
        aria-label="Disabled input example"
        disabled
        readonly
      />
      <span>
        <img
          class="input-icon end-0"
          :src="require('/src/assets/images/lock-icon.svg')"
          alt="input-lock"
        />
      </span>
    </div>

    <div class="form-group sub-input sub-input-large">
      <label class="label-text" for="usr">High School Address</label>
      <input
        class="form-control form-input-large"
        contenteditable="true"
        type="text"
        placeholder="Fulya, Fulya, Fulya Mahallesi Yeşilçimen Sokak Polat Tower Bağımsız Bölüm 12/430, 34394 Şişli/İstanbul"
        aria-label="Disabled input example"
        disabled
        readonly
      />
      <span>
        <img
          class="input-icon end-0"
          :src="require('/src/assets/images/lock-icon.svg')"
          alt="input-lock"
        />
      </span>
    </div>

    <div class="form-group sub-input-last">
      <label class="label-text" for="usr">Postal Code</label>
      <input
        class="form-control form-input"
        type="text"
        value="34343"
        aria-label="Disabled input example"
        disabled
        readonly
      />
      <span>
        <img
          class="input-icon end-0"
          :src="require('/src/assets/images/lock-icon.svg')"
          alt="input-lock"
        />
      </span>
    </div>
    <VuePhoneNumberInput v-model="user.phone" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {}
    };
  },
  created() {
    this.user = JSON.parse(localStorage.getItem('userInfo'));
  },
  // data() {
  //   return {
  //     vueTel: {
  //       phone: "",
  //       props: {
  //         clearable: true,
  //         fetchCountry: true,
  //         preferredCountries: ["US", "GB"],
  //         noExample: false,
  //         translations: {
  //           countrySelectorLabel: "Country code",
  //           countrySelectorError: "Error",
  //           phoneNumberLabel: "Enter your phone",
  //           example: "Example:",
  //         },
  //       },
  //     },
  //   };
  // },
};
</script>

<style scoped>
.container {
  margin-top: -30px;
  margin-bottom: 60px;
}
.form-group {
  margin-top: 40px;
}
.input-groups {
  position: relative;
}
.sub-input {
  margin-top: 72px;
}
.sub-input-last {
  margin-top: 112px;
}
.form-input {
  width: 591px;
  height: 44px;
  text-align: left;
  padding-left: 3rem;
  background: #e5e7eb;
}
.form-input-large {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px 14px;
  gap: 8px;
  position: absolute;
  width: 591px;
  height: 84px;
  margin-top: 4px;
  background: #eaecf0;
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
  border-radius: 8px;
}
.input-left-icon {
  position: absolute !important;
  width: 24px;
  height: 24px;
  top: 10px;
  left: 10px;
  /* margin-left: 329px;
        margin-top: 40px; */
}
.input-icon {
  position: absolute;
  width: 16px;
  height: 21px;
  top: 10px;
  right: 10px;
  /* margin-
        right: 410px;
        margin-top: 40px; */
}
.label-text {
  font-family: "Inter";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: #1d2939;
}
.form-input-large::-webkit-input-placeholder {
  width: 518px;
  height: 64px;
  position: absolute;
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #1d2939;
}
.country-form-input::-webkit-input-placeholder {
  padding-left: 50px;
  color: #1d2939;
}

.p-input-icon-left > i,
.p-input-icon-right > i {
  margin-top: -0.75rem;
}
</style>