<template>
  <div class="py-3">
    <div class="d-flex pr-2 align-items-center gap">
      <img :src="school.cover_photo_url || require('/src/assets/images/d-img.svg')" alt="logo" class="dp" />
      <div class="d-flex align-items-center ml-5 gap">
        <div class="upload-button">
          <input @change="uploadProfilePhoto($event)" style="display: none" type="file" ref="fileInput" />
          <span v-if="attachedFileName">
            {{ attachedFileName }}
            <span @click="attachedFileName = ''" class="remove-file">Remove</span>
          </span>
          <div v-if="!attachedFileName" @click="$refs.fileInput.click()" id="attach-file" type="button"
            class="upload-text">
            Upload new picture
          </div>
        </div>
        <!-- <button class="btn btn-secondary">Delete</button> -->
      </div>
    </div>

    <!-- Read-Only Form -->
    <div class="form-group">
      <div class="p-input-icon-right p-float-label w-100">
        <label class="label-text" for="userId">Your ID</label>
        <InputText  type="text" id="userId" class="form-input w-100 form-control" :value=user.unique_id
          aria-label="Disabled input example" disabled readonly />
        <i class="pi">
          <img :src="require('/src/assets/images/lock-icon.svg')" alt="input-lock" />
        </i>
      </div>
    </div>
    <div class="form-group">
      <div class="p-input-icon-right p-float-label w-100">
        <label class="label-text" for="schoolName">High School Name</label>
        <InputText  type="text" id="schoolName" class="form-input w-100" :value=school.name
          aria-label="Disabled input example" disabled readonly />
        <i class="pi">
          <img :src="require('/src/assets/images/lock-icon.svg')" alt="input-lock" />
        </i>
      </div>
    </div>
    <div class="form-group">
      <span class="p-input-icon-right p-float-label w-100">
        <label class="label-text" for="usr">Registered Date</label>
        <InputText  type="text" class="form-input w-100" :value=school.registered_date aria-label="Disabled input example"
          disabled readonly />
        <i class="pi">
          <img :src="require('/src/assets/images/lock-icon.svg')" alt="input-lock" />
        </i>
      </span>
    </div>
    <div class="form-group">
      <span class="p-input-icon-right p-float-label w-100">
        <label class="label-text" for="usr">Registered Email Address</label>
        <InputText  type="text" class="form-input w-100" :value=user.email
          aria-label="Disabled input example" disabled readonly />
        <i class="pi">
          <img :src="require('/src/assets/images/lock-icon.svg')" alt="input-lock" />
        </i>
      </span>
    </div>
    <div class="form-group">
      <span class="p-input-icon-right p-float-label w-100">
        <label class="label-text" for="usr">First Name</label>
        <InputText  type="text" class="form-input w-100" :value=user.first_name aria-label="Disabled input example" disabled
          readonly />
        <i class="pi">
          <img :src="require('/src/assets/images/lock-icon.svg')" alt="input-lock" />
        </i>
      </span>
    </div>
    <div class="form-group">
      <span class="p-input-icon-right p-float-label w-100">
        <label class="label-text" for="usr">Last Name</label>
        <InputText  type="text" class="form-input w-100" :value="user.last_name" aria-label="Disabled input example" disabled readonly />
        <i class="pi">
          <img :src="require('/src/assets/images/lock-icon.svg')" alt="input-lock" />
        </i>
      </span>
    </div>
  </div>
</template>

<script>
import { postFormData, post } from "@/api/client";
export default {
  name: "SchoolInfo",
    data() {
      return {
        school: {},
        user: {},
      };
    },
    created() {
      this.user = JSON.parse(localStorage.getItem("userInfo"));
      this.school = this.user.university;
    },

  methods: {
    async uploadProfilePhoto(event) {
      const file = event.target.files[0];
      const formdata = new FormData();
      formdata.append("file", file);
      formdata.append("folder_name", "university");
      const imgUpload = await postFormData(
        'file_upload',
        formdata
      );
      await post('upload_profile_photo', {
        cover_photo_url: imgUpload,
      });
      this.user.high_school.cover_photo_url = imgUpload;
      localStorage.setItem("userInfo", JSON.stringify(this.user));
    },
  },
};
</script>

<style scoped>
.dp {
  border-radius: 100%;
  width: 5rem;
  height: 5rem;
}

.gap {
  gap: 1.5rem;
}

.container {
  margin-bottom: 60px;
}

.delete-button {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 8px;
  position: absolute;
  width: 54px;
  height: 34px;
  left: 563px;
  top: 255px;
  background: #e5e7eb;
  border-radius: 8px;
}

.form-group {
  margin-top: 3rem;
}

.sub-input {
  margin-top: 72px;
}

.form-input {
  width: 591px;
  height: 44px;
  background: #eaecf0;
}

.input-icon {
  position: absolute;
  width: 16px;
  height: 21px;
  margin-right: 410px;
  margin-top: 40px;
}

.label-text {
  font-family: "Inter";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: #1d2939;
}

.p-float-label label {
  margin-top: -2.9rem;
}
</style>
