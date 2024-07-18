<template>
  <div>
    <!-- Button to open the modal -->
    <button @click="openModal" class="btn btn-warning compose-button">
      Compose Message
    </button>

    <!-- Modal -->
    <div class="gmail-compose-modal" :class="{ open: showModal }">
      <div class="modal-content">
        <!-- Modal Header -->
        <div class="modal-header">
          <h5 class="modal-title">Compose Message</h5>
          <div>
            <button @click="maximizeModal" class="me-2"  style="background-color: transparent; border: none">
              <i class="pi pi-window-maximize" style="color: slateblue"></i>
            </button>
            <button
              type="button"
              class="close"
              style="background-color: transparent; border: none"
              @click="closeModal"
            >
              <span aria-hidden="true" style="font-size: 32px">&times;</span>
            </button>
          </div>
        </div>

        <!-- Modal Body -->
        <div class="modal-body">
          <!-- Gmail-style input fields -->
          <form>
            <div class="form-group">
              <input
                type="text"
                class="form-control"
                placeholder="Subject"
                v-model="message.title"
              />
            </div>
            <div class="form-group">
              <!-- <textarea
                v-model="message.message"
                class="form-control"
                rows="10"
                placeholder="Compose your message..."
              ></textarea> -->
              <Editor
                class="editor-hieght"
                v-model="message.message"
                :editorStyle="!max ? 'min-height: 100px': 'min-height: 50vh'"
                placeholder="Compose your message..."
              />
            </div>
            <button
              type="button"
              class="mt-3 btn btn-warning"
              style="width: 100%; max-width: 100px;"
              @click="sendMessage"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
/* CSS for Gmail-style compose modal */
.gmail-compose-modal {
  display: none;
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  width: 500px;
  /* height: calc(55vh - 40px); */
  /* Half of the screen height minus 40px (adjust as needed) */
  overflow-y: auto;
  /* Add scroll if content exceeds modal height */
}

.modal-content {
  width: 100% !important;
}

.modal-body {
  height: fit-content !important;
}

.gmail-compose-modal.open {
  display: block;
}

.gmail-compose-modal .modal-body {
  padding: 15px;
}

/* Style input and textarea fields */
.gmail-compose-modal input[type="text"],
.gmail-compose-modal textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
  margin-bottom: 10px;
  font-size: 14px;
}
</style>

<script>
import { post } from "@/api/client";
import jquery from "jquery";
const $ = jquery;
import Editor from "primevue/editor";

export default {
  components: { Editor },
  props: {
    user_id: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      showModal: false,
      message: {
        title: "",
        message: "",
      },
      max: false
    };
  },
  methods: {
    openModal() {
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    async sendMessage() {
      let m = {
        ...this.message,
        user_id: this.user_id,
        owner_id: JSON.parse(localStorage.getItem("userInfo")).id,
        platform: "university",
      };
      await post("messages/send-message", m);
      this.message = {
        title: "",
        message: "",
      };
      $(".gmail-compose-modal").css("width", "500px").css("height", "fit-content");
      this.closeModal();
      this.$emit("messages");
    },
     maximizeModal() {
      this.max = !this.max
      if (this.max) {
        $(".gmail-compose-modal").css("width", "90%").css("height", "100vh");
      } else {
        $(".gmail-compose-modal").css("width", "500px").css("height", "fit-content");
      }
    },
  },
 
};
</script>
