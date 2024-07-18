<template lang="html">
  <div>
    <div class="div">
      <!-- Modal -->
      <div
        class="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <!-- <h5 class="modal-title" id="staticBackdropLabel">Modal title</h5> -->
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body mx-auto text-center pb-5 pt-1 px-5">
              <div class="mx-auto py-2">
                <img
                  :src="require(`/src/assets/images/${img}`)"
                  alt=""
                  srcset=""
                />
              </div>
              <h1 class="pt-3 fs-30 text-capitalize">{{head}}</h1>
              <p class="px-4 grey">{{subText}}</p>
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
  props: ["head", "img", "subText"],
};
</script>
<style lang=""></style>
