<template >
   <div>
    <div class="card my-3">
     <div class="card-body">
       <h5 class="card-title">Contact Information</h5>
       <div class="container px-0">
            <div class="my-2  ">

             <h6 class="card-title text-truncate px-2 py-2 row mb-0">
               <span class="text-secondary col-5 text-dark p-0"
                 >Mobile: </span
               >
               <span class="col ">{{contact?.phone}}</span>
              </h6>
              <h6 class="card-title text-truncate px-2 py-2 row mb-0">
               <span class="text-secondary col-5 text-dark p-0"
                 >citizenship: </span
               >
               <span class="col  ">{{contact?.citizen}} </span>
              </h6>
              <h6 class="card-title text-truncate px-2 py-2 row mb-0">
               <span class="text-dark col-5 text-truncate p-0"
                 >Country local ID Number: </span
               >
               <span class="col">{{contact?.nationalId}} </span>
              </h6>
              <h6 class="card-title text-truncate px-2 py- row mb-0">
               <span class="text-dark col-5  p-0"
                 >Country Of Residence: </span
               >
               <span class="col ">{{contact?.country_residence}}</span>
              </h6>
              <h6 class="card-title text-dark px-2 py-2 row mb-0">
               <span class="text-dark col-5  p-0"
                 >Home Address: </span
               >
               <span class="col text-truncate">{{contact?.home_address}}</span>
              </h6>
              <h6 class="card-title text-dark px-2 py-2 row mb-0">
               <span class="text-dark col-5 p-0"
                 >Postal Code:</span
               >
               <span class="col text-truncate p-0">{{contact?.postal_code}}</span>
              </h6>
              
          
            </div>
       </div>
     </div>
   </div> 
   <div class="card my-2">
     <div class="card-body">
       <h3 class="card-title">Passport Information</h3>
       <div class="container px-0">
            <div class="my-2  ">

             <h6 class="card-title text-truncate px-2 py-2 row mb-0">
               <span class="text-secondary col-5 text-dark p-0"
                 >Passport Number: </span
               >
               <span class="col ">{{contact?.passport_info?.passport_number}}</span>
              </h6>
              <h6 class="card-title text-truncate px-2 py-2 row mb-0">
               <span class="text-secondary col-5 text-dark p-0"
                 >Issued Date: </span
               >
               <span class="col  ">{{contact?.passport_info?.issued_date}}</span>
              </h6>
              <h6 class="card-title text-truncate px-2 py-2 row mb-0">
               <span class="text-secondary col-5 text-dark p-0"
                 >Expiry Date: </span
               >
               <span class="col  ">{{contact?.passport_info?.expiry_date}}</span>
              </h6>
              
           
              
          
            </div>
       </div>
     </div>
   </div>
   </div>
</template>

<script>

export default {
  props:['contact','nationalId'],
  data(){
    return {
      student:{}
    }
  },
  mounted(){
 
  }
}
</script>

<style scoped>
.container {
  margin-bottom: 60px;
}



.img-size {
  border-radius: 4px;
  background-color: gray;
  height: 80px;
  width: 60px;
}
</style>