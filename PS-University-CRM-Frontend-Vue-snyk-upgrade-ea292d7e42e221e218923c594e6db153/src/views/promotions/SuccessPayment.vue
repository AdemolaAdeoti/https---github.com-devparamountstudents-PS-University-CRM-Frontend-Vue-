<!--<template>
  <teleport to="body">
    <TheModal @close="$emit('close')">
      <div class="d-flex justify-content-center">
        <img
          src="./../../assets/images/mark-successful.png"
          alt=""
          class="mx-auto"
        />
      </div>
      <h4 class="w-75 text-center mx-auto font-weight-bold mt-5">
        Payment Successful
      </h4>
      <p class="w-75 text-center mx-auto" style="font-size: 13px">
        Your receipt will automatically download. If the download doesn’t start,
        <span class="text-success text-underline">click here</span>
      </p>
    </TheModal>
  </teleport>
</template>

<script>
export default {
  emits: ["close"],
};
</script>
