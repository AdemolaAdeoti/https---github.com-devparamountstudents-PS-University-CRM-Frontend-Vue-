<template>
  <div class="mx-auto position-fixed bg-light w-100 pt-2" style="z-index: 10;">
    
    <TabMenu :model="items">
        <template #item="{ item }">
          <li  v-ripple style="" 
              class="px-3 d-flex align-items-center pb-2" 
              @click="changeComponent(item.component)" 
              :class="{ comp_active: activeComponent == item.component }"
            >
            <i :class="'pi '+item.icon " style="font-size: 1rem; color:#555;"></i>
              <p class="ms-1 mb-0 mt-0" style="white-space: nowrap;">{{ item.name }}</p>
            </li>           
        </template>
    </TabMenu>
<!--     <swiper  :slides-per-view="slidesPerView" :space-between="20" :loop="false">
      <swiper-slide  style="display: inline-block;">
        <li  style="background: #eee;" class="p-2" @click="changeComponent('school-info')" :class="{ comp_active: activeComponent == 'school-info' }">
        <p>University Information</p>
      </li>
      </swiper-slide>
        <swiper-slide  style="display: inline-block;">
        <li  style="background: #eee;" class="p-2" @click="changeComponent('university-profile')"         >
        <p>University Profile</p>
      </li>
      </swiper-slide>
        <swiper-slide  style="display: inline-block;">
        <li  style="background: #eee;" class="p-2" @click="changeComponent('contact-details')" :class="{ comp_active: activeComponent == 'contact-details' }">
        <p>Contact Details</p>
      </li>
      </swiper-slide>
        <swiper-slide  style="display: inline-block;">
        <li  style="background: #eee;" class="p-2" @click="changeComponent('security-settings')" :class="{ comp_active: activeComponent == 'security-settings' }">
        <p>Security Settings</p>
      </li>
      </swiper-slide>
        <swiper-slide  style="display: inline-block;">
        <li  style="background: #eee;" class="p-2" @click="changeComponent('agreement-letter')" :class="{ comp_active: activeComponent == 'agreement-letter' }">
        <p>Agreement</p>
      </li>
      </swiper-slide>
        <swiper-slide  style="display: inline-block;">
        <li  style="background: #eee;" class="p-2" @click="changeComponent('general-settings')" :class="{ comp_active: activeComponent == 'general-settings' }">
        <p>General Settings</p>
      </li>
      </swiper-slide>      
      </swiper> -->
  </div>
<div class="pt-5">
  <component :is="activeComponent"></component>
</div>
</template>

<script>
import 'primeicons/primeicons.css'
import { Swiper, SwiperSlide } from "swiper/vue";

import TabMenu from 'primevue/tabmenu';
import SchoolInfo from "@/views/settings/SchoolInfo.vue";
import SecuritySettings from "@/views/settings/SecuritySettings.vue";
import GeneralSettings from "@/views/settings/GeneralSettings.vue";
import ContactDetails from "@/views/settings/ContactDetails.vue";
import UniversityProfile from "@/views/profile/UniversityProfile";
import AgreementLetter from "@/views/settings/AgreementLetter.vue";
import ClientApp from "@/views/settings/ClientApp.vue";
export default {
  components: {
    SchoolInfo,
    SecuritySettings,
    GeneralSettings,
    ContactDetails,
    AgreementLetter,
    UniversityProfile,
    ClientApp,
    TabMenu,
    Swiper, SwiperSlide
  },
  data() {
    return {
      items:[
        { name: 'Client App', component: 'client-app', icon:'pi-shield' },
        { name: 'Agreement', component: 'agreement-letter', icon:'pi-thumbs-up' },
        { name: 'Contacts', component: 'contact-details', icon:'pi-book' },
        { name: 'Info', component: 'school-info', icon:'pi-info-circle' },
        { name: 'General', component: 'general-settings', icon:'pi-cog' },
        { name: 'Profile', component: 'university-profile', icon:'pi-user-edit' },
        { name: 'Security', component: 'security-settings', icon:'pi-key' },
      ],
      activeComponent: "school-info",
    };
  },
  computed: {
    slidesPerView() {      
      const viewportWidth = window.innerWidth;
      if (viewportWidth >= 1024) {
        return 4;
      } else if (viewportWidth >= 768) {        
        return 3;
      } else {        
        return 1;
      }
    },
  },
  methods: {
    changeComponent(comp) {
      this.activeComponent = comp;
    },
  },
};
</script>

<style scoped>
*,
*::after*::before {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
ul {
  border-bottom: 1px solid #dc6803;
}
li {
  border-bottom: 3px solid transparent;
  cursor: pointer;
  transition: opacity, 0.2s ease-in;
}
li:hover {
  opacity: 0.5;
}
.comp_active {
  border-bottom: 3px solid #f79009;
  background: transparent;
}


</style>

<style>
.p-tabmenu .p-tabmenu-nav {
     background: transparent !important;
  }
.p-dock-item-current{
  transform: scale(1.3) !important;
}
.p-dock-item-next{
  transform: scale(1.2) !important;
}
</style>