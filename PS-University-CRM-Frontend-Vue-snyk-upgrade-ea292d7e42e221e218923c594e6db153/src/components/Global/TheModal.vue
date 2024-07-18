<template>
  <transition name="backdrop">
    <div class="backdrop" @click="tryClose"></div>
  </transition>
  <transition name="content" mode="out-in">
    <div class="z-50 p-4 message" :class="small">
      <div v-if="!fixed" class="d-flex justify-content-end">
        <div @click="tryClose">
          <img src="../../assets/images/close.png" alt="" style="width: 16px" />
        </div>
      </div>
      <slot></slot>
    </div>
  </transition>
</template>

<script>
export default {
  emits: ["close"],
  props: {
    fixed: {
      type: Boolean,
      default: false,
    },
    small: String,
  },
  methods: {
    tryClose() {
      if (this.fixed) {
        return;
      }
      this.$emit("close");
    },
  },
};
</script>



<style scoped>
img,
.backdrop {
  cursor: pointer;
}
.backdrop {
  position: fixed;
  top: 0;
  z-index: 100;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(10px);

  /* fixed top-0 z-40 h-full w-full bg-slate-500 bg-opacity-25 backdrop-blur-lg */
}
.message {
  left: 50%;
  top: 50%;
  position: fixed;
  background: white;
  transform: translate(-50%, -50%);
  min-width: 23rem;
  z-index: 120;
  min-height: 10rem;
}

.backdrop-enter-from,
.content-enter-from,
.backdrop-leave-to,
.content-leave-to {
  opacity: 0;
  transform: translateY(-5rem);
}
.backdrop-enter-active {
  transition: all 0.4s ease-out;
}
.content-enter-active,
.content-leave-active {
  transition: all 0.5s ease-out;
}

.backdrop-enter-to,
.content-enter-to,
.backdrop-leave-from,
.content-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>