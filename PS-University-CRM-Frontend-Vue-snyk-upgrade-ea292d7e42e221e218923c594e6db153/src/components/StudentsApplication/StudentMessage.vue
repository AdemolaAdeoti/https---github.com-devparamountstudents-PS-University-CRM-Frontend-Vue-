<template>
  <div @click="toggleMessageDisplay"  style="cursor:pointer;"  class="hover card p-2">
    <h6 class="text-dark p-0 text-dark fw-bold">{{ message.title }}</h6>
    <div >
      <span class="text-secondary p-0" v-if="!showFullMessage" v-html="truncatedMessage"></span>
      <div v-else class="text-secondary p-0 bg-light border text-secondary p-3" v-html="message.message" ></div>
    </div>
  </div>
  <hr />
</template>

<script>
export default {
  props: {
    message: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      showFullMessage: false,
    };
  },
  computed: {
    truncatedMessage() {
      const maxLength = 100;
      if (this.message.message.length <= maxLength) {
        return this.message.message;
      }
      return this.message.message.slice(0, maxLength) + "...";
    },
  },
  methods: {
    toggleMessageDisplay() {
      this.showFullMessage = !this.showFullMessage;
    },
  },
};
</script>

<style scoped>
.h5 {
  color: #1d2939;
  font: 16px Inter;
}
.p {
  color: #1d2939;
  font: 12px Inter;
}
.hover:hover{
  background: #ccc;
}
</style>
