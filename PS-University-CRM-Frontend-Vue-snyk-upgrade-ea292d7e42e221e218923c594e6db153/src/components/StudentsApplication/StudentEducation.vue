<template>
  <div class="card my-2">
      <div class="card-body">
        <h1 class="card-title">Education</h1>
        <div class="container px-0">
             <div class="my-2  ">
 
              <h6 class="card-title text-truncate px-2 py-2 row mb-0">
                <span class="text-secondary col-5 text-dark text-truncate p-0"
                  >High School: </span
                >
                <span class="col text-truncate ">{{education?.high_school}}</span>
               </h6>
               <h6 class="card-title text-truncate px-2 py-2 row mb-0">
                <span class="text-secondary col-5 text-dark text-truncate p-0"
                  >High School Country: </span
                >
                <span class="col text-truncate ">{{education?.high_shool_country}} </span>
               </h6>
               <h6 class="card-title text-truncate px-2 py-2 row mb-0">
                <span class="text-secondary col-5 text-dark text-truncate p-0"
                  >City: </span
                >
                <span class="col  ">{{education?.high_school_city}}</span>
               </h6>
               <h6 class="card-title text-truncate px-2 py-2 row mb-0">
                <span class="text-secondary col-5 text-dark text-truncate p-0"
                  >(Expected) Graduation:</span
                >
                <span class="col text-truncate  ">{{education?.high_school_graduation_year}}</span>
               </h6>
               
            
               
           
             </div>
        </div>
      </div>
    </div>
 </template>
  
<script>
export default {
  props:['education'],
}
</script>
  
<style lang="scss">

</style>