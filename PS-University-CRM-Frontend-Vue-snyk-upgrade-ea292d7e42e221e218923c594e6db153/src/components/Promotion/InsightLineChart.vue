<!--<template>
  <div  v-if="showChars" style="height: 24rem" class="bg-white position-relative w-100 rounded shadow-lg">
    <Chart
      type="line"
      :data="chartData"
      :options="chartOptions"
      style="height: 100%"
    />
  </div>
</template>

<script>
import Chart from "primevue/chart";
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
  },
  watch: {
    // Watch for changes to the "datasets" prop
    datasets: {
      handler(newDatasets, oldDatasets) {
        // Perform actions when "datasets" prop changes
        console.log("Prop 'datasets' changed:", oldDatasets);
        
        // You can update the chartData or do other things here
        // For example, update chartData.labels and chartData.datasets[0].data
        
        this.chartData.labels = [];
        this.chartData.datasets[0].data = [];
        
        newDatasets.forEach((item) => {
          this.chartData.labels.push(item.reaction_date);
          this.chartData.datasets[0].data.push(item.count);
        });
        
        // Set showChars to true after updating data
        this.showChars = true;
      },
      deep: true, // Enable deep watching for nested arrays or objects within "datasets"
    },
  },
  data() {
    return {
      showChars:false,
      chartData: {
        labels: [], // Initialize with an empty array for labels
        datasets: [
          {
            label: this.name,
            fill: false,
            tension: 0.4,
            borderColor: "#16B1FF",
            
            backgroundColor: "#16B1FF", // Set the point background color
            pointRadius: 4, // Set the point radius
            data: [],           
          },
        ],
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
              color: "#aaa",
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
    };
  },
  created() {    
    console.log(this.datasets, this.chartData)
    this.datasets.forEach((item) => {
      this.chartData.labels.push(item.reaction_date)
      this.chartData.datasets[0].data.push(item.count);
      console.log(this.datasets, this.chartData)
    });    
    this.showChars = true
  },
};
</script>
