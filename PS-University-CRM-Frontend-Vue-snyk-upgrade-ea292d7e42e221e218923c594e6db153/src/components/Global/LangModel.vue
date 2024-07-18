<template lang="html">
  <!-- Modal -->
  <div
    class="modal fade"
    id="exampleModal2"
    tabindex="-1"
    aria-labelledby="exampleModalLabel2"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-sm lang-modal">
      <div class="modal-content">
        <div class="modal-header">
          <p class="lang modal-title" id="exampleModalLabel2">
            <img
              :src="require('/src/assets/images/glob.svg')"
              alt="logo"
              width="20"
            />

            <span class="text-underline mx-2">Select Language</span>
          </p>
        </div>
        <div class="modal-body">
          <ul class="lang-nav-wrapper">
            <li
              data-bs-dismiss="modal"
              aria-label="Close"
              class="lang-nav d-flex justify-content-between"
            >
              English
              <span
                ><img :src="require('/src/assets/images/drop-tik.svg')" alt=""
              /></span>
            </li>
            <li class="lang-nav d-flex justify-content-between">Turkish</li>
            <li class="lang-nav d-flex justify-content-between">Arabic</li>
            <li class="lang-nav d-flex justify-content-between">French</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'LangModel',
};
</script>
<style lang=""></style>
