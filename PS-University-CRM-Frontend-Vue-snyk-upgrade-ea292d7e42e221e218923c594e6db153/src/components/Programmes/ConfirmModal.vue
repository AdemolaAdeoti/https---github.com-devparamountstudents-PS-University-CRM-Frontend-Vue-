<template>
  <div @click="$emit('closeConfirmModal')" class="modal">
    <div
      @click="(e) => e.stopPropagation()"
      class="modal-content d-flex align-items-center flex-column p-5"
    >
      <p class="">Are you sure you want to create this High School profile?</p>
      <button
        @click="$emit('createProgram')"
        class="w-100 mt-3 bg-warning border py-2 px-5"
      >
        Yes
      </button>
      <button
        @click="$emit('closeConfirmModal')"
        class="w-100 mt-3 border bg-transparent py-2 px-5"
      >
        No
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ConfirmModal",
};
</script>

<style scoped>
.modal {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal-content {
  width: fit-content;
  border-radius: 12px !important;
}
</style>
