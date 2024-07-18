<template>
  <div class="h-auto py-3 mx-auto px-3">
    <!-- Read-Only Form -->
    <div class="row w-100">
      <div class="col-md-6">
        <div class="form-group">
          <label class="label-text" for="usr">University Name</label>
          <div>
            <span class="p-input-icon-right p-float-label" style="width: 100%">
              <InputText type="text" class="form-input w-100" :modelValue="dataUni?.name" disabled />
              <i class="pi">
                <img style="width: 50px; height: 50px; border-radius: 10px" :src="dataUni?.cover_photo_url != ''
                    ? dataUni?.cover_photo_url
                    : require('/src/assets/images/lock-icon.svg')
                  " alt="input-lock" />
              </i>
            </span>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="form-group w-100">
          <label class="label-text" for="usr">University Type</label>
          <div class="w-100">
            <span class="p-input-icon-right p-float-label" style="width: 100%">
              <InputText type="text" class="form-input w-100" :modelValue="dataUni?.type" disabled />
              <i class="pi">
                <img :src="require('/src/assets/images/lock-icon.svg')" alt="input-lock" />
              </i>
            </span>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div class="form-group" style="width: 100%">
        <label class="label-text">University Overview</label>
        <textarea class="form-control textarea" placeholder="" :autoResize="true" rows="4" cols="5"
          v-model="dataUni.overview"></textarea>
      </div>
    </div>
    <div class="form-group" style="width: 100%">
      <label class="label-text">University Ranking</label>
      <textarea class="form-control textarea" placeholder="" :autoResize="true" rows="3" cols="5"
        v-model="dataUni.ranking"></textarea>
    </div>
    <div class="form-group" style="width: 100%">
      <label class="label-text">Average Tuition cost per Year</label>
      <textarea class="form-control textarea" placeholder="" :autoResize="true" rows="3" cols="5"
        v-model="dataUni.yearly_cost"></textarea>
    </div>
    <div class="row w-100">
      <div class="col-6">
        <div class="form-group">
          <label class="label-text" for="usr">Country</label>
          <div>
            <span class="p-input-icon-left p-input-icon-right p-float-label" style="width: 100%">
              <i class="pi">
                <img :src="require('/src/assets/images/country-img.svg')" alt="input-lock" />
              </i>
              <InputText type="text" class="form-input w-100" :modelValue="dataUni?.country" disabled />
              <i class="pi">
                <img :src="require('/src/assets/images/lock-icon.svg')" alt="input-lock" />
              </i>
            </span>
          </div>
        </div>
      </div>
      <div class="col-6">
        <div class="form-group">
          <label class="label-text" for="usr">State</label>
          <div>
            <span class="p-input-icon-right p-float-label" style="width: 100%">
              <InputText type="text" class="form-input w-100" :modelValue="dataUni?.city" disabled />
              <i class="pi">
                <img :src="require('/src/assets/images/lock-icon.svg')" alt="input-lock" />
              </i>
            </span>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-12">
        <div class="form-group">
          <label class="label-text" for="usr">University location</label>
          <div>
            <span class="p-input-icon-left p-input-icon-right p-float-label" style="width: 100%">
              <i class="pi">
                <img :src="require('/src/assets/images/lock-icon.svg')" alt="input-lock" />
              </i>
              <InputText type="text" class="form-input2 w-100" :modelValue="dataUni?.address" disabled />
              <i class="pi">
                <img :src="require('/src/assets/images/lock-icon.svg')" alt="input-lock" />
              </i>
            </span>
          </div>
        </div>
      </div>
    </div>

    <div class="">
      <div class="form-group">
        <label class="label-text" for="usr">Postal Code</label>
        <div>
          <span class="p-input-icon-right p-float-label" style="width: 100%">
            <InputText type="text" class="form-input w-100" :modelValue="dataUni?.postal_code" disabled />
            <i class="pi">
              <img :src="require('/src/assets/images/lock-icon.svg')" alt="input-lock" />
            </i>
          </span>
        </div>
      </div>
    </div>

    <h6 class="mt-3">Upload Cover Photos</h6>
    <div class="mt-4 imageUpload" style="
        border: 2px dashed black;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        padding: 1rem;
        width: 100%;
        height: 350px;
        border-radius: 10px;
        font-size: 12px;
        font-weight: 400;
        position: relative;
      ">
      <label class="uploadInputLabel" for="uploadInput1">
        <img src="@/assets/images/upload-image.svg" alt="" />
        <input id="uploadInput1" class="uploadInput" type="file" accept="image/png, image/jpg" @change="uploadImage" />
      </label>
      <p>Drag and drop an image, or Browse</p>
      <p>1600x1200 or higher recommended. Max 10MB each (20MB for videos)</p>

      <p>High-resolution images (png, jpg)</p>

      <div class="d-flex justify-content-between w-80">
        <div v-for="image of dataUni?.galleries" :key="image.id">
          <img style="
              border-radius: 12px;
              overflow: hidden;
              width: 80px;
              height: 80px;
            " v-if="image" :src="image" alt="img" />
          <img style="width: 80px; height: 80px; filter: saturate(0) opacity(0.75)" v-else
            src="@/assets/images/upload-image.svg" alt="img" />
        </div>
      </div>
    </div>
    <h6 class="mt-3">Virtual Tour</h6>
    <div class="mt-4 imageUpload" style="
        justify-content: space-between;
        border: 2px dashed black;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 1rem;
        width: 100%;
        height: 450px;
        border-radius: 10px;
        font-size: 12px;
        font-weight: 400;
        color: rgba(82, 82, 82, 0.2);
      ">
      <label class="uploadInputLabel" for="uploadInput2">
        <img src="@/assets/images/upload-image.svg" alt="" />
        <input id="uploadInput2" class="uploadInput" type="file" accept="video/*,image/*" @change="uploadVideo" />
      </label>

      <p>Drag and drop an image, or Browse</p>
      <p>1600x1200 or higher recommended. Max 10MB each (20MB for videos)</p>
      <p>Videos (mp4, 4:3, &lt;60 secs)</p>
      <div class="d-flex justify-content-between w-80">
        <div style="
            width: 80px;
            height: 80px;
            border-radius: 12px;
            overflow: hidden;
            background-color: rgb(240, 240, 239);
          " v-for="(url, i) of uploadedFiles" :key="i">
          <div style="position: relative">
            <div @click="openModal(url)" style="border-radius: 12px !important; cursor: pointer">
              <img style="
                  width: 100%;
                  height: 100%;
                  filter: saturate(0) opacity(0.75);
                " :src="url" alt="img" />
              <div v-if="isVideo(url)" style="
                  position: absolute;
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%, -50%);
                ">
                <!-- Play icon or any other overlay you prefer -->
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24">
                  <path fill="none" d="M0 0h24v24H0V0z" />
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
            <div class="close-icon close" @click="removeFile(i)">
              <!-- Close icon -->
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path fill="none" d="M0 0h24v24H0V0z" />
                <path fill="red"
                  d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 md:col-4">
        <div class="position-relative p-inputgroup" style="width: 100%">
          <span style="
              background-color: transparent;
              height: 100%;
              width: 60px;
              margin: auto !important;
              position: absolute;
              z-index: 3;
              border: none;
              border-right: 2px solid black;
            " class="d-flex align-items-center justify-content-center p-inputgroup-addon">
            <img style="width: 25px" src="@/assets/images/globe2-bootstrap.icon.svg" alt="i" />
          </span>

          <InputText v-model="vidurl" class="w-100" placeholder="Please embed the link" />
          <button class="btn btn-secondary" @click="add()">Add</button>
        </div>
      </div>
    </div>
    <div class="row mx-auto pt-4">
      <div class="col-md-6">
        <P class="" >Do you want to create your own Virtual Tour for Your University ?</P>
      </div>
      <div class="col-md-4 mx-auto">
        <button class="backgroundImage">Request for Virtual Tour</button>
      </div>
    </div>

    <div class="d-flex pt-4">      
        <button @click="save" class="save-btn mx-3">Save</button>
        <button class="backgroundImage">Publish</button>      
    </div>

    <div v-if="showModal" class="modal-x">
      <div class="modal-x-content">
        <span class="close" @click="closeModal">&times;</span>
        <div v-if="isVideo(currentUrl)">
          <video controls autoplay>
            <source :src="currentUrl" type="video/mp4" />
          </video>
        </div>
        <div v-else>
          <img :src="currentUrl" alt="img" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// export default {
//     data() {
//         return {
//             vueTel: {
//                 phone: "",
//     props: {
//       clearable: true,
//       fetchCountry: true,
//       preferredCountries: ["US", "GB"],
//       noExample: false,
//       translations: {
//         countrySelectorLabel: "Country code",
//         countrySelectorError: "Error",
//         phoneNumberLabel: "Enter your phone",
//         example: "Example:"
//       }
//     }
//   },
//         }
//     },
// };
import { post, postFormData, get } from "@/api/client";
import { showModal } from "@/plugins/modal";
export default {
  props: ["university"],
  data() {
    return {
      showModal: false,
      currentUrl: "",
      tempVid: null,
      fullVideo: "",
      uploadedImgs: [
        { id: "1", image: null, url: null },
        { id: "2", image: null, url: null },
        { id: "3", image: null, url: null },
        { id: "4", image: null, url: null },
        { id: "5", image: null, url: null },
        { id: "6", image: null, url: null },
      ],
      uploadedFiles: [
      
      ],
      vidurl: "",
      virtualTour: [],
      dataUni: {
        galleries: [],
      },
    };
  },
  async created() {
    let res = await get('university/'+this.university?.id)
    if(res){
      
      this.dataUni =res.message;
      this.uploadedFiles = this.dataUni.virtual_tours
      this.dataUni.galleries = this.dataUni?.galleries.filter(
          (item) => item != ""
        );/* 
      if (this.university) {
        this.dataUni = this.university;
        this.dataUni.galleries = this.dataUni?.galleries.filter(
          (item) => item != ""
        );
      } */

    }
  },
  methods: {
    removeFile(index) {
      this.uploadedFiles.splice(index, 1);
    },
    isVideo(url) {
      const videoExtensions = [".mp4", ".avi", ".mov", ".mkv"]; // Add more video extensions if needed
      const fileExtension = url.substring(url?.lastIndexOf(".")).toLowerCase();
      return videoExtensions.includes(fileExtension);
    },
    add() {
      if (this.isVideo(this.vidurl)) {
        const video = document.createElement("video");
        video.src = this.vidurl;

        const loadMetadataPromise = new Promise((resolve) => {
          video.addEventListener("loadedmetadata", function () {
            resolve();
          });
        });

        loadMetadataPromise.then(() => {
          const duration = video.duration; // Video duration in seconds
          const fileSize = video.fileSize; // Video file size in bytes
          console.log("Video Duration:", duration);
          console.log("Video File Size:", fileSize);
          if (duration > 60 || fileSize > 2 * 1024 * 1024) {
            showModal({ text: "file size is > 2mb or duration > 1minutes" });
          } else {
            // Push to uploadedFiles after getting video properties
            this.uploadedFiles.push(this.vidurl);
            //this.uploadedFiles.push({ url: this.vidurl, duration, fileSize });
          }
        });
      } else {
        this.uploadedFiles.push(this.vidurl);
      }
      this.vidurl = "";
    },
    playVideo(e) {
      if (e.target.paused) {
        e.target.play();
      } else {
        e.target.pause();
      }
    },
    async uploadImage(e) {
      const image = e.target.files[0];

      if (
        e.target.files[0].size > 10 * 1024 * 1024 &&
        (image.type == "image/jpeg" || image.type == "image/png")
      ) {
        alert("Image size should be less than 10MB");
      } else {
        const formData = new FormData();
        formData.append("file", e.target.files[0]);
        formData.append(
          "folder_name",
          this.dataUni.name.replaceAll(" ", "_") ?? "university"
        );
        const res = await postFormData("file_upload", formData);
        this.dataUni.galleries.push(res?.responseBody);
      }
    },
    async uploadVideo(e) {
      let file = await e.target.files[0];

      if (file.size > 2000 * 1024 * 1024) {
        showModal({ text: "Video size should be less than 20MB" });
      } else {
        const formData = new FormData();
        formData.append("file", e.target.files[0]);
        formData.append(
          "folder_name",
          this.dataUni.name.replaceAll(" ", "_") ?? "university"
        );
        const res = await postFormData("file_upload", formData);
        this.uploadedFiles.push(res?.responseBody);
      }
    },
    async save() {
      /* this.location_title
      this.location_description */
      const res = await post("update_profile", {
        id: this.dataUni.id,
        galleries: this.dataUni.galleries,
        virtual_tours: this.uploadedFiles,
        overview: this.dataUni.overview,
        ranking: this.dataUni.ranking,
        yearly_cost: this.dataUni.yearly_cost,
      });
      if (res.status == "success") {
        showModal({ text: res.message });
      }
    },
    openModal(url) {
      this.showModal = true;
      this.currentUrl = url;
    },
    closeModal() {
      this.showModal = false;
      this.currentUrl = "";
    },
  },
};
</script>

<style scoped>
.container {
  margin-top: -30px;
  margin-bottom: 60px;
}

.imageUpload p {
  color: rgba(82, 82, 82, 0.8);
}

.uploadInput {
  background-color: red;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}

.uploadInputLabel {
  position: relative;

  cursor: copy;
}

.form-group {
  margin-top: 40px;
}

.input-groups {
  position: relative;
}

.backgroundImage {
  display: inline-block;
  background-color: #fac515;
  border-radius: 8px;
  padding: 8px 27px;
  border: none;
  font-size: 16px;
}

.save-btn {
  display: inline-block;
  background-color: #c3c9c4;
  border-radius: 8px;
  padding: 8px 27px;
  border: none;
  font-size: 16px;
}

.sub-input {
  margin-top: 72px;
}

.sub-input-last {
  margin-top: 112px;
}

.form-input {
  width: 400px;
  height: 44px;
  background: #eaecf0;
}

.form-input2 {
  width: 920px;
  height: 44px;
  background: #eaecf0;
}

.form-input-large {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px 14px;
  gap: 8px;
  position: absolute;
  width: 591px;
  height: 84px;
  margin-top: 4px;
  background: #eaecf0;
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
  border-radius: 8px;
}

.input-left-icon {
  position: absolute !important;
  width: 24px;
  height: 24px;
  top: 10px;
  left: 10px;
  /* margin-left: 329px;
        margin-top: 40px; */
}

.input-icon {
  position: absolute;
  width: 16px;
  height: 21px;
  top: 10px;
  right: 10px;
  /* margin-
        right: 410px;
        margin-top: 40px; */
}

.label-text {
  font-family: "Inter";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: #1d2939;
}

.form-input-large::-webkit-input-placeholder {
  width: 518px;
  height: 64px;
  position: absolute;
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #1d2939;
}

.country-form-input::-webkit-input-placeholder {
  padding-left: 50px;
  color: #1d2939;
}

.p-input-icon-left>i,
.p-input-icon-right>i {
  margin-top: -0.75rem;
}

/* Style the modal */
.modal-x {
  display: block;
  /* Show the modal */
  position: fixed;
  z-index: 9999;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.5);
  /* Black background with transparency */
}

/* Modal content */
.modal-x-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  height: 60vh;
  max-width: 800px;
  position: relative;
}

.modal-x-content div {
  height: 95%;
}

.modal-x-content div img {
  width: 100%;
  max-height: 100%;
  object-fit: contain;
}

/* Close button */
.close {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 24px;
  font-weight: bold;
  cursor: pointer;
}
.close-icon{
  z-index:2;
  top:-10px;
  right:-5px;
}
</style>
