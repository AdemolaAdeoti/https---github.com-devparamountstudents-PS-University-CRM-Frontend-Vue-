<!--<template>
  <div class="d-flex justify-content-between my-4">
    <h6>{{this.name}}</h6>
   <!--  <div>
      <Calendar
        v-model="dateRangeValue"
        selectionMode="range"
        placeholder="day/month/year - day/month/year"        
        class="w-100"
      />
    </div> --
  </div>
  <div style="height: 24rem">
    <Chart
      type="bar"
      :data="chartData"
      :options="chartOptions"
      style="height: 100%"
    />
  </div>
</template>

<script>
import Chart from "primevue/chart";
//import Calendar from "primevue/calendar";
export default {
  props: {
    datasets: {
      type: Array,
      required: true,
    },
    name: String,
  },
  components: {
    Chart,
    //Calendar,
  },
  data() {
    return {
      dateRangeValue:null,
      dateRange: [],
      datasetsD:[],
      chartData: {
        labels: [], // Initialize with an empty array for labels
        datasetsD: [], // Initialize with an empty array for datasetsD
      },
      chartOptions: {
        maintainAspectRatio: false,
        aspectRatio: 0.2,
        plugins: {
          legend: {
            labels: {
              fontColor: "#000",
            },
          },
        },
        scales: {
          x: {
            ticks: {
              color: "#000",
              font: {
                weight: 600,
              },
            },
            grid: {
              display: false,
              drawBorder: false,
            },
          },
          y: {
            ticks: {
              color: "#000",
            },
            grid: {
              color: "#aaa",
              drawBorder: false,
            },
          },
        },
      },
      dateColorMap: {}, 
    };
  },
  watch: {
    datasets: {
      handler(newval) {      
        if (newval == null) {
          return;
        }
        this.datasetsD = this.datasets
        this.getChart();
      },
    },
  },
  methods: {
    dateChange(){
      alert(JSON.stringify(this.dateRangeValue))
    },
    getDateColor(date) {
      // Check if the date already has a color assigned
      if (!this.dateColorMap[date]) {
        // If not, generate a random color and store it in the map
        this.dateColorMap[date] = getRandomColor();
      }
      return this.dateColorMap[date];
    },
    getChart() {
      // Clear existing data

      const uniqueDates = [...new Set(this.datasetsD.flatMap((item) => item.reaction_date))];
        
        // Sort the dates in ascending order
      this.dateRange = uniqueDates.sort();

      this.chartData.labels = [];
      this.chartData.datasets = [];

      // Loop through the datasetsD and update chartData
      this.datasetsD.forEach((item) => {
        const dataset = {          
          label: item.country,
          backgroundColor: this.getDateColor(item.country),
          borderColor: this.getDateColor(item.country),
          data: [],
        };

        // Loop through the data points for each country
        this.dateRange.forEach((date) => {
          const dataPoint = item.reaction_date === date;
          dataset.data.push(dataPoint ? item.count : 0);
        });

        this.chartData.labels = this.dateRange;
        this.chartData.datasets.push(dataset);
      });
    },
  },
  created(){
    this.datasetsD = this.datasets
    this.getChart()
  }
};

// Function to generate random colors for dataset
function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
</script>
