<template>
  <!--    <div id="app">-->
  <!--        <router-view />-->
  <!--    </div>-->
  <div>
    <RequestLoader />
    <router-view />
  </div>
</template>
<script> 
import { get } from "@/api/client";
import RequestLoader from '@/components/Global/RequestLoader';
export default {
  components: { RequestLoader },
  data() {
    return {
      isActive: false,
      idleTime: 0,
      refreshTokenTime: 3300000,
    };
  },
  methods: {
    async refreshToken() {
      try {
        const response = await get("refresh_uv", "university");
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    },
    // inactivityTime() {
    //   let time;
    //   window.onload = resetTimer();
    //   document.onmousemove = resetTimer();
    //   // document.onkeypress = resetTimer;
    //   document.onkeydown = resetTimer();
    //   function logout() {
    //     console.log("You are now logged out.");
    //   }
    //   function resetTimer() {
    //     clearTimeout(time);
    //     this.isActive = true;
    //     time = setTimeout(logout, 60000);
    //   }
    // },
    checkUserActivity() {
      // let idleTime = 0
      const refreshTokenTime = 3300000;
      const minute = 60000;
      function timerIncrement() {
        this.idleTime = this.idleTime + 1;
        if (this.idleTime > 30) {
          // 30 minutes
          this.isActive = false;
        }
      }
      setInterval(timerIncrement, minute);
      window.onload = resetTimer();
      document.onmousemove = resetTimer();
      // document.onkeypress = resetTimer;
      document.onkeydown = resetTimer();
      function resetTimer() {
        // clearTimeout(time);
        this.idleTime = 0;
        this.isActive = true;
        // time = setTimeout(logout, 60000);
      }
      setTimeout(() => {
        if (this.isActive) {
          this.refreshToken();
          return;
        }
        localStorage.clear();
        return (window.location.href = "/login");
      }, refreshTokenTime);
    },
  },
  mounted() {
    // const remainingTime = JSON.parse(localStorage.getItem('refreshTokenTime'))
    // this.checkUserActivity();
  },
};
</script>
