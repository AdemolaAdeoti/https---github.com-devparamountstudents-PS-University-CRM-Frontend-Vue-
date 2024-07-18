<template>
  <div class="main-progress-cbar">
    <div class="progress-circle " :class="{'over50':value>50}">
      <span >{{value}}%</span>

      <div class="left-half-clipper">
        <div class="first50-bar"></div>
        <div class="value-bar" :style="'transform: rotate('+Math.ceil(value/100 * 360) +'deg)'"></div>
      </div>
    </div>
  </div>
</template>
<script>
    export default{
        props:{
            value:{
                type:Number,
                default:0
            }
        }
    }
</script>
<style scoped>
.progress-circle {
  font-size: 20px;
  margin: 20px;
  position: relative;
  padding: 0;
  width: 5em;
  height: 5em;
  background-color: #f2e9e1;
  border-radius: 50%;
  line-height: 5em;
}

.progress-circle:after {
  border: none;
  position: absolute;
  top: 0.35em;
  left: 0.35em;
  text-align: center;
  display: block;
  border-radius: 50%;
  width: 4.3em;
  height: 4.3em;
  background-color: white;
  content: " ";
}

.progress-circle span {
  position: absolute;
  line-height: 5em;
  width: 5em;
  text-align: center;
  display: block;
  color: #53777a;
  z-index: 2;
}
.left-half-clipper {
  border-radius: 50%;
  width: 5em;
  height: 5em;
  position: absolute;
  clip: rect(0, 5em, 5em, 2.5em);
}

.progress-circle.over50 .left-half-clipper {
  clip: rect(auto, auto, auto, auto);
}
.value-bar {
  position: absolute;
  clip: rect(0, 2.5em, 5em, 0);
  width: 5em;
  height: 5em;
  border-radius: 50%;
  border: 0.45em solid #53777a;
  box-sizing: border-box;
}

.progress-circle.over50 .first50-bar {
  position: absolute;
  clip: rect(0em, 5em, 5em, 2.5em);
  background-color: #53777a;
  border-radius: 50%;
  width: 5em;
  height: 5em;
}

/* Progress bar rotation position */
.progress-circle.p0 .value-bar {
  display: none;
}
.progress-circle.p1 .value-bar {
  transform: rotate(4deg);
}
</style>