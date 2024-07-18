<template>
  <div
    style="width: 730px; margin: auto; margin-top: 0px"
    class="d-flex flex-column"
  >
    <div class="m-4">
      <p>Educational Requirements</p>
      <Editor
        v-model="value"
        editorStyle="height: 320px; width:100% "
        @text-change="updateParent($event)"
        placeholder="More Information About Semester Admission"
      >
        <template v-slot:toolbar>
          <div class="">
            <span class="ql-formats">
              <button v-tooltip.bottom="'Bold'" class="ql-bold"></button>
              <button v-tooltip.bottom="'Italic'" class="ql-italic"></button>
              <button
                v-tooltip.bottom="'Underline'"
                class="ql-underline"
              ></button>
            </span>
          </div>
        </template>
      </Editor>
    </div>
  </div>
</template>

<script>
// import { countries } from "@/data";
import Editor from "primevue/editor";
export default {
  props:["requirements"],
  name: "ContactDetailsTab",
  components: { Editor },
  data() {
    return {
      countries: {},
      value:'',
      selectedCountry: "",
    };
  },
  methods:{
    updateParent(data){
      this.$emit('onUpdateAcademicRequirement',data.htmlValue)
      this.$emit('on-change',data.htmlValue)
    }
  },
  computed: {
    maskValue() {
      return this.selectedCountry.dial_code;
    },
  },
  created(){
    if(this.requirements){
      this.value = this.requirements;
    }
  },
};
</script>

<style scoped>
.inputGroupContainer {
  margin-top: 32px;
}
.inputTypeText {
  width: 100%;
  padding: 10px 14px 10px 12px;
  border: 0.5px solid #000000;
  border-radius: 4px;
}
button:hover:not(.p-calendar button) {
  box-shadow: 0px 0px 5px 5px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.25s ease-in-out;
}
</style>
