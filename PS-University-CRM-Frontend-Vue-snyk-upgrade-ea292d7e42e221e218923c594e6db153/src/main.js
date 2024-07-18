import { createApp, reactive } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
 
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "../src/assets/styles/app.css";
import "../src/assets/styles/color.css";
import "../src/assets/styles/buttons.css";
import "../src/assets/styles/utilities.css"; 
import "../src/assets/styles/animation.css";
import "vue-material-design-icons/styles.css";
import GoogleTranslateSelect from "@google-translate-select/vue3";
import PrimeVue from "primevue/config";
import VueStripeElements from 'vue-stripe-elements-plus';

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

//import 'primevue/resources/themes/saga-blue/theme.css';       //theme
/* import "primevue/resources/primevue.min.css"; //core css
import "primeicons/primeicons.css"; // icons */
import 'primevue/resources/themes/aura-light-green/theme.css'
import "../src/assets/theme.css";
import VOtpInput from "vue3-otp-input";
import OtpInput from "@bachdgvn/vue-otp-input";

import TheModal from "@/components/Global/TheModal.vue";
// import 'vue-phone-number-input/dist/vue-phone-number-input.css';
import VuePhoneNumberInput from "vue-phone-number-input";
import Calendar from "primevue/calendar";
import ConfirmationService from "primevue/confirmationservice";
import InputText from "primevue/inputtext";
import ToastService from "primevue/toastservice";
import Dropdown from "primevue/dropdown";
import Editor from "primevue/editor";
import initializeEcho from './plugins/pusher.js';
import { globals } from "./stores/globals";
import CKEditor from '@ckeditor/ckeditor5-vue';
/* import 'highlight.js/styles/stackoverflow-dark.css' */
import 'highlight.js/styles/github-dark.css';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import hljsVuePlugin from "@highlightjs/vue-plugin";

hljs.registerLanguage('javascript', javascript);

const app = createApp(App);
app.use(VueStripeElements, {
    publishableKey: 'YOUR_STRIPE_PUBLISHABLE_KEY',
});
app.component("vue-phone-number-input", VuePhoneNumberInput);
app.component("v-otp-input", OtpInput);
app.component('v-GoogleTranslateSelect',GoogleTranslateSelect)
app.component("v-otp-input", OtpInput);
app.component("v-otp-input", VOtpInput);
app.component("TheModal", TheModal);
app.component("CalendarComponent", Calendar);
app.component("DropDown", Dropdown);
app.component("EditorComponent", Editor);
app.use( CKEditor );
app.use(createPinia()); // Create the root store
app.use(router);
app.use(PrimeVue);
app.use(ConfirmationService);
app.use(ToastService);
app.use(hljsVuePlugin)
const deepGlobals = reactive(globals);
deepGlobals.notification = reactive(deepGlobals.notification);
deepGlobals.chats = reactive(deepGlobals.chats);
app.config.globalProperties.$globals = deepGlobals;
app.component("InputText", InputText);

//window.baseUrl = `http://localhost:8000/`;
window.baseUrl = `https://crm.paramountstudents.com/`;
//window.baseUrl = `https://crm-demo.paramountstudents.com/`;

// axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

app.mount("#app");

if(!window.Echo && localStorage.getItem('user')){    
    initializeEcho(window.baseUrl,localStorage.getItem('user'));
}