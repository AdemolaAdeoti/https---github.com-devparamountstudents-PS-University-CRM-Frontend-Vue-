<template>
  <div class="row">
  
 <div class="col-sm-4 my-3">
   <h2 style="font-size: 100%;">Student Applications</h2>
   <div class="card">
     <div class="card-body">
        <img
              :src="require('/src/assets/images/d-img.svg')"
              alt="logo"
              width="80"
          />
           <div class="profile-image">
               <h6 class="my-1 text-truncate">Submissin date:</h6>
               <p class="text-truncate">20-03-2022</p>
           </div>
    
       
      <div>
       <h5 style="font-size: 100%;">Profile</h5>
       <hr>
       
       <div class="container px-0">
            <div class="my-2  ">

             <h6 class="card-title text-truncate px-2 py-2 row mb-0">
               <span class="text-secondary col-5 text-dark p-0"
                 >First Name: </span
               >
               <span class="col ">Seth hallam</span>
              </h6>
              <h6 class="card-title text-truncate px-2 py-2 row mb-0">
               <span class="text-secondary col-5 text-dark p-0"
                 >Last  Name: </span
               >
               <span class="col  ">John</span>
              </h6>
              <h6 class="card-title text-truncate px-2 py-2 row mb-0">
               <span class="text-dark col-5 text-truncate p-0"
                 >Fathers Name: </span
               >
               <span class="col">Kelvin</span>
              </h6>
              <h6 class="card-title text-truncate px-2 py- row mb-0">
               <span class="text-dark col-5  p-0"
                 >Mothers Name: </span
               >
               <span class="col ">Alice</span>
              </h6>
              <h6 class="card-title text-dark px-2 py-2 row mb-0">
               <span class="text-dark col-5  p-0"
                 >Date Of Birth: </span
               >
               <span class="col">19-02-1992</span>
              </h6>
              <h6 class="card-title text-dark px-2 py-2 row mb-0">
               <span class="text-dark col-5 p-0"
                 >Gender:</span >
               <span class="col">Male</span>
              </h6>
              <h6 class="card-title text-dark px-2 py-2   row mb-0">
               <span class=" col-5 text-truncate p-0"
                 >Email Address:</span
               >
               <span class="col text-truncate">kelvin@gmail.com</span>
              </h6>
          
            </div>
       </div>
      </div>
      <div>
       <h6>Application Program</h6>
       <hr>
      
       <div class="container px-0">
            <div class="my-2  ">

             <h6 class="card-title text-truncate px-2 py-2 row mb-0">
               <span class="text-secondary col-5 text-dark p-0"
                 >Study Location: </span
               >
               <span class="col ">Estonia Talinn</span>
              </h6>
              <h6 class="card-title text-truncate px-2 py-2 row mb-0">
               <span class="text-secondary text-truncate col-5 text-dark p-0"
                 >Program Type: </span
               >
               <span class="col text-truncate ">Bachelor Degree</span>
              </h6>
              <h6 class="card-title text-truncate px-2 py-2 row mb-0">
               <span class="text-dark col-5 text-truncate p-0"
                 >Program Name: </span
               >
               <span class="col-4 text-truncate">Bachelor in Computer Science</span>
              </h6>
              <h6 class="card-title text-truncate px-2 py- row mb-0">
               <span class="text-dark col-5  p-0"
                 >Learnig Mode: </span
               >
               <span class="col ">On Campus</span>
              </h6>
              <h6 class="card-title text-dark px-2 py-2 row mb-0">
               <span class="text-dark col-5  p-0"
                 >Program Code: </span
               >
               <span class="col">13924</span>
              </h6>
              <h6 class="card-title text-dark px-2 py-2 row mb-0">
               <span class="text-dark text-truncate col-5 p-0"
                 >Program Award:</span
               >
               <span class="col">B.Sc</span>
              </h6>
              <h6 class="card-title text-dark px-2 py-2   row mb-0">
               <span class=" col-5 text-truncate p-0"
                 >Course Duration:</span
               >
               <span class="col text-truncate">4 Years(240 ECTS)</span>
              </h6>
              <h6 class="card-title text-dark px-2 py-2 row mb-0">
               <span class="text-dark text-truncate col-5 p-0"
                 >Study Language:</span
               >
               <span class="col ">English</span>
              </h6>
              <h6 class="card-title text-dark px-2 py-2   row mb-0">
               <span class=" col-5 text-truncate p-0"
                 >Studey Type :</span
               >
               <span class="col text-truncate">Full Time, Part Time</span>
              </h6>
          
            </div>
       </div>
      </div>
     </div>
     
   </div>
          
             <div class="application-review py " style="border: 1px solid black; margin-top: 25px; border-radius: 8px;">
               <h6 class="text-center my-3">Application Review</h6>
               <div class="form-group sub-input sub-input-large">
                 
                   <div class="form-group dropdown">
                       <label class="label-text">Status</label>
                     <div style="width: 90%; margin: auto;" >
                      <Dropdown style="border-radius: 10px; " v-model="selectedReview" :options="AppliactionReview"
                       optionLabel="" placeholder="Waiting  Review" class="w-100" :default="AppliactionReview[0]" />
                     </div>
                   </div>
                 
                 <div class="form-group">
                   <label class="label-text">Comments</label>
                   <Textarea class="form-control textarea" placeholder="Enter a comment..." :autoResize="true" rows="4" cols="5"></Textarea>
                 </div>
                 
                   <div class="btn-container">
                     <button class="save-next-btn ripple text-dark ">
                       Save
                     </button>
                   </div>
                 
               </div>
             </div>
          
   
 </div>
 <div class="col-sm-8 " >

         <div class="applications-nav " >
           
           <div class="tab-container  ">
               <ul class="nav nav-pills py-5  " id="pills-tab" role="tablist" style="align-items: flex-end; ">
                  <li class="nav-item m-1 " role="presentation">
                    <button class="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true"  >Contact</button>
                  </li>
                  <li class="nav-item m-1" role="presentation">
                    <button class="nav-link" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-selected="false"  >Education</button>
                  </li>
                  <li class="nav-item m-1" role="presentation">
                    <button class="nav-link" id="pills-education-tab" data-bs-toggle="pill" data-bs-target="#pills-education" type="button" role="tab" aria-controls="pills-education" aria-selected="false"  >Documents</button>
                  </li>
                  <li class="nav-item m-1" role="presentation">
                    <button class="nav-link" id="pills-document-tab" data-bs-toggle="pill" data-bs-target="#pills-document" type="button" role="tab" aria-controls="pills-document" aria-selected="false" >Chat</button>
                </li>
              </ul>
           </div>
         </div>
     <div class="container h-auto px-0 py-3 form-controll">
      <div class="applications-main tab-content" id="pills-tabContent">
      <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab" tabindex="0">
          <StudentContact/>
      </div>
      <div class="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab" tabindex="0">
    
      <StudentEducation/>
      </div>
      <div class="tab-pane fade" id="pills-education" role="tabpanel" aria-labelledby="pills-education-tab" tabindex="0">
      
        <StudentDocument />
      </div>
      <div class="tab-pane fade" id="pills-document" role="tabpanel" aria-labelledby="pills-document-tab" tabindex="0">
        <ChatBox/>
      </div>
    </div>
 </div>
 
   

   
 </div>
 
</div>
 </template>
 <script>
 import Dropdown from 'primevue/dropdown';
import StudentDocument from "@/components/StudentsApplication/StudentDocument.vue";
import StudentContact from "@/components/StudentsApplication/StudentContact.vue";
import StudentEducation from "@/components/StudentsApplication/StudentEducation.vue";
import ChatBox from "@/components/Chats/ChatBox.vue";

export default {
  components: {
    Dropdown,
    StudentContact,
    StudentDocument,
    StudentEducation,
    ChatBox
  },
  data() {
    return {
      stuForm: false,
      selectedReview: null,
      AppliactionReview: ['Approved', 'Rejected', 'Got Admissions'],
      documents: [
        {
          id: 1,
          text: "High School Grade MarkSheet",
          size: "4.00mb",
          date: "25/05/2022"
        },
        {
          id: 2,
          text: "High School Certificates",
          size: "4.00mb",
          date: "25/05/2022"
        },
        {
          id: 3,
          text: "Formal Photo",
          size: "4.00mb",
          date: "25/05/2022"
        },
        {
          id: 4,
          text: "Passport font",
          size: "4.00mb",
          date: "25/05/2022"
        },
        {
          id: 5,
          text: "National ID Photo",
          size: "4.00mb",
          date: "25/05/2022"
        }
      ]
    };
  },

  mounted() {

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

.label-text{margin: 10px;}
.profile-image{
    background-color:   #fbc02d; 
   
   
    width:40%;
     height: 60px;
    padding-top: 2px; 
    margin-top: 10px;
    margin-bottom: 20px;
    padding-left: 10px; 
    border-radius: 6px;
}
.profile-image > h6{
     font-size:90%;
   
}

.label-text {
 font-size: 15px;
}
.textarea{
   width: 95%;
   margin-left: 10px;
}
.btn-container {
 padding: 2px;
}

.card-title {
font-size: 12px;
}
.tab-container{
   height: 107px;
    border-bottom: 1px solid rgb(235, 233, 233);
}
.view-btn {
 background-color: #EAECF0;
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
 width: 95%;
 padding: 0.6rem;
 border: none;
 margin-left: 8px;

 background-color: gray;
}


.nav-link{
           color: grey;
}
.active{
             color: rgb(12, 11, 11)!important;
             font-weight: 600;
             background-color: transparent !important;
             border-radius: 0px !important;
             border-bottom: 2px solid rgb(134, 132, 132) !important;
             
             
}
@media (max-width: 1024px) {
  .profile-image{
        width: 60%;
  }
		.profile-image > h6{
     
      font-size: 13px;
    }
    .profile-image > p{
     
      font-size: 1px;
    }
	}
  @media (max-width: 664px) {
  .profile-image{
        width: 70%;
  }
		.profile-image > h6{
     
      font-size: 12px;
     
    }
    
	}
.nav-link > button{
               color: red;
               
         }
         .nav-link.active{
           background-color: #F9FAFB;
                color: black;
               
                
         }
         .img-size {
 border-radius: 2px;
 background-color: gray;
 height: 80px;
 width: 70px;

}


</style>


