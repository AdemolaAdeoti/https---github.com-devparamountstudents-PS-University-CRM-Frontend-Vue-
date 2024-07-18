<template lang="html">
  <div>
  
    <div
      class="offcanvas offcanvas-start"
      tabindex="-1"
      id="offcanvas"
      aria-labelledby="offcanvasLabel"
    >
      <!-- <div class="offcanvas-header"> -->
      <!-- <h5 class="offcanvas-title" id="offcanvasLabel">Offcanvas</h5> -->
      <!-- <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas"
                    aria-label="Close"></button> -->
      <!-- </div> -->
      <div class="offcanvas-body">
        <!-- <div class="px-0 bg-light shadow-sm position-fixed sidenav col-18 vh-100"> -->
        <SideBar :links="links" :currentId="currentId" />
        <!-- </div> -->
      </div>
    </div>
  </div>
</template>
<script>
import SideBar from './SideBar.vue';
export default {
  name: 'OffCanvas',
  props: ['links', 'currentId'],
  methods: {
    displayText(linkId, linkTerms, link) {
      this.$emit('displayText', { linkId, linkTerms, link });
    },
  },
  components: { SideBar },
};
</script>
<style scoped>
.offcanvas {
  width: 300px;
}
.offcanvas-body {
  padding: 0px !important;
}
</style>