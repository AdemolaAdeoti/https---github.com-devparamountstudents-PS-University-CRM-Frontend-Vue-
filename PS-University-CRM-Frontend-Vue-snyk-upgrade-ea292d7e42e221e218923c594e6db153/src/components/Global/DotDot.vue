<template >
    <div style="display:inline-block">
        <div class="snippet" data-title="dot-elastic">
            <div class="stage">
                <div class="dot-elastic"></div>
            </div>
        </div>      
    </div>
</template>
<script>

</script>

<style scoped>
.dot-elastic {
  position: relative;
  width: 10px;
  height: 10px;
  display: inline-block;
  border-radius: 5px;
  background-color: #ffc05b;
  color: #ffc05b;
  animation: dot-elastic 1s infinite linear;
}
.dot-elastic::before, .dot-elastic::after {
  content: "";
  display: inline-block;
  position: absolute;
  top: 0;
}
.dot-elastic::before {
  left: -15px;
  width: 10px;
  height: 10px;
  border-radius: 5px; 
  background-color:  #ffc05b;
  color:  #ffc05b;
  animation: dot-elastic-before 1s infinite linear;
}
.dot-elastic::after {
  left: 15px;
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color:  #ffc05b;
  color:  #ffc05b;
  animation: dot-elastic-after 1s infinite linear;
}

@keyframes dot-elastic-before {
  0% {
    transform: scale(1, 1);
  }
  25% {
    transform: scale(1, 1.5);
  }
  50% {
    transform: scale(1, 0.67);
  }
  75% {
    transform: scale(1, 1);
  }
  100% {
    transform: scale(1, 1);
  }
}
@keyframes dot-elastic {
  0% {
    transform: scale(1, 1);
  }
  25% {
    transform: scale(1, 1);
  }
  50% {
    transform: scale(1, 1.5);
  }
  75% {
    transform: scale(1, 1);
  }
  100% {
    transform: scale(1, 1);
  }
}
@keyframes dot-elastic-after {
  0% {
    transform: scale(1, 1);
  }
  25% {
    transform: scale(1, 1);
  }
  50% {
    transform: scale(1, 0.67);
  }
  75% {
    transform: scale(1, 1.5);
  }
  100% {
    transform: scale(1, 1);
  }
}
</style>