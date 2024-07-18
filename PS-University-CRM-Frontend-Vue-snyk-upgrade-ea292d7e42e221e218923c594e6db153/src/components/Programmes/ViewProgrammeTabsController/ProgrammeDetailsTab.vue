<template>
  <div class="ProgrammeDetailsTab">
    <span
      class="promotedCourseBox px-3 py-1 d-flex align-items-center"
      v-if="program?.isPromoted"
    >
      <img
        class="me-1"
        alt="campaign"
        src="@/assets/images/Programmes/megaphone.svg"
      />
      Promoted course</span
    >
    <ul class="mt-5">
      <li class="row d-flex">
        <span class="col-4">
          <strong>Study Location:</strong>
        </span>
        <span class="col">{{ program?.study_location }}</span>
      </li>
      <li class="row d-flex">
        <span class="col-4">
          <strong>Study City / State:</strong>
        </span>
        <span class="col">{{ program?.city }}</span>
      </li>
      <li class="row d-flex">
        <span class="col-4">
          <strong>Program Type:</strong>
        </span>
        <span class="col">{{ program?.program_type }}</span>
      </li>
      <li class="row d-flex">
        <span class="col-4">
          <strong>Program Code:</strong>
        </span>
        <span class="col">{{ program?.program_code }}</span>
      </li>
      <li class="row d-flex">
        <span class="col-4">
          <strong>Program Name:</strong>
        </span>
        <span class="col">{{ program?.program_name }}</span>
      </li>
      <li class="row d-flex">
        <span class="col-4">
          <strong>Program Award:</strong>
        </span>
        <span class="col">{{ program?.program_award }}</span>
      </li>
      <li class="row d-flex">
        <span class="col-4">
          <strong>Course ECTS:</strong>
        </span>
        <span class="col">{{ program?.program_ECTS }}</span>
      </li>
      <li class="row d-flex">
        <span class="col-4">
          <strong>Study Language:</strong>
        </span>
        <span class="col">{{ program?.study_language?.join(',') }}</span>
      </li>
      <li class="row d-flex">
        <span class="col-4">
          <strong>Study Type:</strong>
        </span>
        <span class="col">{{ program?.study_type?.join(',') }}</span>
      </li>
      <li class="row d-flex">
        <span class="col-4">
          <strong>Learning Mode:</strong>
        </span>
        <span class="col">{{ program?.learning_mode?.join(',') }}</span>
      </li>
      <li class="row d-flex align-items-center">
        <span class="col-4">
          <strong>Uploaded Cover Photo:</strong>
        </span>
        <span id="coverPhoto" class="col"
          ><img
            style="max-height: 80px"
            :src="program?.cover_photo_url"
            alt=""
        /></span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "ProgrammeDetailsTab",
  props: ["program"],
  mounted() {},
};
</script>

<style scoped>
.ProgrammeDetailsTab {
  box-shadow: 0px 2px 10px rgba(58, 53, 65, 0.1);
  border-radius: 6px;
  padding: 40px 20px;
}
.promotedCourseBox {
  background: rgba(166, 239, 103, 0.5);
  border: 0.5px solid #40731d;
  border-radius: 24px;
  width: fit-content;
  color: #40731d;
}
</style>
