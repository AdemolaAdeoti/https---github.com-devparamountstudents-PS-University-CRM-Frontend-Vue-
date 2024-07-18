<template lang="html">
  <div>
    <div class="top-0 dashboard-nav position-fixed w-81-4 end-0 z-index-1">
      <div class="custom-nav mx-auto text-light d-flex justify-content-sm-between py-0">
        <div class="d-flex align-items-center px-3">
          <div class="menu-toggle-btn">
            <!-- Menu close button for mobile devices -->
            <a data-bs-toggle="offcanvas" href="#offcanvas" role="button" aria-controls="offcanvas">
              <i class="pi pi-bars fs-4"></i>
            </a>
          </div>
          <ul class="px-3 text-end date">
            <li class="fw-light">{{ currentDay.toUpperCase() }}</li>
            <li class="fw-light">{{ currentMonth.toUpperCase() }}</li>
            <li class="fw-light">{{ currentYear }}</li>
          </ul>
          <div class="">
            <h1 class="fw-normal">{{ currentDate }}</h1>
          </div>
        </div>
        <div class="d-flex align-items-center">
          <ul class="d-flex fs-6 align-items-center notification">
            <li class="cursor" @click="notification()">
              <img class="px-2" :src="require('/src/assets/images/d-board/notificaition.svg')" alt=""
                v-if="$globals.notification?.total_unread == 0" />
              <span v-else>
                <img class="px-2" :src="require('/src/assets/images/notification.svg')" alt="" />
                <span class="badge position-absolute translate-custom-middle p-02 bg-danger rounded-pill">
                  {{ $globals.notification?.total_unread }}
                  <span class="visually-hidden">unread messages</span>
                </span>
              </span>
              <span class="notification-text">
                  Notifications
                </span>
            </li>
            <li class="mx-5 cursor">
              <v-GoogleTranslateSelect default-language-code="en" default-page-language-code="en"
                :fetch-browser-language="false" trigger="click" @select="handleGoogleTranslateSelect" /> 
                
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

const notifications = [
  {
    id: 1,
    userImage: require('/src/assets/images/d-board/avater.svg'),
    subject: 'Subject: New Student Request',
    message:
      'The student’s financial accounts must be current prior to the college furnishing any transcripts or other documentation. Some documents will only be completed at the discretion of the Administrator',
    created_at: '1m',
    receipt: false,
  },
  {
    id: 2,
    userImage: require('/src/assets/images/d-board/avater-1.svg'),
    subject: 'Document Reupload',
    message:
      'The student’s financial accounts must be current prior to the college furnishing any transcripts or other documentation. Some documents will only be completed at the discretion of the Administrator',
    created_at: '1m',
    receipt: false,
  },
  {
    id: 3,
    userImage: require('@/assets/images/notification/avatar-2.svg'),
    subject: 'New Student Request',
    message:
      'The student’s financial accounts must be current prior to the college furnishing any transcripts or other documentation. Some documents will only be completed at the discretion of the Administrator',
    created_at: '23m',
    receipt: true,
  },
  {
    id: 4,
    userImage: require('/src/assets/images/notification/avatar-3.svg'),
    subject: 'New Student Request',
    message:
      'The student’s financial accounts must be current prior to the college furnishing any transcripts or other documentation. Some documents will only be completed at the discretion of the Administrator',
    created_at: '1h',
    receipt: true,
  },
  {
    id: 5,
    userImage: require('/src/assets/images/notification/avatar-4.svg'),
    subject: 'Document Reupload',
    message:
      'The student’s financial accounts must be current prior to the college furnishing any transcripts or other documentation. Some documents will only be completed at the discretion of the Administrator',
    created_at: '1d',
    receipt: true,
  },
];
export default {
  name: 'NavBar',
  props: ['title'],

  data() {
    return {
      currentId: 1,
      animate: true,
      months: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ],
      days: [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ],
      currentMonth: '',
      currentDay: '',
      currentDate: '',
      currentYear: '',
      notifications: [],
    };
  },

  methods: {
    handleGoogleTranslateSelect(language) {
      console.log(language)
    },
    notification() {
      this.$globals.reloadNotification += 1
      this.$router.push('/notifications');
    },
    saveNotificationToLocalStorage() {
      localStorage.setItem('notifications', JSON.stringify(notifications));
      this.notifications =
        JSON.parse(localStorage.getItem('notifications')) || [];
      window.dispatchEvent(
        new CustomEvent('notifications-changed', {
          detail: {
            storage: localStorage.getItem('notifications'),
          },
        })
      );
    },
  },

  computed: {
    animateClass() {
      return !this.animate;
    },
  },

  created() {
    this.saveNotificationToLocalStorage();
    window.addEventListener('notifications-changed', (event) => {
      this.notifications = JSON.parse(event.detail.storage);
    });
  },

  mounted() {
    const d = new Date();
    this.currentMonth = this.months[d.getMonth()];
    this.currentDay = this.days[d.getDay()];
    this.currentDate = d.getDate();
    this.currentYear = d.getFullYear();
  },
};
</script>
<style>
.custom-nav .menu-toggle-btn a {
  font-size: 30px;
  color: rgba(247, 168, 51, 0.8);
}

.z-index-1 {
  z-index: 100;
}

.translate-custom-middle {
  transform: translate(-85%, 0%) !important;
}

.p-02 {
  padding: 0.3em 0.4em !important;
}

.badge {
  line-height: 5px;
  text-align: center;
}

.w-80 {
  width: 80%;
}

.w-20 {
  width: 20% !important;
}

.hovered:hover {
  background: #f2f4f7;
  border-radius: 8px;
}

.icon-size {
  width: 18px;
}

.top-0 {
  top: 0;
}
.google-translate-select-dropdown__menu{
  left:-67px !important;
}
</style>
