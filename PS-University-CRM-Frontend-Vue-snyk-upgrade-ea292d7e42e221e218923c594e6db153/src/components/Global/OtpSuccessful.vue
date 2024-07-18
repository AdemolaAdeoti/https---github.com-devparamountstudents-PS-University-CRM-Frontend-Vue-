<template lang="html">
  <div>
    <div class="div">
      <!-- Modal -->
      <div
        class="modal fade"
        id="exampleModal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body mx-auto text-center py-5">
              <div class="mx-auto py-2">
                <img
                  :src="require(`/src/assets/images/${img}`)"
                  alt=""
                  srcset=""
                />
              </div>
              <h2 class="pt-3 pb-1">{{ head }}</h2>
              <p class="px-5 mx-3">{{ subText }}</p>
              <p  @click="home" data-bs-dismiss="modal" aria-label="Close" class="cursor text-blue">{{ click }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  // name: 'Modal',
  props: ["head", "img", "subText", "url", "click"],
  methods: {
    home() { this.$router.push(this.url); },

  },
};
</script>
<style lang=""></style>
