<template>
  <div>
    <div class="skeletal-loader" v-for="r in row" :key="r">
      <div v-for="x in col" :key="x" class="skeletal-loader-item"></div>
    </div>
  </div>
</template>
  <script>
  export default {
    name: 'SkeletalLoader',
    props: {
      col: {
        type: Number,
        default: function () {
          return 3;
        }
      },
      row: {
        type: Number,
        default: function () {
          return 1;
        }
      }
    }
    // Component properties, methods, etc.
  }
  </script>
  
  <style>
  .skeletal-loader {
    display: flex;
    align-items: center;
  }
  
  .skeletal-loader-item {
    width: 100px;
    height: 20px;
    background-color: #e7e7e7;
    margin-right: 10px;
    animation: skeleton-loading 0.7s ease-in-out infinite alternate;
  }
  
  @keyframes skeleton-loading {
    0% {
      opacity: 0.8;
    }
    100% {
      opacity: 0.2;
    }
  }
  </style>
  