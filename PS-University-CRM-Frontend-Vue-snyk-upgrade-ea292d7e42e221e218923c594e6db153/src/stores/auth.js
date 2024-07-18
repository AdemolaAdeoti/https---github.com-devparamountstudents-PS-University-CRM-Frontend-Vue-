import { defineStore } from "pinia";
//import Swal from "sweetalert2";
import { removeToken } from "@/utilities/authTokens";
import { useLocalStorage } from "@vueuse/core";
// import { fetchWrapper } from '@/helpers';
// import { router } from '@/router';
import { useUserStore } from "./user";

import { post } from "@/api/client";
//import axios from "axios";

// import { useAlertStore } from '@/stores/alert';

// const baseUrl = `${import.meta.env.VITE_API_URL}/users`;

export const useAuthStore = defineStore("auth", {
  state: () => ({
    // initialize state from local storage to enable user to stay logged in
    userId: 0,
    password: "",
    userInfo: useLocalStorage("userInfo", {}),
    // session: useLocalStorage("session", {}),
    userToken: useLocalStorage("userToken", null),
  }),
  getters: {},
  persist: true,
  actions: {
    setStoreToken(token) {
      this.userToken = token;
    },
    async login(unique_id, password,) {          
        const AuthenticatedUser = await post("login_uv", {
          unique_id: unique_id,
          password: password,
        },true);
        
        // const { status, user, authorisation } = AuthenticatedUser.data;
        alert('Your OTP: '+AuthenticatedUser.otp)
        if (AuthenticatedUser.status !== 'success') {
          // alert(AuthenticatedUser.message);
          return false;
        }

        // this.$state.session.id = unique_id;
        // this.$state.session.password = password;
        
        this.$state.password = AuthenticatedUser.password;
        this.$state.userId = unique_id;
        
        return true;       
    },
    async signup(lastName, firstName, email, password, profilePic) {     
      
        const AuthenticatedUser = await post(
          "register_university",
          {
            last_name: lastName,
            first_name: firstName,
            email: email,
            password: password,
            profile_photo_url: profilePic,
          },
          "admin"
        );
        console.log(AuthenticatedUser);    
    },
    async logout() {
      //set usertoken in pinia state to null
      this.userToken = null;
      const userStore = useUserStore();
      /*   console.log(userStore.getUser.email);
      console.log(this.userToken); */
      // try {
      // await get("logout_admin", "admin");
      userStore.removeUser();
      this.$state.userToken = null;
      removeToken();
      localStorage.clear();
      return (window.location.href = "/login");
      //   if(logoutRequest.status == 401) alert('expired token')

      //remove token for local storage
      // removeToken();

      //redirect to login page
      // return (window.location.href = "/login");
    },
  },
});
