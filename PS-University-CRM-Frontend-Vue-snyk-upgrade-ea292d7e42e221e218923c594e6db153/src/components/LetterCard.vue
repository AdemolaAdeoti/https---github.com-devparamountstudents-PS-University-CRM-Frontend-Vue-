<template>
    <div class="w-100" :class="{'rounded bg-white':isOpen}">
        <div :class="{'rounded shadow bg-white':!isOpen}" class="row mx-auto  py-3 d-flex align-items-center" style="width:95%">
                <div class="col-sm-2 ">
                    <span class="ms-3" v-html="$globals.icons.pdf"></span>
                </div>
                <div class="col-sm-3"><p class=" my-1 fs1 w-10 text-secondary">Document Name</p>
                    <span class="fs1">{{letter?.name}}</span>
                </div>
                <div class="col-sm-3"><p class=" my-1 fs1 w-10 text-secondary">Date Created</p>
                    <span class="fs1">{{letter?.created_at}}</span>
                </div>
                <div class="col-sm-2"><p class=" my-1 fs1 w-10  text-secondary">Status</p>                
                    <span >
                        <svg
                        xmlns="http://www.w3.org/2000/svg" width="10" height="10" border-radius="5px" class="bi bi-circle" :style="{
                            backgroundColor: getTextColor(letter?.status||'pending'),
                            fill: getTextColor(letter?.status ||'pending'), borderRadius: '5px'}" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                        </svg>
                    </span>
                    <span class="text-truncate fs1" style="text-transform:capitalize" >
                        {{ letter?.status ??'Pending' }}
                    </span>                                      
                </div>
                <div class="col-sm-2"><b class="w-10"></b>
                    <button @click="view" class="btn btn-sm btn-light ">View <span v-html="$globals.icons.caret"></span></button>
                </div>
                <hr v-if="isOpen" class="mt-3" style="background: #eee;">
            </div>
            
            <div :class="{'d-flex':isOpen,'d-none':!isOpen }" class=" flex-column justify-content-around align-items-center mt-3">
                <div class="position-relative" style="width:75%; padding-left:6%; padding-right:6%">
                    <span v-html="$globals.icons.status" style="stroke:#00A137"></span>                    
                    <span class="d-inline-block"  style=" background:#FDEDB6;width: 36.5%;height:6px"></span>
                    <span v-html="$globals.icons.status" :style="letter?.receiver_status == 'accepted'? 'stroke:#00A137': letter?.receiver_status == 'pending'? 'stroke:#909295':'stroke:#DC3545'"></span>
                    <span class="d-inline-block"  style="background:#FDEDB6;width: 28.5%;height:6px"></span>
                    <span v-html="$globals.icons.status" :style="letter?.status == 'approved'? 'stroke:#00A137': letter?.status == 'pending'? 'stroke:#909295':'stroke:#DC3545'"></span>
                </div>    
                <div class="d-flex justify-content-between w-75">
                    
                    <span style="width: 40%;" class="d-flex flex-column align-items-start">
                        <span style="" class="text-center">
                            <p style="font-size:0.95em; font-weight:400" class="m-0">Admin Document sent </p>
                            <span style="font-size:0.8em">Date: {{letter?.created_at || +'20-08-2023'}}</span>
                        </span>
                    </span>
                    <span style="width: 30%;" class="d-flex flex-column align-items-start">

                        <span class="text-center">
                            <p style="font-size:0.95em; font-weight:400" class="m-0">High School signed </p>
                            <span style="font-size:0.8em">Date: {{letter?.signed_date|| 'YYYY-MM-DD'}}</span>
                        </span>                                    
                    </span>
                    <span style="width: 30%;" class="d-flex flex-column align-items-start">
                        <span  class="text-center">
                            <p style="font-size:0.95em; font-weight:400" class="m-0">Admin Approved </p>
                            <span style="font-size:0.8em">Date: {{letter?.approval_date|| 'YYYY-MM-DD' }}</span>
                        </span>
                    </span>
                </div>
            </div>

    </div>
</template>
<script>
    export default{
        props:{
            letter:Object
        },
        data(){
            return {
                isOpen:false
            }
        },
        methods:{
            view(){
                this.isOpen = !this.isOpen
                this.$emit('view',this.isOpen);
            },
            getTextColor(status) {
                try{        
                    return status.toLowerCase() == 'pending'
                        ? '#fac515'
                        : status.toLowerCase() === 'signed'
                        ? '#0275d8'
                        : status.toLowerCase() === 'approved'
                        ? '#198754'                        
                        : status.toLowerCase() === 'rejected'?
                        "#DC3545":'#555555';      
                    }catch(e){
                    //console.log(e, status)
                    }
                    return '';
                },
        }
    }
</script>
<style scoped>
.w-10{
    font-weight: 500;
}
.fs1{
    font-size:0.95em !important;
    
}
</style>