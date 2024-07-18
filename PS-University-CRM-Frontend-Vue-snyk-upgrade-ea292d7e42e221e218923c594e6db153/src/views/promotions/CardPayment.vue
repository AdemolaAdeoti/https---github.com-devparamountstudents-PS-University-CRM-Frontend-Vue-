<!--<template>
    <div class="row">
        <h3 >Card Payment</h3>
        <hr style=" border:0.1rem solid #F79009">
   <div class="col-sm-7">
     
     <div class="card shadow ">
        <div class="application-review py "  >
            <div class="p-input-icon-left  p-input-icon-right    " style="width: 600px; padding-left: 20px;">
                   <div style="  margin-top: 10px; padding-left: 50px; padding-top: 2px; border-radius: 5px;  background-color: rgba(247, 172, 188, 0.849) ;  width:99%; height: 10px position: relative;;" >
                    <i class="pi pi-credit-card" style="color: yellow;" >
                        
                    </i>
                    
                    <i class="pi p-3" style="color:black; font-size: 20px;"  >
                       Add a new card
                        <img
                            :src="require('/src/assets/images/visa.png')"
                            alt="input-lock"
                            style="width:40px; height:20px;"
                        />
                        <img
                            :src="require('/src/assets/images/mc.png')"
                            alt="input-lock"
                            style="width:18px; height: 18px;"
                        />
                    </i>
                   </div>
                </div>
                 <div style="width:90%; margin: auto;">
                    <h6 class="text-dark  p-2 ">Card number</h6>
                   
                 <div class="form-group">
                        <label class="label-text" for="usr">Enter the 16-digit card number on the card</label>
                        <div>
                            <span class="p-input-icon-left  p-input-icon-right  p-float-label">
                                
                                <InputText
                                    type="text"
                                    v-model="value3"
                                    class="form-input"
                                    value="2342-3423-23242-242"
                                    disabled
                                />
                                
                            </span>
                        </div>
            
                </div>
                <h6 class="text-dark  p-2 ">Cardholder Name</h6>
                   
                 <div class="form-group">
                        <label class="label-text" for="usr">Enter the cardholder name on the card</label>
                        <div>
                            <span class="p-input-icon-left  p-input-icon-right  p-float-label">
                                
                                <InputText
                                    type="text"
                                    v-model="value3"
                                    class="form-input"
                                    value="Please Enter cardholder name"
                                    disabled
                                />
                                
                            </span>
                        </div>
            
                </div>

                <div class="row">
                     <div class="col-6">
                        <div class="text-secondary track-cell  px-1">
                        <span class="text-dark">CVV number</span>
                        <p class="text-dark pt-2  " style="font-size: 10px !important;">
                        Enter the 3 or 4 digit number on your card
                        </p>
                    </div>
                    
                     </div>
                     <div class="col-6">
                        <div class="text-secondary track-cell col-12 px-1">
                            <InputText
                                    type="text"
                                    v-model="value3"
                                    class="form-input3"
                                    value="123"
                                    
                                />
                    </div>
                    
                     </div>
                     
                </div>
                <div class="row">
                     <div class="col-6">
                        <div class="text-secondary track-cell  px-1">
                        <span class="text-dark">EXPIRY Date</span>
                        <p class="text-dark pt-2  " style="font-size: 10px !important;">
                        Enter expiring date of the card
                        </p>
                    </div>
                    
                     </div>
                     <div class="col-6">
                        <div class="text-secondary track-cell col-12 px-1">
                            <InputText
                                    type="text"
                                    v-model="value3"
                                    class="form-input4"
                                    value="MM"
                                    
                                />
                                \
                                <InputText
                                    type="text"
                                    v-model="value3"
                                    class="form-input4"
                                    value="YY"
                                    
                                />
                    </div>
                    
                     </div>
                     
                </div>
                
               
                
                <div class="d-flex justify-content-center row pt-4">
                                  <div class="p-2 m-3">
                                    <p class= " text-dark" style="font-size: 15px !important;">Your payment information is save with us</p>
                                  </div>
                                <div class="col-12">
                                <button class="pay-btn">pay $1,004.23</button>
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
    /* .form-input2 {
        width: 100px;
        height: 44px;
        
    } */
    .form-input4 {
        width: 100px;
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
 .pay-btn{
    margin: auto;
    width: 99%;
  background-color: rgba(223, 220, 86, 0.849) !important;
  border-radius: 8px;

color: rgb(14, 14, 13) !important;
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
  
  
  
