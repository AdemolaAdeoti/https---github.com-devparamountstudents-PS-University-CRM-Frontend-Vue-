<!--<template>
  <div>
    <RequestLoader />
    <div class="d-flex justify-content-between">
      <div>
        <h3 class="mx-5 fw-bold mb-0 mt-1">Promotions</h3>
      </div>
      <div class="mx-5">
        <button class="backgroundImage" @click="createPromotion()">
          <img
            :src="require(`/src/assets/images/add-outline.svg`)"
            style="height: 20px; width: 20px; margin-bottom: 2px"
          />
          Create Promotion
        </button>
      </div>
    </div>
    <hr style="border: 1px solid #f79009" />
    <DashboardCard :doc-file-count="docFileCount" />
    <hr style="border: 1px solid #f79009" />
    <div class="d-flex justify-content-end">
      <!-- <div></div> --
      <div class="mx-5">
        <button
          v-if="!filterIsVisible"
          class="backgroundImage"
          @click="toggleFilter()"
        >
          <img
            :src="require(`/src/assets/images/fiter-icon.svg`)"
            style="height: 20px; width: 20px; margin-bottom: 2px"
          />
          Filter
        </button>
      </div>
    </div>

    <PromotionFilter v-if="filterIsVisible" @closeFilter="toggleFilter()" />

    <hr style="border: 1px solid #f79009" />
    <div class="w-100" style="overflow-x:auto;">
      <PromotionCourses
        v-for="course in promotions"
        :course="course"
        :key="course.id"
      />
    </div>
  </div>
</template>

<script>
import DashboardCard from "@/components/Global/DashboardStat.vue";
import PromotionCourses from "@/components/Promotion/PromotionCourses";
import PromotionFilter from "@/components/Promotion/PromotionFilter.vue";
import { usePromotionsStore } from "../../stores/promotions";
//import getPromotions from "../../utilities/mixins/getPromotions";
//import RequestLoader from "@/components/Global/RequestLoader.vue";
import { get } from "@/api/client";
import { showModal } from '@/plugins/modal'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Promotions",
  components: {
    DashboardCard,
    PromotionFilter,
    PromotionCourses,    
  },
  data() {
    return {
      promotions:[],
      filterIsVisible: false,
      courses: [],
      totalPromotions: 0,
      statusCount: {
        ongoing: 0,
        expired: 0,
      },
      docFileCount: [
        {
          id: 1,
          style: "px-lg-3 p-3 py-4 rounded bg-white",
          count: 0,
          img: "arrow-1.svg",
          title: "Total",
          excerpt: "All",
          class: "col-md-4 col-sm-12 mb-3    px-lg-5 ",
          borderColor: {
            border: "2px solid #7375FD !important",
            "border-radius": "10px !important",
            width: "100% !important",
            height: "152px !important",
          },
        },
        {
          id: 2,
          style: "px-lg-3 p-3 py-4 rounded bg-white",
          count: 0,
          img: "arrow-2.svg",
          title: "In Progress",
          excerpt: "Ongoing",
          class: "col-md-4 col-sm-12 mb-3    ",
          borderColor: {
            border: "2px solid #32D583 !important",
            "border-radius": "10px !important",
            width: "100% !important",
            height: "152px !important",
          },
        },
        {
          id: 3,
          style: "px-lg-3 p-3 py-4 rounded  bg-white",
          count: 0,
          img: "arrow-3.svg",
          title: "Expired",
          excerpt: "Expired",
          class: "col-md-4 col-sm-12 mb-3   px-lg-5",
          borderColor: {
            border: "2px solid #F97066 !important",
            "border-radius": "10px !important",
            width: "100% !important",
            height: "152px !important",
          },
        },
      ],
    };
  },
  async created(){
    
    let res2 = await get('promotion/dashboard');
    if(res2.message){      
      res2 = res2.message;
      let keys = Object.keys(res2);
      this.docFileCount.forEach((item, i) => {
        item.count = res2[keys[i]] || 0;
        //item.title = keys[i]?.replaceAll('_',' ');
      });
    }
    let res = await get('promotions');
    this.promotions = res.message
  },
  methods: { 
    createPromotion() {
      this.$router.push(`/create-promotions`);
    },
    toggleFilter() {
      this.filterIsVisible = !this.filterIsVisible;
    },
    async checkPromotions(data) {
      if (!data && data !== undefined) {
        // console.log(data);
        showModal({text:"There was an error fetching the data!"});
      } else {
        // console.log(data);
        this.setPromotions(data);
      }
    },
    setPromotionCount() {
      // const store = usePromotionsStore();
      // const statusCount = store.$state.statusCount;
      // this.statusCount = statusCount;
      this.docFileCount = this.docFileCount.map((fileCount) => {
        const file = fileCount;
        if (file.excerpt == "All") {
          this.totalPromotions >= 10
            ? (file.count = this.totalPromotions)
            : (file.count = "0" + this.totalPromotions);
        } else if (file.excerpt == "Ongoing") {
          this.statusCount.ongoing >= 10
            ? (file.count = this.statusCount.ongoing)
            : (file.count = "0" + this.statusCount.ongoing);
          console.log(this.statusCount, file.title);
        } else if (file.excerpt == "Expired") {
          this.statusCount.expired >= 10
            ? (file.count = this.statusCount.expired)
            : (file.count = "0" + this.statusCount.expired);
          // console.log(this.statusCount, file.title);
        }
        return file;
      });
    },
    setStatuses(promotions) {
      promotions.map((promotion) => {
        if (promotion.status == "Draft" || promotion.status == "ongoing") {
          const ongoing = this.statusCount.ongoing;
          this.statusCount.ongoing = ongoing + 1;
        } else {
          const expired = this.statusCount.expired;
          this.statusCount.expired = expired + 1;
        }
      });
    },
    setPromotions(promo) {
      let promotions = [];
      promo?.data?.map((obj) => {
        const program = obj.program;
        if (program) {
          program.duration = obj.duration + " Days";
          promotions.push(program);
        }
        promotions.push(obj);
      });
      this.courses = promotions;
      this.totalPromotions = promotions.length;
      this.setStatuses(this.courses);
      this.setPromotionCount();
      this.setPromotionsStore(this.courses);
      // console.log(this.courses);
    },
    setPromotionsStore(promo) {
      const store = usePromotionsStore();
      // this.setPromotions(promo);
      store.setPromotions(promo.data);
      store.setStatusCount(this.statusCount);
    },
  },
  beforeMount() {    
    // this.getPromotions();
  },
  // mounted() {},
};
</script>

<style scoped>
.backgroundImage {
  display: inline-block;
  background-color: #fac515;
  border-radius: 8px;
  padding: 8px 27px;
  border: none;
  font-size: 16px;
}
</style>
