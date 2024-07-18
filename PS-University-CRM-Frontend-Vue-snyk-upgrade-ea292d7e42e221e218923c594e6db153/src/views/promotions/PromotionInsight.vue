<!--<template>
  <header class="d-flex justify-content-between container">
    <h2><button @click="$router.go(-1)" class="btn btn-sm py-1 me-2">Back</button>Promotion Insight</h2>
    <div>
      <Calendar
        v-model="dateRange"
        selectionMode="range"
        placeholder="day/month/year - day/month/year"
        @change="getInsight()"
        class="w-100"
      />
    </div>
  </header>
  <hr style="border: 1px solid #f79009" />
  <!-- heading card --
  <div class="w-100 ">
    <div class="row mx-auto px-3 my-5">
      <div v-for="insight in insights" :key="insight.id" class="col">
        <div
          class="px-3 py-2 border border-2 rounded bg-transparent"
          :class="
            insight.title === 'reach'
              ? 'border-primary'
              : insight.title === 'impression'
              ? 'border-success'
              : 'border-warning'
          "
        >
          <div class="d-flex justify-content-between mb-3 align-items-start">
            <h2 class="font-weight-bold h1">{{ insight.total || "--" }}</h2>
            <img
              :src="
                insight.title == 'reach'
                  ? `/img/arrow-1.365c3760.svg`
                  : insight.title == 'impression'
                  ? `/img/arrow-3.5be852b6.svg`
                  : `/img/arrow-2.45d62ee4.svg`
              "
              alt=""
            />
          </div>
          <small class="font-weight-bold">TOTAL</small>
          <p class="font-weight-bold text-capitalize h1 mt-1">
            {{ insight.title }}
          </p>
        </div>
      </div>
    </div>
  </div>
  <hr style="border: 1px solid #f79009" />

  <!-- Graphs --

  <div v-if="insights && insights.length > 0" class="row px-4">
    <!-- Line Chart starts --
    <div class="col-6 mx-auto rounded  px-3 my-5">
      <h6 class="my-4">Reachs</h6>
      <InsightLineChart :datasets="reachs" name="Reach" />
    </div>
    <div class="col-6 mx-auto  rounded  px-3 my-5">
      <h6 class="my-4">Impressions</h6>
      <InsightLineChart :datasets="impressions" name="Impressions"/>
    </div>
    <!-- Bar chart starts --
    <div class="col-12 mx-auto bg-white rounded mt-5">
      <InsightBarChart :datasets="countries_impression" name="countries Impressions" />
    </div>
    <div class="col-12 mx-auto bg-white rounded mt-5">
      <InsightBarChart :datasets="countries_reach" name="countries Reach" />
    </div>
    <!-- Bar charts ends --
  </div>
  <div v-else class="text-center mt-5">
    <img src="./../../assets/images/no-data-found.png" alt="" />
    <h3>No data found</h3>
    <p>It seems we can’t find any data based on your request.</p>
  </div>
</template>

<script>
import Calendar from "primevue/calendar";
import InsightBarChart from "@/components/Promotion/InsightBarChart.vue";
import InsightLineChart from "@/components/Promotion/InsightLineChart.vue";
import { get,post } from "@/api/client";
export default {
  components: {
    InsightBarChart,
    InsightLineChart,
    Calendar,
  },
  data() {
    return {
      reachs:[],
      impressions:[],
      countries_reach:[],
      countries_impression:[],
      dateRange: null,
      insights: [
        {
          id: 1,
          title: "Reach",
          total: 0,
        },
        {
          id: 2,
          title: "Impression",
          total: 0,
        },
        {
          id: 3,
          title: "Amount Spent (USD)",
          total: 0,
        },
      ],
    };
  },
  watch: {
    dateRange(newval) {
      if (newval.includes(null)) {
        return;
      }
      this.getInsight(newval);
    },
  },
  created(){
    this.getInsight()
  },
  methods: {
    async getInsight(date=null) {
      let res2  = null
      if(date != null){
         res2 = await post('promotion/insight/'+this.$route.params.id,{date});
      }else{
         res2 = await get('promotion/insight/'+this.$route.params.id);
      }
      if(res2?.message){      
        this.reachs = res2.message.reach
        this.impressions = res2.message.impression
        this.countries_reach = res2.message.countries_reach
        this.countries_impression = res2.message.countries_impression
        this.insights.map((item)=>{
          if(item.id==3){            
            item.total = res2.message.stats.Amount_Spent            
          }else{
            item.total = res2.message.stats[item.title.replaceAll(' ', '_')] 
          }
        })        
      }
      
    },
  },
};
</script>
