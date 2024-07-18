<template>
  <div class="container h-auto px-0 py-3">
    <div class="applications-main">
    

      <div>
        <StudentContact />
      </div>
      <div>
        <StudentEducation />
      </div>
      <div>
        <StudentDocument />
      </div>
      <div>
        <ChatBox />
      </div>
    </div>

  </div>
</template>


<script>
import StudentContact from '@/components/StudentContact.vue';
import StudentEducation from '@/components/StudentEducation.vue';
import ChatBox from '@./components/ChatBox.vue';
import StudentDocument from './StudentDocument.vue';


export default {

  name: "StudentBio",



  components: { StudentContact, StudentEducation, ChatBox, StudentDocument },
  data() {
    return {
      stuForm: false,
      selectedReview: null,
      AppliactionReview: ['No Apply yet', 'Applying', 'Got Admissions'],

    };

 

  },
  mounted(){
     const index = this.$route.params.id;
    alert(index) 
  /*   const store = useStudentApplicationStore()
    console.log(store,38892832893923889)
    this.student = store.$state.studentApplications; */
  } 
}
</script>

<style scoped>
.container {
  margin-bottom: 60px;
}

</style>