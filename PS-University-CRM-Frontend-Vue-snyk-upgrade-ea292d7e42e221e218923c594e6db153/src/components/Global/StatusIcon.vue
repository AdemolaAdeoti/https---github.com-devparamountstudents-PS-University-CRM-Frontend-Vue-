<template>
    <span>
    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" class="bi bi-circle custom-icon"
    :style="{
        backgroundColor: getIconColor(status),
        fill: getIconColor(status),
    }" viewBox="0 0 16 16">
    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
    </svg>
    {{ status }}
    </span>
</template>

<script>

export default {
    props:['status'],
    methods:{
        getIconColor(status) {      
            return status.toLowerCase() == 'in review' ||status == ''
                ? '#009aff'
                : status.toLowerCase() === 'enrolled'
                ? '#198754'
                : status.toLowerCase() === 'accepted'
                ?'#ffb300'
                : status.toLowerCase() === 'rejected'?
                "#DC3545":'#555555';    
        },
    }
}
</script>

<style scoped>
.custom-icon {
  border-radius: 5px;
}
</style>
