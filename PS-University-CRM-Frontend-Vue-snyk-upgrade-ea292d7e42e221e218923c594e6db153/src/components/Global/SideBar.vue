<template lang="html">
  <div>
    <div class="d-flex flex-column flex-grow-1 align-items-center text-white sticky-top">
      <div class="align-items-center w-100">
        <div class="dashboard-nav h-auto py-3 ps-3">
          <div class="rounded-circle px-2">
            <img class="rounded-circle "
              :src="userInfo?.high_school?.cover_photo_url || require('/src/assets/images/d-board/avater.svg')" alt="logo"
              width="45" />
            <div class="pt-2">
              <span class="fs-6">{{ userInfo.unique_id }}</span>
            </div>
            <div class="pt-1 d-flex flex-lg-row justify-content-between lg-align-items-center">
              <div class="pt-0">
                <small class="fw-light" lang="en" translate="no">{{ userInfo.email }}</small>
              </div>
              <div class="pt-0 cursor" @click="setting()">
                <small class="fw-light">
                  <img :src="require('/src/assets/images/d-board/settings.svg')" alt="logo" /><span
                    class="px-2">Settings</span></small>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="w-100 overflow-auto dashboard-fixed">
        <div class="w-100 overflow-auto dashboard-fixed">
        <div class="admin-wrapper bg-light flex-column flex-nowrap flex-shrink-1 flex-grow-1 mb-2 justify-content-center align-items-center">
        <div v-for="link in links" :key="link.id" :class="getLinkClasses(link)"  @click="handleLinkClick(link, $event,false)">
          <span  :class="[' icon-size me-2']" :id="link.icon" > <object class="menu-ico" :data="getIconPath(link)" type="image/svg+xml"></object></span>
          <span style="pointer-events: none;font-size: 15px;">{{ link.title }}</span>
          <span v-if="hasChildren(link)" class="sidebar-link-expand-icon">
            <i :class="['fas', { 'fa-rotate-90': isExpandedFunc(link) }]"></i>
          </span>
        
          <div v-if="isExpandedFunc(link)" class="w-100 py-0 btn nav nav-pills px-0 d-flex flex-column align-items-start mx-0 hovered expanded">
          <div v-for="innerLink in getInnerLinks()" :key="innerLink.id" @click="handleLinkClick(innerLink,$event, true)" :class="[{'text-dark': !isActive(link)}, 'position-relative text-light w-100 align-items-center d-flex btn nav nav-pills d-flex me-1 innerHovered justify-content-start']">
            <img v-svg-inline :src="require(`@/assets/images/d-board/${innerLink.img}`)" alt="" class="icon-size-child me-2" />
            <span style="pointer-events: none;v" >{{ innerLink.title }}</span>
          </div>
        </div>
        </div>
      </div>
      </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.dashboard-fixed::-webkit-scrollbar,
.sidenav::-webkit-scrollbar {
  width: 5px;
  height: 8px;
}

.sidenav::-webkit-scrollbar {
  background-color: #aaa;
}

.sidenav::-webkit-scrollbar-thumb {
  background: #000;
}

.p-tag {
  font-size: 10px !important;
  background-color: transparent !important;
  color: black;
  padding-top: 5px;
}
.hovered{
  border-radius: 8px;
}
.hovered:hover {
  background: #1d2939;
  border-radius: 8px;
  color: #fff;
}
.activeBtn{
  background: linear-gradient(45deg, #1d2939, #27374d);
  border-radius: 8px;
  color: #fff;
}
.activeBtn .hovered {
  background: #1d2939;
}
.innerHovered:hover {
  background: #f0ad4e;
  border-radius: 8px;
  color: #fff;
}
</style>
<script>
import { useAuthStore } from "@/stores/auth";
import jquery from 'jquery';
const $ = jquery;
export default {
  name: "SideBar",
  data() {
    return {
      animate: true,
      currentId: null,
      userInfo: {},
      links: [
        {
          id: 1,
          title: "Dashboard",
          img: "dash-b-o.svg",
          imgBlack: "dash-b-black.svg",
          linkRoute: "/dashboard",
          children: []
        },
        {
          id: 2,
          title: "Student Applications",
          img: "student-application-o.svg",
          imgBlack: "student-application-black.svg",
          linkRoute: "/student-application",
          children: []
        },
        {
          id: 3,
          title: "Programs ",
          img: "student-tracking-o.svg",
          imgBlack: "student-tracking-black.svg",
          linkRoute: "/programs",
          children: []
        },
        {
          id: 4,
          title: "Chats",
          img: "chat.svg",
          imgBlack: "chat.svg",
          linkRoute: "/chats",
          children: []
        },
        /*{
          id: 5,
          title: "Promotions",
          img: "megaphone-o.svg",
          imgBlack: "megaphone.svg",
          linkRoute: "/promotions",
          children: []
        },*/
        {
          id: 6,
          title: "Receipts Mgt",
          img: "help-support-o.svg",
          imgBlack: "help-support-black.svg",
          linkRoute: "/receipt",
          children: []
        },
        {
          id: 7,
          title: "Student Letter",
          img: "letter.svg",
          imgBlack: "letter.svg",
          linkRoute: "/student_letter",
          children: []
        }, 
        {
          id: 8,
          title: "Help and Support",
          img: "help-support-o.svg",
          imgBlack: "help-support-black.svg",
          linkRoute: "/help-and-support",
          children: []
        },
        {
          id: 9,
          title: "Logout",
          img: "logout.svg",
          imgBlack: "logout.svg",
          linkRoute: "/login",
          children: []
        },
      ],
      newRoute: "",
      termsDisplay: "",
    };
  },
  methods: {
    changeFill(link) {
      const image = document.getElementById(link.icon)           
      const svgElement = image.querySelector('path');
      console.log(svgElement)
      svgElement.setAttribute('fill', 'white');
    },
    getIconPath(link) {
      try {
        return require(`@/assets/images/d-board/${link.imgBlack}`);
      } catch (error) {   
        return require('@/assets/images/d-board/student-tracking-black.svg');
      }
    },
    getLinkClasses(link) {
      return ['btn nav nav-pills nav-pills-main my-0  mt-1 ms-3 me-1 hovered justify-content-start',{
        'activeBtn': this.isActive(link),
        /* 'active': this.isActive(link), */
        'sidebar-link-expanded': this.isExpandedFunc(link)
      }];
    },
    hasChildren(link) {
      return link.children && link.children.length > 0;
    },
    isExpandedFunc(link) {
      return this.expandedLinkId === link.id;
    },
    getInnerLinks() {
      const expandedLink = this.links.find(link => link.id === this.expandedLinkId);
      return expandedLink ? expandedLink.children : [];
    },
    isActive(link) {
      return this.currentId === link.id;
    },
    async handleLinkClick (link,e, child) {
        if (this.hasChildren(link)) {
          this.expandedLinkId = this.expandedLinkId === link.id ? null : link.id;
          this.currentId = link.id;
        } else {
          this.expandedLinkId = null;
          if(this.currentId == link.id) return false
          this.currentId = link.id;        
          this.displayView(link.id,link.linkRoute)
        }
        
        if(!child){        
       
          this.setDefaultIconColor()      
          
         this.setIconColor(e.target)

       //   $(e.target).find('object #document svg path').css('fill','#ffc107');
        }else{
          if(!$('svg.icon-size-child path')) return true;
          await  $('svg.icon-size-child path').each(function(){
              $(this).css('fill','white');
          })        
          $(e.target).find('svg.icon-size-child path').css('fill','#ffc107');
          
        }
      },
    displayView(linkId, link) {
      let value = { linkId, link };      
      this.handleDisplayText(value);
    },
    setIconColor(e){
      try{

        $(e.firstChild.firstChild.contentDocument.children[0]).children().each(function(){                        
          $(this).css('fill','#ffc107')            
          if($(this)[0].tagName == 'g'){
            $(this).children().each(function(){   
              console.log($(this),6666666)          
              $(this).css('fill','#ffc107')
            })
          }
        }) 
      }catch(e){
        console.log(e)
      }
    },
    setDefaultIconColor(){
      $(document.querySelectorAll('object.menu-ico')).each(function(){                                                       
            $(this).contents().contents().children().each(function(){   
                             
                $(this).css('fill','#1d2939')
                if($(this)[0].tagName == 'g'){
                  $(this).children().each(function(){                       
                    $(this).css('fill','#1d2939')
                  })
                }
              })
     
          }) 
    },
    handleDisplayText(value) {      
      let linkId, link;
      [linkId, link] = Object.values(value);
      this.currentId = linkId;
      //this.termsDisplay = linkTerms;
      this.linkRoute = link;          
      if(this.linkRoute =='/login'){
        this.logout()
        return false;
      }
      this.$router.push(`${this.linkRoute}`);      
    },
    setting() {
      this.$router.push("/settings");
    },
    getLocation() {
      let location = window.location.pathname.split("/")[1];
      let linkId = this.links.find((el) => el.linkRoute === `/${location}`);
      this.currentId = linkId != undefined ? linkId.id : null;
      return linkId;
    },
    logout() {      
      const authStore = useAuthStore();
      authStore.logout();
    },
  },
  watch:{
    '$route.path':function(newdata, old){
      let link = this.links.find((item)=> item.linkRoute === newdata)      
      this.displayView(link?.id,link?.title,link?.linkRoute);
      old
    },
  }, 
  computed: {
    animateClass() {
      return !this.animate;
    },
  },
  beforeMount() {
    const authStore = useAuthStore();
    this.userInfo = authStore.$state.userInfo;
  },
  mounted() {
    
    this.getLocation();
    this.$nextTick(()=>{
      setTimeout(()=>{
        this.setDefaultIconColor()        
        this.setIconColor(document.getElementsByClassName('activeBtn')[1])
      },1000)
    })
  },
};
</script>
