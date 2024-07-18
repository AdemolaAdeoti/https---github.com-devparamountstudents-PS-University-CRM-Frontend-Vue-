<template lang="html">
    <div>
        <div class="d-flex justify-content-between">
            <h1 class="heading mb-4">Notification</h1>
            <div class="mr-7">
                <button class="clearAll btn btn-large px-4 fw-500" @click="clearNotifications()"
                    :disabled="notifications?.data?.length == 0">Clear All Notifications</button>
            </div>
        </div>
        <div class="card rounded-09" id="notifications">
            <div v-if="notifications?.data?.length > 0">
                <div v-for="notification in notifications?.data" :key="notification.id"
                    :class="{ 'active': notification?.highschool_viewed == '0' }"
                    class="card-body border-bottom d-flex align-items-center justify-content-between">
                    <div class="d-flex align-items-center">
                        <span class="p-1 bg-primary border-primary rounded-circle" v-if="notification.viewed == 0">
                            <span class="visually-hidden">New alerts</span>
                        </span>
                        <div v-else class="m-1"></div>
                        <!-- <img :src="`${notification.userImage}`" alt="" class="rounded profile-image m-3"/> -->
                        <div @click="markAsRead(notification, $event)"
                            style="border-radius:50%; padding:20px; background:white;" class="mx-3">
                            <svg width="40" height="40" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
                                xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512"
                                enable-background="new 0 0 512 512" xml:space="preserve">
                                <path style="pointer-events: none;" :fill="notification.viewed == '0' ? '#fac515' : '#bbb'"
                                    d="M410.9,0H85.1C72.3,0,61.8,10.4,61.8,23.3V512L248,325.8L434.2,512V23.3C434.2,10.4,423.8,0,410.9,0z" />
                            </svg>
                        </div>
                        <div class="subject-n-message d-flex justify-content-between">
                            <div class="mr-3 mb-2 mt-3">
                                <h4 class="fw-bold">{{ notification.title }}</h4>
                                <div v-html="notification.description"></div>
                            </div>
                        </div>
                    </div>
                    <span class="m-3">{{ notification.created_at }}</span>
                </div>
            </div>
            <div v-else>
                <div class="emptyNotification d-flex justify-content-between flex-column">
                    <img class="w-10" :src="require('/src/assets/images/notification/notificationEmpty.png')"
                        alt="empty Notification" />
                    <p class="text-center text-gray emptyText">No New Notifications</p>
                </div>
            </div>
            <PaginationData :paginationData="notifications" @onFetch="onFetchFunc($event)" />
        </div>
    </div>
</template>
<script>
//notification is listened on indexVue.vue file
import PaginationVue from "@/components/Global/Pagination.vue";
import { post } from "@/api/client";
export default {
    name: "NotificationScreen",
    data() {
        return {
            notifications: {},
            notifyKey: 0,
        };
    },
    components: {
        PaginationData: PaginationVue,
    },
    methods: {
        async markAsRead(notification, event) {
            const pathElement = event.currentTarget.querySelector("path");
            if (notification.viewed === "0") {
                let res = await post(
                    'api/notifications/mark_as_read',
                    { notification_id: notification.id, owner_type: "highschool" },
                    false
                );

                if (res?.message) {
                    pathElement.setAttribute("transform", "scale(-1, 1)");
                    pathElement.setAttribute("transform-origin", "center");
                    this.$globals.notification.total_unread -= 1;
                    notification.viewed = "1";
                }
            }
        },
        clearNotifications() {
            this.$globals.notification = [];
        },
        async onFetchFunc(data) {
            console.log(data);
            this.$globals.notification.message = data;
        },
    },
    watch: {
        "$globals.notification"() {
            this.notifications = this.$globals.notification?.message;
        },
        "$globals.notification.message"() {
            this.notifications = this.$globals.notification?.message;
        },
    },
    mounted() {
        this.notifications = this.$globals.notification?.message;
    },
};
</script>
<style scoped>
path {
    transition: all 0.3s;
}

.active {
    background-color: #f5f5ff;
}

.border-primary {
    color: #0408e7 !important;
}

.card-body:nth-child(1).active {
    border-top-left-radius: 0.9em;
    border-top-right-radius: 0.9em;
}

.clearAll {
    background: #fac515;
}

.emptyNotification {
    height: 100%;
    line-height: 100vh;
    position: relative;
}

.emptyNotification img {
    display: block;
    margin-left: auto;
    margin-right: auto;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.fw-500 {
    font-weight: 500;
}

.heading {
    margin-left: 7vw;
}

.mr-7 {
    margin-right: 7vw;
}

#notifications .card-body:last-of-type {
    margin-bottom: 7em;
}

.profile-image {
    width: 88px;
    height: 88px;
}

p.emptyText {
    margin-top: 30vh;
    font-size: 36px !important;
}

.rounded-09 {
    border-radius: 0.9em !important;
    z-index: -1;
}

.text-gray {
    color: #98a2b3;
}

.w-10 {
    width: 90px;
    height: 95px;
}

p {
    margin: 0px !important;
    margin-bottom: 0px !important;
}

.card {
    position: static;
}</style>