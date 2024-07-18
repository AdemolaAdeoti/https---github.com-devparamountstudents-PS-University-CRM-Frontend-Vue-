// import Vue from 'vue'
// import VueRouter from 'vue-router'

import { createRouter, createWebHistory } from "vue-router";
import IndexView from "../views/IndexVue";

import HelpAndSupport from "../views/HelpAndSupport.vue";
import Dashboard from "../views/dashboard/Dashboard.vue";
import TermsPrivacy from "../views/terms/Terms-privacy.vue";

import ResetPassword from "../views/password/ResetPassword";
import Notification from "../views/notification/Notification";
import ForgetPassword from "../views/password/ForgetPassword";
import UniversityProfile from "../views/profile/UniversityProfile.vue";
import TechnicalSupport from "../views/terms/Technical-Support.vue";
import StudentTracking from "@/views/tracking/StudentTracking.vue";
import StudentApplication from "@/views/student/StudentApplication.vue";
import StudentSidebar from "../views/student/StudentSidebar.vue";
import ChatMessage from "../views/chats/ChatMessage.vue";
import ChatBox from "@/components/Chats/ChatBox.vue";
import FavouriteMessage from "../views/chats/FavouriteMessage.vue";
import UnreadMessage from "../views/chats/UnreadMessage.vue";
import ConfirmPasswordReset from "../views/password/ConfirmPasswordReset";
//import Promotions from "../views/promotions/Promotions.vue";
import StudentLetter from "../views/StudentLetter.vue";
//import PromotionInsight from "../views/promotions/PromotionInsight.vue";
//import CreatePromotions from "../views/promotions/CreatePromotion.vue";

import Programmes from "../views/programmes/Programmes.vue";
import CreateProgrammes from "../views/programmes/CreateProgram.vue";
import SignIn from "../views/signIn/SignIn";
import EmailOTP from "../views/otp/EmailOTP";
import middleware from "@/middleware/auth.js";

import viewChats from "../views/chats/viewChats.vue";
import ReceiptPage from "@/views/payments/ReceiptsPage.vue";
// Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "IndexView",
    component: IndexView,
    // meta: { requiresAuth: true },
    children: [
      {
        path: "",
        name: "Home",
        redirect: "/univeristyprofile",
      },
      {
        path: "/univeristyprofile",
        name: UniversityProfile,
        component: UniversityProfile,
      },
      {
        path: "/dashboard",
        name: "Dashboard",
        component: Dashboard,
      },
      {
        path: "/help-and-support",
        name: "HelpAndSupport",
        component: HelpAndSupport,
      },
      {
        path: "/chats/view",
        name: "ChatDetails",
        component: viewChats,
        props:true,
      },
      {
        path: "/chats/:chatOptions?",
        name: "ChatMessage",
        component: ChatMessage,
      },
      {
        path: "/chats/newmessage",
        name: "ChatBox",
        component: ChatBox,
      },
      {
        path: "/favouritemessage",
        name: "Favouritemessage",
        component: FavouriteMessage,
      },
      {
        path: "/unreadmessage",
        name: "UnreadMessage",
        component: UnreadMessage,
      },

      {
        path: "/student-application",
        name: "StudentApplication",
        component: StudentApplication,
      },
      {
        path: "/student-application/:id",
        name: "StudentSidebar",
        component: StudentSidebar,
      },
      {
        path: "/student-tracking",
        name: "StudentTracking",
        component: StudentTracking,
      },
      {
        path: "/notifications",
        name: "Notifications",
        component: Notification,
      },
      /*{
        path: "/promotions",
        name: "Promotions",
        component: Promotions,
      },
      {
        path: "/promotions/insights/:id",
        name: "PromotionInsight",
        component: PromotionInsight,
      },
      {
        path: "/create-promotions",
        name: "CreatePromotions",
        component: CreatePromotions,
      }*/
      {
        path: "/settings",
        name: "Settings",
        component: () => import("./../views/settings/SettingsView.vue"),
      },

      {
        path: "/programs",
        name: "Programs",
        component: Programmes,
      },
      {
        path: "/create/programs",
        name: "CreatePrograms",
        component: CreateProgrammes,
      },
      {
        path: "/student_letter",
        name: "StudentLetter",
        component: StudentLetter,
      }, {
        path: "/receipt",
        name: "Receipt",
        component: ReceiptPage,
      },      
    ],
  },

  {
    path: "/terms-privacy",
    name: "TermsPrivacy",
    component: TermsPrivacy,
  },
  {
    path: "/forgot-password",
    name: "ForgetPassword",
    component: ForgetPassword,
    meta: { skipAuth: true },
  },
  {
    path: "/reset-password/:email",
    name: "ResetPassword",
    component: ResetPassword,
    meta: { skipAuth: true },
  },
  {
    path: "/confirm-reset-password/:email",
    name: "ConfirmPasswordReset",
    component: ConfirmPasswordReset,
    meta: { skipAuth: true },
  },
  {
    path: "/technical-support",
    name: "TechnicalSupport",
    component: TechnicalSupport,
  }, 
  {
    path: "/login",
    name: "LogIn",
    component: SignIn,
    meta: { skipAuth: true },
  },
  {
    path: "/email-verification",
    name: "EmailOTP",
    component: EmailOTP,
    meta: { skipAuth: true },
  },
];
// const isAthenticated = localStorage.getItem("user");
const router = new createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    // always scroll to top btw routes
    return { top: 0 };
  },
});
router.beforeEach(middleware);
// router.beforeEach( (to, from, next) => {
//   if (
//     // make sure the user is authenticated
//     isAthenticated && to.path !== '/login'
//   ) {
//     // redirect the user to the login page
//     //return { name: 'LogoIn' }
//     alert('not loggedin')
//     next();

//   }
//   router.push({ name: 'LogIn' });
//     // return '/login'

// })

// router.beforeEach(async (to, _, next) => {
//   if (to.matched.some(routeRecord => routeRecord.meta.requiresAuth)) {
//     if (!isAthenticated) {
//       //next({ name: 'LogIn' })
//       //router.push({ name: 'LogIn' })
//       window.location.replace('/login')
//     }
//   } else {
//     next()
//   }
// })

// router.beforeEach((to, from, next) => {
//   if (
//       // 'requiresAuth' in to.meta &&
//       to.meta.requiresAuth &&
//       !isAthenticated
//   ) {
//       next('/login');
//       console.log('pls login')
//   } else if (
//       // 'auth' in to.meta &&
//       to.meta.requiresAuth &&
//       isAthenticated
//   ) {
//       next('/dashboard');
//       console.log('dashboard')
//   }
//   // else {
//   //     next();
//   // }
// });
//buchi uncomment

// router.beforeEach((to, _, next) => {
//   const privatePages = [
//     "/dashboard",
//     "/help-and-support",
//     "/inbox",
//     "/student-application",
//     "/student-tracking",
//   ];
//   const isAthenticated = localStorage.getItem("user");
//   // redirect the user to the login page if they arent authenticated
//   if (!isAthenticated && privatePages.includes(to.path)) {
//     //return next({ name: 'LogIn' })
//     //return router.push({ name: 'LogIn' })
//     //return window.location.replace("/login");
//     return next('/login')
//   } else if (isAthenticated && to.path === "/login") {
//     // make sure the user is authenticated
//     //router.push('/')
//     //return next({ name: 'Dashboard'})
//     //return (window.location.href = "/dashboard");
//     return next('/dashboard')
//   } else {
//     next();
//   }
// });

// router.beforeEach((to, _, next) => {
//   const privatePages = [
//     "/dashboard",
//     "/help-and-support",
//     "/inbox",
//     "/student-application",
//     "/student-tracking",
//   ];
//   const isAthenticated = localStorage.getItem("user");
//   // redirect the user to the login page if they arent authenticated
//   if ( !isAthenticated && privatePages.includes(to.path) ) {
//     //return next({ name: 'LogIn' })
//     //return router.push({ name: 'LogIn' })
//     //return window.location.replace("/login");
//     console.log(isAthenticated)
//     return next('/login')
//   }  else {
//     next();
//   }
// });

// router.beforeEach((to) => {
//   const publicPages = ['/login'];
//   const authRequired = !publicPages.includes(to.path);
//   if (authRequired && !isAthenticated) {
//     // console.log(authRequired)
//     return '/login'
//   }
// })

export default router;
