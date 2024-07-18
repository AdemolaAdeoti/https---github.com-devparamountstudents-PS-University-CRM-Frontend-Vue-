<template lang="html">
    <div>
        <!-- As a link -->
        <nav class="navbar navbar-dark bg-dark shadow d-sm-screens d-none">
            <div class="container">
                <a class="navbar-brand" href="#">
                <img src="@/assets/images/logo.svg" alt="" width="140" height="44">
                </a>
            </div>
        </nav>
        <div class="container-fluid d-sm-screens d-none">
            <div class="d-flex justify-content-center align-items-center h-100">
                <div class="alert alert-light text-dark py-custom shadow-sm rounded-0" role="alert">
                    <img src="@/assets/images/warning.svg" width="50" height="50" class="center mb-4" />
                    <h2 class="text-center my-2">Oops Sorry!</h2>
                    <p class="lead mt-1 text-center">                
                        The High School CRM is not optimize for mobile screen view. Switch to a desktop view for better experience.
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: "MobileWarn",
    };
</script>
<style scoped>
    .center {
        display: block;
        margin-left: auto;
        margin-right: auto;
        width: 50%;
    }
    .py-custom {
        padding: 5rem 3rem;
    }
    .container-fluid {
        background-color: rgba(99, 98, 98, 0.5);
        height: 100vh;
        z-index: 2
    }
    .navbar-dark.bg-dark {
        background: linear-gradient(26.57deg, #1D2939 8.33%, #344054 91.67%);
    }
</style>