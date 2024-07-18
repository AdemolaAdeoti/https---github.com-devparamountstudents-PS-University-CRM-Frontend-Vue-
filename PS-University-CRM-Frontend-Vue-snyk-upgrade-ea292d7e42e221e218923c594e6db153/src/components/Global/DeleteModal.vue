<template>
  <div>
    <!-- Button trigger modal -->
    <!-- <button
    type="button"
    class="btn btn-primary"
    data-toggle="modal"
    data-target="#exampleModalCenter"
  >
    Launch demo modal
  </button> -->

    <!-- Modal -->
    <div
      class="modal fade"
      id="deleteModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="deleteModalCenterTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-body">
            <h5 class="modal-title" id="deleteModalCenterTitle">Delete</h5>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-primary">OK</button>
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>
