<template lang="html">
  <div class="card my-2">
       <div class="card-body">
       <h1 class="card-title">Documents</h1>
       <div class="container px-0">
            <div class="  ">
              <div class="row d-flex flex-row" v-for="(name,i) in Object.keys(documents)" :key="i">
                <div class="col-1  m-6">
                  <div class="img-size  m-2"></div>
                </div>
                <div class="col-6 m-2" style="padding-left: 60px">
                  <h6 class="m-1">{{name}}</h6>
                  <p class="m-1 text-secondary text-xs">                 
                  </p>              
                </div>
                <div class="col-1" style="padding-left: 10px">
                  <button @click="viewDocument(documents[name])" class="view-btn btn text-dark m-3 px-2 py-2 d-flex">
                    <img class="me-2" :src="require('/src/assets/images/d-board/view.svg')" alt="">
                    view</button>
                </div>
              </div>
           
              
          
            </div>
       </div>
       <div v-if="showModal">
          <div class="modal-overlay" @click="closeModal"></div>
          <div class="modal-custom">
            <div class="modal-header">
              <button class="modal-close" @click="closeModal">X</button>
            </div>
            <div class="modal-body">
              <iframe :src="doc"></iframe>
            </div>
          </div>
      </div>
     </div>
   </div>
</template>

<script>
export default {
  name: "StudentDocument",
  props: ["document"],
  data() {
    return {
      showModal: false,
      stuForm: false,
      doc:"",
      selectedReview: null,
      AppliactionReview: ["In Review","Accepted", "Enrolled", "Rejected"],

      documents: [
        {
          id: 1,
          text: "High School Grade MarkSheet",
          size: "4.00mb",
          date: "25/05/2022",
        },
        {
          id: 2,
          text: "High School Certificates",
          size: "4.00mb",
          date: "25/05/2022",
        },
        {
          id: 3,
          text: "Formal Photo",
          size: "4.00mb",
          date: "25/05/2022",
        },
        {
          id: 4,
          text: "Passport font",
          size: "4.00mb",
          date: "25/05/2022",
        },
        {
          id: 5,
          text: "National ID Photo",
          size: "4.00mb",
          date: "25/05/2022",
        },
      ],
    };
  },
  methods:{
    viewDocument(doc) {
      this.showModal = true;      
      this.doc = doc
    },

    closeModal() {
      this.showModal = false;
      this.doc = "";
    },
  }
};
</script>

<style scoped>
.container {
  margin-bottom: 60px;
}

.application-review div {
  margin-bottom: 10px;
}

.img-size {
  border-radius: 2px;
  background-color: gray;
  height: 80px;
  width: 70px;
}

.label-text {
  font-size: 15px;
}

.btn-container {
  padding: 2px;
}

.view-btn {
  background-color: #eaecf0;
  display: flex;
  align-items: center;
  gap: 10px;
}

/* .view-btn:hover {
    color: rgb(245, 245, 245) !important;
    box-shadow: inset 150px 0 0 0 #fac515 !important;
} */

.view-btn img {
  width: 20px;
}

.save-next-btn {
  border-radius: 4px;
  width: 100%;
  padding: 0.6rem;
  border: none;
  background-color: #fac515;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10;
}

.modal-custom {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  height: 80%;
  background-color: white;
  border-radius: 5px;
  z-index: 11;
}

.modal-header {
  display: flex;
  justify-content: flex-end;
}

.modal-close {
  border: none;
  background-color: transparent;
  font-size: 1.5rem;
  cursor: pointer;
}

.modal-body {
  height: 100%;
  background: white;
}

iframe {
  width: 100%;
  height: 100%;
  border: none;
}

</style>