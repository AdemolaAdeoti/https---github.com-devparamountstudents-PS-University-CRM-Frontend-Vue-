<template lang="html">
  <div>

    <div class="d-md-lg-screens">
      <!-- <LangModel /> -->
      <OffCanvas />
      <div class="px-0 bg-light shadow-sm position-fixed sidenav col-18 vh-100">
        <SideBar />
      </div>
      <div class="d-flex flex-lg-column justify-content-center">
        <main class="row overflow-hidden">
          <NavBar />
          <Transition  name="scale" mode="out-in">
            <div :key="$route.path" class="col mt-5 pb-5 container-fluid outer position-relative" style="padding-top: 22px;">
              <div v-if="$globals.loading" style="z-index: 1000;position: absolute;top:-30px; width: 100%;height: 100%;background:rgb(41 53 71 / 86%);display: flex;justify-content: center;align-items: center;">
                <span class="loaderx"></span>
              </div>
              <router-view class="inner"></router-view>
            </div>
          </Transition>
        </main>
      </div>
    </div>    
  </div>
</template>


<script>
import NavBar from '@/components/Global/NavBar';
import OffCanvas from '@/components/Global/OffCanvas';
import SideBar from '@/components/Global/SideBar.vue';
import { get } from '@/api/client';
export default {
  components: { NavBar,OffCanvas, SideBar },
  watch: {
    '$globals.reloadNotification'() {
      this.fetchNotifications()
    }
  },
  methods: {
    async fetchNotifications() {
      const user = JSON.parse(localStorage.getItem('userInfo'));
      let res = await get(`notifications/${user?.id}`);
      if (res?.message) {
        this.$globals.notification = res
      }

      res = await get('chat/university_new_chat');      
      if(res?.message){                            
        this.$globals.chats = res.message
      }
    }
  },
  async created() {
   // this.fetchNotifications()
  },
  mounted() {
  /*   const user = JSON.parse(localStorage.getItem("userInfo"));
    if(window?.myChannel){

      window.myChannel = window.Echo.private('chat.university-'+user?.university?.id);          
      window.myChannel
            .listen(".new-message", (data)=>{              
              this.$globals?.chats.push(data);
            });

      window.Echo.channel('notification').listen('.NewNotification', (data) => {
        this.$globals.notification.total_unread += 1
        this.$globals.notification.message.data.unshift(data)
      });
      window.Echo.connector.pusher.connection.bind('connected', () => {
        console.log('Laravel Echo connected');
      });
    } */
  }
};
</script>
<style scoped>
.mt-6 {
  margin-top: 6rem;
}
</style>
<style>
@media only screen and (max-width: 600px) {
.notification-text{
  font-size: 0.85em;
}
.notification li:first-child{
  display:flex;
  flex-direction: column;
  align-items: center;
}
.notification li:nth-child(2){
  margin:0px auto !important;
}
}

@media screen and (max-width: 992px) {
  .sidenav {
    display: none !important;
  }

  main {
    width: 100%;
  }

  .w-81-4 {
    width: 100%;
  }

  .menu-toggle-btn {
    display: block;
  }
}

/* Large devices (laptops/desktops, 992px and up) */
@media only screen and (min-width: 992px) {
  .col-18 {
    width: 18.7% !important;
    top: 0;
    left: 0;
  }

  .sidenav {
    display: block !important;
  }

  main {
    margin-left: 18.7% !important;
    width: calc(100% - 18.7%);
  }

  .w-81-4 {
    width: 81.4%;
  }

  .menu-toggle-btn {
    display: none;
  }
}

.nested-enter-active, .nested-leave-active {
	transition: all 0.3s ease-in-out;
}
/* delay leave of parent element */
.nested-leave-active {
  transition-delay: 0.25s;
}

.nested-enter-from,
.nested-leave-to {
  transform: translateY(30px);
  opacity: 0;
}

/* we can also transition nested elements using nested selectors */
.nested-enter-active .inner,
.nested-leave-active .inner { 
  transition: all 0.3s ease-in-out;
}
/* delay enter of nested element */
.nested-enter-active .inner {
	transition-delay: 0.25s;
}

.nested-enter-from .inner,
.nested-leave-to .inner {
  transform: translateX(30px);
  opacity: 0.001;
}

.scale-enter-active,
.scale-leave-active {
  transition: all 0.5s ease;
}

.scale-enter-from,
.scale-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

.loaderx {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: inline-block;
  position: relative;
  border: 3px solid;
  border-color: #FFF #FFF transparent transparent;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}
.loaderx::after,
.loaderx::before {
  content: '';  
  box-sizing: border-box;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  border: 3px solid;
  border-color: transparent transparent #fac515 #fac515;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  box-sizing: border-box;
  animation: rotationBack 0.5s linear infinite;
  transform-origin: center center;
}
.loaderx::before {
  width: 32px;
  height: 32px;
  border-color: #FFF #FFF transparent transparent;
  animation: rotationx 1.5s linear infinite;
}
    
@keyframes rotationx {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
} 
@keyframes rotationBack {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(-360deg);
  }
}
    
</style>
