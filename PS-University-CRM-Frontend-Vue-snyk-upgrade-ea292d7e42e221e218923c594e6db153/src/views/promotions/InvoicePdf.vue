<!--<template>
    <div class="row">
        <h3 >Invoice</h3>
        <hr style=" border:1px solid #F79009">
   <div class="col-sm-7">
     
     <div class="card shadow ">
        <div class="application-review py "  >
                 
                 <div style="width:90%; margin: auto;">
                    <h6 class="text-dark  p-2 ">Invoice</h6>
                   <h6 class="text-dark  p-2 ">Promotion Payment</h6>
                 <div class="form-group">
                        <label class="label-text" for="usr">Reference number</label>
                        <div>
                            <span class="p-input-icon-left  p-input-icon-right  p-float-label">
                                
                                <InputText
                                    type="text"
                                    v-model="value3"
                                    class="form-input"
                                    value="498ae829384FEGT"
                                    disabled
                                />
                                
                            </span>
                        </div>
            
                </div>
                <h6 class="card-title text-truncate px-4 py-4 row mb-0">
                <span class="text-secondary col-2 text-dark text-truncate p-0"
                  >Service:</span
                >
                <span class="col text-truncate  ">Promotion to introduction to computer science</span>
               </h6>

                   <h6 class="card-title text-truncate px-4 py-4 row mb-0">
                        <span class="text-secondary col-3 text-dark text-truncate p-0"
                        >Amount Payable:</span
                        >
                        <span class="col text-truncate  ">$10042.02</span>
               </h6>
               <div class="form-group">
                        <label class="label-text" for="usr">Payee's name</label>
                        <div>
                            <span class="p-input-icon-left  p-input-icon-right  p-float-label">
                                
                                <InputText
                                    type="text"
                                    v-model="value3"
                                    class="form-input"
                                    value="Intanbul University of Technology"
                                    disabled
                                />
                                
                            </span>
                        </div>
            
                </div>
                <div class="form-group">
                        <label class="label-text" for="usr">Payee's email</label>
                        <div>
                            <span class="p-input-icon-left  p-input-icon-right  p-float-label">
                                
                                <InputText
                                    type="text"
                                    v-model="value3"
                                    class="form-input"
                                    value="Instanunit@gmail.com"
                                    disabled
                                />
                                
                            </span>
                        </div>
            
                </div>
                <div class="d-flex justify-content-center row pt-4">
                                  <div class="p-2 m-3">
                                    <p class= "text-center text-dark">A copy of pdf has been sent to your mail</p>
                                  </div>
                                <div class="col-2">
                                <button class="back-btn">Back</button>
                                </div>
                                <div class="col-2 mx-3 ">
                                <button class="download-btn">Download</button>
                                </div>
                                <div class="col-3 mx-4">
                                <button class="continue-btn text-dark">Continue</button>
                                </div>
                    </div>
                 </div>
                
               </div>
       
     </div>

    
            
              
            
     
   </div>
   
   
  </div>
   </template>
   <script>
  
 
  
   
   export default {
     
     
     components: {  },
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
  
    
  
        
   
   };
   </script>>
   
   <style scoped>
   .container {
     margin-bottom: 60px;
   }
   .form-input {
        width: 550px;
        height: 44px;
        
    }
    .continue-btn {
  display:inline-block;
  background-color: yellow!important;
  border-radius: 8px;

  padding: 8px 27px;
  color: rgb(15, 15, 13) !important;
  border: none;
  font-size: 16px;
 }
 .back-btn{
    display:inline-block;
  background-color: transparent !important;
  border-radius: 8px;
border: 1px solid yellow !important;
color: yellow !important;
  padding: 8px 27px;
  border: none;
  font-size: 16px;
 }
 .download-btn{
    display:inline-block;
  background-color: #080808;
  border-radius: 8px;
  padding: 8px 27px;
  border: none;
  color: white;
  font-size: 16px;
 }
  
  .application-review div {
   margin-bottom: 10px;
  }
  
  .label-text{margin: 10px;}
  .profile-image{
      background-color: #fceca6; 
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
  
  
  
