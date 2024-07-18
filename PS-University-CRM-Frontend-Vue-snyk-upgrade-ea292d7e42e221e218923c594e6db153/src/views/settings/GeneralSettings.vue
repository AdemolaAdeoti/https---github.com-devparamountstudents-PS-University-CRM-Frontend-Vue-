<template>
  <div class="row w-90 mx-auto">
    <div class="px-4 py-3">
      <!-- General Description -->
      <div class="col-12 justify-content-between">
        <div class="heading">Paramount Students CRM Version</div>
        <br />
        <p class="sub-heading">
          <span class="sub1">{{ genSettings?.version || "N/A" }}</span> &nbsp;
          <span class="sub2">Last updated February 26, 2022.</span>
        </p>
      </div>
      <hr class="line" />

      <!-- First Dropdown -->
      <div>
        <div>
          <div class="col-12 d-flex justify-content-between">
            <div class="heading">Time Zone</div>

            <span @click="showTimeZone()" class="px-5 py-2 d-flex">
              <img
                v-if="trackTimeZone"
                class="arrow"
                :src="require('/src/assets/images/arrow-right.png')"
              />
              <img
                v-else
                class="arrow"
                :src="require('/src/assets/images/arrow-left-drop.svg')"
              />
            </span>
          </div>
          <br />
          <div>
            <p class="sub-heading dropdown-sub">
              <span class="sub">{{ genSettings?.time_zone || "N/A" }}</span>
            </p>
          </div>
        </div>

        <!-- Dropdown Content -->
        <div v-if="trackTimeZone" class="px-4">
          <div v-for="num of [1, 2, 3, 4, 5, 6, 7]" :key="num">
            <div class="dropdown-content">(UTC + 03:00) Istanbul</div>
          </div>
        </div>
      </div>
      <hr class="line" />

      <!-- Second Dropdown -->
      <div>
        <div>
          <div class="col-12 d-flex justify-content-between">
            <div class="heading">Time Format</div>

            <span @click="showTimeFormat()" class="px-5 py-2 d-flex">
              <img
                v-if="trackTimeFormat"
                class="arrow"
                :src="require('/src/assets/images/arrow-right.png')"
              />
              <img
                v-else
                class="arrow"
                :src="require('/src/assets/images/arrow-left-drop.svg')"
              />
            </span>
          </div>
          <br />
          <div>
            <p class="sub-heading dropdown-sub">
              <span class="sub">{{ genSettings?.time_format || "N/A" }}</span>
            </p>
          </div>
        </div>

        <!-- Dropdown Content -->
        <div v-if="trackTimeFormat" class="px-4">
          <div>
            <span class="dropdown-content" style="color: orange">
              12Hours
            </span>
            <span>
              <img
                class="tick"
                :src="require('/src/assets/images/tick-mark.svg')"
              /> </span
            ><br /><br />
            <div class="dropdown-content">24 Hours</div>
          </div>
        </div>
      </div>
      <hr class="line" />
    </div>
    <div class="d-flex justify-content-end mt-5">
      <button class="px-5 py-2 btn save">Save Changes</button>
    </div>
  </div>
</template>

<script>
//   import { HTTP } from '@/api/client';

export default {
  name: "GeneralSettings",
  components: {},
  data() {
    return {
      trackTimeZone: false,
      trackTimeFormat: false,
      genSettings: {},
    };
  },
  methods: {
    showTimeZone() {
      this.trackTimeZone = !this.trackTimeZone;
    },
    showTimeFormat() {
      this.trackTimeFormat = !this.trackTimeFormat;
    },
    // getGenSettings() {
    //   HTTP.get("general_settings")
    //     .then((res) => {
    //       if (res.status == 200) {
    //         this.genSettings = res.data;
    //       }
    //       console.log(res);
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // },
  },
  mounted() {
    // this.getGenSettings();
  },
};
</script>

<style>
.heading {
  margin-top: 30px;
  font-family: "Inter";
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 20px;
}
.save {
  background: #e5e7eb;
  transition: background 0.3s ease-in;
}
.save:hover {
  background: #eff0f3;
}
.line {
  background: orange;
  width: 939px;
  border: 1px solid #f79009;
}
.dropdown-sub {
  margin-top: -15px;
}
.sub {
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 32px;
}
.sub1 {
  font-family: "Inter";
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 20px;
}
.sub2 {
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
}
.arrow {
  margin-top: 20px;
  cursor: pointer;
}
.tick {
  margin-left: 40px;
  margin-top: -10px;
}
/* .arrow:hover {
  background: rgb(254, 167, 5);
  width: 100%;
  border-radius: 50%;
} */
.dropdown-content {
  font-family: "Inter";
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 20px;
}
button {
  outline: none;
}
</style>