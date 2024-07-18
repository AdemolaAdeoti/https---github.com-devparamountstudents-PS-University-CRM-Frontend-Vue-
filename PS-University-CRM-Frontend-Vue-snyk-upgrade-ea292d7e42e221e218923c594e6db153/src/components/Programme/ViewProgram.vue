<template>
  <div class="px-2 ViewProgramme position-relative my-5">
    <div style="" class="universityProfileComponent row">
      <img
        class="col-1"
        style="height: 80px; width: 80px"
        @error="onImageError($event)" 
        :src="program.cover_photo_url?? require('@/assets/images/universities-list/universityImg.svg')"
      />
      <div class="col mx-5 d-flex flex-column justify-content-between">
        <h3>University Profile</h3>
        <div class="row mt-2">
          <span style="min-height: 50px" class="col"
            ><strong> University ID:</strong> {{ program?.university?.unique_id }}</span
          >
          <span class="col">
            <strong>University Name:</strong> {{ program?.university.name }}</span
          >
        </div>

        <div class="row">
          <span class="col">
            <strong>Registered Date:</strong>
            {{ program?.university.registered_date }}</span
          >
          <span class="col">
            <strong>Registered Email:</strong>
            {{program?.university.email }}</span
          >
        </div>
        <span
          style="width: max-content !important"
          class="px-2 rounded my-3 bg-warning"
          ><strong>Date Created: </strong
          >{{ new Date(program?.university.created_at) }}</span
        >
        <hr />
        <div class="d-flex flex-column align-item-start">
          <h3>Contact Details</h3>

          <div class="row">
            <span class="col">
              <strong>Registered Phone Number:</strong>
              {{ program?.university?.phone_number }}</span
            >
            <span class="col">
              <strong>Country :</strong>
              {{ program?.university.country }}</span
            >
          </div>
          <div class="row">
            <span class="col">
              <strong>City:</strong>
              {{ program?.university.city }}</span
            >
            <span class="col">
              <strong>Address :</strong>
              {{ program?.university.address }}</span
            >
          </div>
          <span
            style="width: max-content !important"
            class="px-2 rounded my-3 bg-warning"
            ><strong>Postal Code: </strong
            >{{ program?.university.postal_code }}</span
          >
        </div>
      </div>

      <div
        class="d-flex flex-column align-items-end"
        style="position: absolute; top: -60px; right: 0"
      >
        <div class="d-flex flex-column align-items-center">
          <label style="font-weight: 500">Deactivate / Activate Program</label>
          <InputSwitch @change="changeStatus" v-model="activateProgramSwitchValue" :value="true" />
        </div>
      </div>
      <button style="height: max-content; width: max-content" class="py-2 px-4 rounded border d-flex justify-content-between align-items-center text-white bg-danger col-2">
        <img class="mx-1"  :src="require('@/assets/images/Programmes/trashBin.svg')"/>Delete
      </button>
      <button @click="updateProgram" style="height: max-content; width: max-content" class="py-2 px-4 rounded border d-flex justify-content-between align-items-center text-white bg-success col-2">
        <img class="mx-1" >Update
      </button>
    </div>
    <hr style="margin-bottom: 0 !important" />
    <ViewProgrammeTabsController :program="program" />
  </div>
</template>

<script>
import InputSwitch from 'primevue/inputswitch';
import ViewProgrammeTabsController from "@/components/Programmes/ViewProgrammeTabsController.vue";
// import { universities } from "@/data";
import {post} from '@/api/client'
export default {
  name: "ViewProgramme",
  components: { ViewProgrammeTabsController,InputSwitch },
  props:['program'],
  data() {
    return {
      activateProgramSwitchValue: null,    
      currentUniversity: [],
    };
  },
  methods:{
    updateProgram(){
      localStorage.setItem('selected_program', JSON.stringify(this.program));
      this.$router.push('/create/programs')
    },
    onImageError(event) {    
      event.target.src = require('@/assets/images/universities-list/universityImg.svg');
    },
    async updateProgramStatus(obj){
      const res = await post('program/update_status',obj)
      const prevState = this.activateProgramSwitchValue
      if(res){
        if(obj.status ==='Open'){
          this.activateProgramSwitchValue = true
        }else{
          this.activateProgramSwitchValue = false
        }
      }else{
        this.activateProgramSwitchValue = prevState
      }
    },
    changeStatus() {
      if (this.program.status === 'Open') {        
        this.updateProgramStatus({id:this.program.id,status:'Closed'} )        
      } else {       
        this.updateProgramStatus({id:this.program.id,status:'Open'})        
      } 
    },
  },
  created(){
    this.activateProgramSwitchValue = this.program.status === 'Open'
  }
};
</script>

<style></style>
