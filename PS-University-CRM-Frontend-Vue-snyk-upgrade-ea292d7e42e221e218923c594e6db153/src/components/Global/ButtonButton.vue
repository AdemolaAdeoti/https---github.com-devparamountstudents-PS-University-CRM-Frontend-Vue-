<template>
  <button @mouseover="!isLoading ? hovered = true : hovered = false " @mouseout="hovered = false" :disabled="isLoading"
  @click="clicked" :class="{'btn-disabled view-track btn text-dark px-4 py-2 d-flex':true,'justify-content-around':!showIcon,...buttonClasses }">
    <span v-if="showIcon">
      <img v-if="iconPath ===''" class="me-2" :src="getIconPath(icon)" alt="" />
      <span v-else v-html="iconPath"  :style="{ fill: hovered ? 'white' : 'black' }"> </span>
      <img class="me-2" :src="iconPath" alt="" />
    </span>
  
      <span style="display: flex;align-items: center;">
      <span v-if="loader" :style="`display:${isLoading?'inline-block':'none'}`" class="loader me-2"></span>      
      <span>{{ name }}</span>
    </span>
  </button>
</template>   

<script>

export default {
  props: {
    name: String,
    data: {      
      default:''
    },
    icon: {
      type: String,
      default: ''
    },
    showIcon:{
      type:Boolean,
      default:true
    },
    iconPath: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: '#fac515'
    },
    onClick: {
      type:Function,
      default:null
    },
    loader:{
      type:Boolean,
      default:false
    }
  },
  data(){
    return {
      hovered: false,
      isLoading:false,
    }
  },
  methods: {
    async clicked() {      
      if(this.onClick){
        this.isLoading = true
        await this.onClick();
        setTimeout(() => {          
          this.isLoading = false
        }, 300);
      }
      this.$emit('onclick', this.data)
    },
    getIconPath(icon) {

      try {
        return icon == '' ? require('/src/assets/images/d-board/student-application-black.svg') : require('/src/assets/images/d-board/' + icon)
      } catch (e) {
        console.log(e)
      }
    }
  },
  computed: {
    buttonClasses() {
      return {
        'view-track2': !this.isLoading
      };
    }
  }
}
</script>

<style  scoped>
/* $primary:v-bind('color') ;
$warning: #fdb022;
$scrollbar-thumb-bg: #dc6803;
$scrollbar-color: #f79009;
$gray: #d0d5dd;
 */
.active,
.view-track:active {
  background-color: v-bind('color') !important;
}

.view-track {
  font-size: 14px !important;
  transition: all 0.3s ease;
  box-shadow: inset 0 0 0 0 v-bind('color') !important;
  -webkit-transition: ease-out 0.4s !important;
  -moz-transition: ease-out 0.4s !important;
  transition: ease-out 0.4s !important;

}

.view-track2:hover {
  background-color: v-bind('color') !important;
  color: rgb(245, 245, 245) !important;
  transition: color 0.5s;
  box-shadow: inset 150px 0 0 0 v-bind('color') !important;
}
button.view-track:hover > span svg path {
    fill: white !important;
}
.loader {
  width: 15px;
  height: 15px;
  border-radius: 50%;  
  border-top: 3px solid #FFF;
  border-right: 3px solid transparent;
  box-sizing: border-box;
  animation: rotation .5s linear infinite;
}
.loader::after {
  content: '';  
  box-sizing: border-box;
  position: absolute;
  left: 0;
  top: 0;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  border-bottom: 3px solid #ffc400;
  border-left: 3px solid transparent;
}
@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
} 
</style>