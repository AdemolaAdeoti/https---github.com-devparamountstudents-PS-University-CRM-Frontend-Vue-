<template lang="html">  
    <span v-if="store.isLoading" class="loader"></span>         
</template>
<script >
  import { useUserStore } from '@/stores/user'
  export default {
    data(){
      return {
        store : useUserStore() 
      }
    }  
  }
</script>


<style scoped>
.loader {
    width: 100%;
    height: 2.8px;
    display: inline-block;
    background: rgba(173, 170, 170, 0.15);
    position: fixed;
    top:0;
    z-index: 1412;
    overflow: hidden;
  }
  .loader::after {
    content: '';  
    width: 0%;
    height: 2.8px;
    background-color:  orange ;
    /* background-image: repeating-linear-gradient(45deg, v-bind(color), rgba(255,255,255,.1) 25%, v-bind(color) 50%, rgba(255,255,255,.1) 75%,transparent 25%);
    background-size: 7.5px 7.5px; */
    position: absolute;
    top: 0;
    left: 0;
    box-sizing: border-box;
    animation: animFw 10s ease-in-out infinite;
  }
  
  @keyframes animFw {
    0% {
      width: 0;      
    }
    100% {
      width: 100%;      
    }
}
</style>