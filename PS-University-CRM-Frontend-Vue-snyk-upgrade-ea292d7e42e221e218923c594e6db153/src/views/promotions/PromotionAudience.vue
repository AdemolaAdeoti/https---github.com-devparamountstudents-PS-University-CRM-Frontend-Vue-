<!--<template>
  <div class="row px-4">
    <div class="col-sm-6">
      <form @submit.prevent="makePayment()">
        <h2 style="font-size: 100%">Student Applications</h2>
        <div class="card">
          <div class="application-review py-3">
            <div style="width: 90%; margin: auto">
              <h6 class="font-weight-bold pt-2">Programme to promote</h6>
              <h6 class="font-weight-bold pt-2 mt-3">
                Choose a programme code
              </h6>
              <Dropdown
                style="border-radius: 10px"
                v-model="audience.program_id"
                :options="programs"
                optionLabel="program_name"
                optionValue="id"
                placeholder="Program Code"
                class="w-100"
              />
            </div>
          </div>
        </div>

        <div class="card pt-3 mt-4">
          <div style="width: 90%; margin: auto">
            <h6 class="font-weight-bold pt-2">Audience</h6>
            <p class="text-dark pt-2 m-0" style="font-size: 13px !important">Who should see your ads.</p>
            <span class="text-danger" style="font-size: 12px;">Leave empty to promote to anywhere</span>
            <div class="mt-3">
              <div class="row mb-3">
                <div class="col-sm-4">
                  <label for="location">Location</label>
                </div>
                <div class="col-sm-8">
                  <MultiSelect
                    v-model="audience.region_ids"
                    editable
                    :options="regions"
                    optionLabel="name"
                    optionValue="id"
                    placeholder="Select a Location"
                    class="w-100"
                  />
                </div>        
              </div>
           <!--    <div class="row my-4">
                <div class="col-sm-4">
                  <label for="location">country</label>
                </div>                
                <div class="col-sm-8">
                  <MultiSelect
                    v-model="audience.country_ids"
                    :options="cities"
                    optionLabel="name"
                    placeholder="Select Cities"
                    :maxSelectedLabels="3"
                    class="w-100"
                  />
                </div>
              </div> -->
            </div>
          </div>
        </div>
        <div class="card pt-3 mt-4 px-3">
          <div class="py-4 px-4">
            <h6 class="text-dark pt-2 font-weight-bold">Duration</h6>

            <div class="row gx-3 my-3">
          <!--     <div class="col">
                <div class="border border-2 d-flex align-items-center justify-content-between px-3 py-2" style="border-color: #191c1c" >
                <div class="row w-100">
                    <div class="col-12 mb-2">
                      <span>Days</span>                    
                    </div>
                    <div class="col-5 px-1">
                      <input v-model="audience.days" class="form-control  mx-1" >
                    </div>
                    <div class="d-flex align-items-center justify-content-center col-7 px-1">
                      <span class="btn p-0 btn-white mx-1 text-warning"><i style="font-size: 1.5em;" class="pi pi-plus-circle"></i></span>              
                      <span class="btn p-0 btn-white mx-1 text-warning"><i style="font-size: 1.5em;" class="pi pi-minus-circle"></i></span>
                    </div>
                  </div>
                </div>
              </div> -->
              <div class="col">
                <div class="border border-2 d-flex align-items-center justify-content-between px-3 py-2" style="border-color: #191c1c">
                  <div class="row w-100">
                    <div class="col-12 mb-2">
                      <span>Start Date</span>                    
                    </div>                    
                    <div class="d-flex align-items-center justify-content-center col-12 px-1">                     
                      <Calendar v-model="audience.start_date" />
                      <i style="font-size: 2em;" class=" ms-2 pi pi-calendar text-warning"></i>                      
                    </div>
                  </div>
                </div>
              </div>
              <div class="col">
                <div class="border border-2 d-flex align-items-center justify-content-between px-3 py-2" style="border-color: #191c1c">
                  <div class="row w-100">
                    <div class="col-12 mb-2">
                      <span>End Date</span>                    
                    </div>                    
                    <div class="d-flex align-items-center justify-content-center col-12 px-1">                     
                      <Calendar v-model="audience.end_date" />
                      <i style="font-size: 2em;" class=" ms-2 pi pi-calendar text-warning"></i>                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <h6 class="font-weight-bold pt-1">Total Budget</h6>
            <p class="text pt-1" style="font-size: 13px !important">
              your payment will be processed n USD($)
            </p>
            <div>
              <h6 class="font-weight-bold pt-1">Daily Budget</h6>
              <p
                class="text-dark text-center pt-2"
                style="font-size: 13px !important"
              >
                Estimate 1k-10k reached per day
              </p>
              <div
                class="border border-1 border-warning d-block rounded text-center"
                style="
                  background-color: #fdedb6;
                  width: 5rem;
                  margin: 1rem auto; ">
                <p class="m-0">${{ estimatedPriceCal }}</p>
              </div>
              <Slider
                @change="updateTooltipPosition($event)"
                v-model="audience.daily_budget"
                class="w-14rem"
                :step="100"
                :min="1000"
                :max="10000"
              />
            </div>
          </div>
        </div>
        <div>
          <div class="d-flex my-4">
            <input v-model="accept" type="checkbox" class="mr-2" name="terms" id="terms" />
            <label for="terms" class="ml-1 font-size-sm" style="font-size: 13px; margin-left: 8px">
              By clicking make payment now, you agree to Paramount Students'
              Terms & conditions
            </label>
          </div>
          <div class="text-center my-4">
            <a @click="addItem" :class="{'btn-light border text-secondary uselect':!accept,'btn-warning':accept}" class="w-100 rounded btn">
              add Item to cart
            </a>
          </div>
        </div>
      </form>
    </div>
    <div class="col-sm-6 mt-4">
      <div class="card shadow mb-3">
        <div class="application-review py-4">
          <div style="width: 90%; margin: auto">        
            <h6 class="text-dark pt-2">Estimate daily Result</h6>

            <h6 class="card-title text-truncate px-3 py-2 row mb-0">
              <span class="text-secondary col-3 text-dark text-truncate p-0"
                >People Reach:</span
              >
              <span class="col text-truncate">{{ this.audience.daily_budget  }}k</span>
            </h6>
            <hr style="border: 1px solid #f79009" />
            <h6 class="text-dark pt-2">Payment summary</h6>
            <h6 class="card-title text-truncate px-3 py-3 row mb-0">
              <span class="text-secondary col-6 text-dark text-truncate p-0"
                >Your Promotion will run for: </span
              >
              <span class="col text-truncate">{{numberOfDays}} days</span>
            </h6>
            <h6 class="card-title text-truncate px-3 py-2 row mb-0">
              <span class="text-secondary col-3 text-dark text-truncate p-0"
                >Total Budget:</span>
              <span class="col text-truncate">$ {{numberOfDays * estimatedPriceCal }}</span>
            </h6>
       <!--      <h6 class="card-title text-truncate px-3 py-2 row mb-0">
              <span class="text-secondary col-3 text-dark text-truncate p-0"
                >Total amount:</span
              >
              <span class="col text-truncate">$10000</span>
            </h6> -->
          </div>
        </div>
      </div>
      <div class="card shadow">
        <div class="application-review py-4">
          <div style="width: 90%; margin: auto">
            <h6 class="text-dark pt-2">Cart Items</h6>
            <table class="table">
              <thead>
                <tr>
                  <td>Items / (programs) </td>
                  <td>Daily Reach</td>
                  <td>Duration</td>
                  <td>Cost</td>
                  <td></td>
                </tr>
              </thead>
                <tbody>
                  <tr v-for="(item, k) in carts" :key="k">
                    <td>{{ programeName(item.program_id) }}</td>
                    <td>{{ item.daily_budget }}</td>
                    <td>{{ item.duration }}</td>
                    <td>${{ priceCal(item.total_budget)}}</td>
                    <td> <a @click="removeItemFromCart(k)" class="d-inline text-white btn btn-danger btn-sm py-0"> <i class="py-0 pi pi-minus"></i> </a></td>
                  </tr>
                </tbody>
              </table>       
              <div>
                <span>Total Cost:</span> <span>$ {{calculateTotalBudgetSum}}</span>

              </div>
              <a @click="showModal = true" class=" btn-warning w-100 rounded btn">
                Proceed to Payment
              </a>
          </div>
        </div>
      </div>
    </div>
    <Transition name="bounce">
      
        <div v-if="showModal">      
          <div class="modal-overlay" @click="closeModal"></div>
          <div class="modal-custom"  >
            <div class="modal-header d-flex justify-content-between bg-light">    
            <!--   <img v-if="gateway != null"  class="mx-auto d-block" style="width: 60%; height: 45px; border-radius:7px;" :src="require('/src/assets/'+gateway+'.png')" />           -->
              <b>Payment gateways</b>
              <a class="btn btn-danger btn-sm modal-close text-white" @click="closeModal">&times;</a>
            </div>
            <div class="modal-body p-4" style="height: 100% !important;">
              <Transition name="fade">
                <div v-if="showGatway" class="d-flex w-100 flex-column py-2 px-4 justify-content-center align-items-center" style="height: 86% !important;">
                  
                  <select v-model="gateway"  class="form-control">
                    <option>Select gateway</option>
                    <option v-for="gate in gateways" :key="gate" :value="gate">{{ gate }}</option>
                  </select>
                    <a v-if="gateway != null" class="btn btn-warning btn-sm w-100 mt-3" @click="proceedToPayment(gateway)" style="cursor:pointer;">                      
                      Continue to Checkout
                    </a>
                </div>       
                <div v-else>
                  <form id="payment-form" @submit.prevent="handleSubmit">
                    <div id="link-authentication-element" />
                    <div id="card-element"></div>               
                      
                  <!--  <button id="submit" class="btn btn-warning" :disabled="isLoading">
                        Pay now
                      </button> -->
                      <sr-messages :messages="messages" />
                  </form>
                </div>
              </Transition>
            </div>  
          </div>
        </div>   
        
      </Transition>
      <div v-show="showModal2">      
        <div class="modal-overlay" @click="closeIframe()"></div>
        <div class="modal-custom2"  >            
          <div class="modal-header d-flex justify-content-between bg-light">    
            <!--   <img v-if="gateway != null"  class="mx-auto d-block" style="width: 60%; height: 45px; border-radius:7px;" :src="require('/src/assets/'+gateway+'.png')" />           -->              
              <a class="btn btn-danger btn-sm modal-close text-white" @click="closeIframe()">&times;</a>
          </div>
          <div class="modal-body " style="height: 100% !important;">
             <div v-show="gateway=='stripe'" style="padding: 20px;">
              <!-- <form id="payment-form" @submit.prevent="handleSubmit">
                <div id="link-authentication-element" />
                <div id="card-element"></div>               
                  
             
                  <sr-messages :messages="messages" />
                </form> -->
             </div>
              <embed style="width:100%;height: 100%;" :src="redirectlink" />
          </div>  
        </div>
      </div>   
  </div>
</template>
   <script>
import Dropdown from "primevue/dropdown";
// import PromotionAudience from "./PromotionAudience.vue";
//import {showModal} from "@/plugins/modal"
import MultiSelect from "primevue/multiselect";
import Slider from "primevue/slider";
import {get,post} from "@/api/client"
import 'primeicons/primeicons.css';
import Calendar from 'primevue/calendar';
import { loadStripe } from "@stripe/stripe-js";
import SrMessages from "./SrMessages.vue";
export default {
  // components: { Dropdown,  },
  components: { Dropdown, MultiSelect, Slider, Calendar,SrMessages },
  data() {
    return {
      showModal2:false,
      showGatway:true,
      gateways:[
        'paystack',
        'stripe'
      ],
      gateway:null,
      carts:[],
      cart_id:'',
      showModal:false,
      accept:false,
      promotionEstimate:{},
      tooltipElement:null,
      stuForm: false,
      selectedReview: null,
      AppliactionReview: ["Approved", "Rejected", "Got Admissions"],      
      selectedCities: null,
      selectedregion: null,
      audience:{
        country_ids:[],
        program_id:null,
        region_ids:[],
        start_date:null,
        end_date:null,
        daily_budget:0
      },
      regions: [],
      cities: [],
      
      documents: [
        {
          id: 1,
          text: "High School Grade MarkSheet",
          size: "4.00mb",
          date: "25/05/2022",
        },
        {
          id: 2,
          text: "High School Certificates",
          size: "4.00mb",
          date: "25/05/2022",
        },
        {
          id: 3,
          text: "Formal Photo",
          size: "4.00mb",
          date: "25/05/2022",
        },
        {
          id: 4,
          text: "Passport font",
          size: "4.00mb",
          date: "25/05/2022",
        },
        {
          id: 5,
          text: "National ID Photo",
          size: "4.00mb",
          date: "25/05/2022",
        },
      ],
      programs:[],
      userInfo: JSON.parse(localStorage.getItem('userInfo') || '{}'),
      messages:[],
      isLoading:false,
      stripe:null,
      elements:null

    };
  },
  computed: {
    calculateTotalBudgetSum() {
      return this.carts.reduce((accumulator, cart) => accumulator + cart.total_budget, 0)/ this.promotionEstimate?.number_of_reach * this.promotionEstimate?.number_of_reach_cost;
    },
    
    numberOfDays() {
      if (this.audience.start_date && this.audience.end_date) {
        // Parse the dates as JavaScript Date objects
        const startDate = new Date(this.audience.start_date);
        const endDate = new Date(this.audience.end_date);

        // Calculate the time difference in milliseconds
        const timeDifference = endDate - startDate;

        // Convert milliseconds to days (1 day = 24 hours * 60 minutes * 60 seconds * 1000 milliseconds)
        const daysDifference = Math.ceil(timeDifference / (24 * 60 * 60 * 1000));

        return daysDifference;
      } else {
        return 0; // Return null if either start_date or end_date is not set
      }
    },
    estimatedPriceCal() {
      let res = (this.audience.daily_budget / this.promotionEstimate?.number_of_reach) * this.promotionEstimate?.number_of_reach_cost;      
      return res
    },
  },
  methods: {
    removeItemFromCart(k){
      this.carts.splice(k,1)
      post('carts/save_draft',{                
         owner_id:this.userInfo.university_id,
         owner_type:'university',
         data: this.carts
        })
    },
    priceCal(budget) {
      return budget / this.promotionEstimate?.number_of_reach * this.promotionEstimate?.number_of_reach_cost;            
    },
    programeName(id){
      let res = this.programs.filter(item=> item.id === id);
      if(res?.length >0){
        return res[0].program_code
      }
      return ''
    },
   async addItem(){
      let data = JSON.parse(JSON.stringify({
        program_id:this.audience.program_id,
        university_id:this.userInfo.university_id,
        region_ids:this.audience.region_ids,          
        duration:this.numberOfDays,
        start_date:this.audience.start_date,
        end_date:this.audience.end_date,
        daily_budget:this.audience.daily_budget,          
        total_budget:this.audience.daily_budget*this.numberOfDays ,
      }))
      this.carts.push(data)
      let res = await post('carts/save_draft',{                
         owner_id:this.userInfo.university_id,
         owner_type:'university',
         data: this.carts
        })

      this.clientSecret = res.message.client_secret;
    },
    async closeIframe(){
      this.showModal2 = false
      let res = await post('transaction/check',{filters:{cart_id:this.cart_id}})              
            if(res?.message == 'successful'){
              this.carts = []              
              return false
            } 
    },
    async handleSubmit(){
      if (this.isLoading) {
        return;
      }

      this.isLoading = true;

      const { error } = await this.stripe.confirmPayment({
        elements:this.elements,
        confirmParams: {
          return_url: `${window.location.origin}/return`
        }
      });

      if (error.type === "card_error" || error.type === "validation_error") {
        this.messages.push(error.message);
      } else {
        this.messages.push("An unexpected error occured.");
      }

      this.isLoading = false;
    },
    async proceedToPaymentStripe(){   
      this.isLoading = true; 
      this.showGatway = false               
       // eslint-disable-next-line
      this.stripe = await loadStripe(process.env.VUE_APP_STRIPE_PK);
       // this.messages.push(`Client secret returned.`);
        const expressCheckoutOptions = {
          buttonType: {          
            paypal:'checkout'            
          }
        }
        this.elements = this.stripe.elements({clientSecret:this.clientSecret}); 
        const paymentElement = this.elements.create('expressCheckout',expressCheckoutOptions);
        paymentElement.mount("#card-element");
        const linkAuthenticationElement = this.elements.create("linkAuthentication");
        linkAuthenticationElement.mount("#link-authentication-element");
        this.isLoading = false;
        
     },
    async proceedToPayment(gateway){       
       // Access the Stripe object via this.$stripe
       let res = await post('carts/add',{                
         owner_id:this.userInfo.university_id,
         owner_type:'university',
         products: this.carts,
         product_type:'promotion'
        })
       if(!res?.message){
        return false
       }else{
        if(gateway=='stripe'){          
          this.proceedToPaymentStripe()
          return true;
        }
       }
       let cart_id = res?.message.id; 
       this.cart_id = cart_id;
       const stripe = this.$stripe;
       this.gateway = gateway;
       this.showModal = false
        post('transaction/initiate', { 
          gateway:gateway,
          user_id:this.userInfo.university_id,
          user_type:'university',
          cart_id:cart_id,
         })
        .then(response => {
          
          if(gateway=='paystack'){
         //   const popup = window.open(response, 'PaymentGatewayPopup', 'width=600,height=400');
            // Check if the pop-up window is closed at regular intervals
            this.showModal2 = true;
            this.redirectlink = response     
            
          }   
          if(gateway == 'stripe'){

            const { client_secret } = response.data;          
            // Confirm the payment using Stripe Elements
            stripe.confirmCardPayment(client_secret)
            .then(result => {
              if (result.error) {
                console.error(result.error);
                // Handle payment failure
              } else if (result.paymentIntent.status === 'succeeded') {
                console.log('Payment successful');
                // Handle payment success, update UI, etc.
              }
            });
          }
        })
        .catch(error => {
          console.error(error);
          // Handle error from the backend
        });  
    },
    updateTooltipPosition(event) {      
      // Calculate the new handle position based on the mouse cursor
      // You may need to adjust the calculation based on your slider's specific implementation      
      const handle = document.querySelector('.p-slider-handle');      
      //const handleRect = handle.getBoundingClientRect();      
      if (!this.tooltipElement) {
        this.tooltipElement = true;
        this.tooltipElement = document.createElement('div');
        this.tooltipElement.className = 'tooltipCustom';
        handle.appendChild(this.tooltipElement);
      }
      this.tooltipElement.innerHTML = event;
    },
    makePayment() {
      this.$emit("makePayment", {amount: this.this.audience.daily_budget});
    },
    closeModal() {
      this.showModal = false;      
    },
  },
  async created(){
    this.$globals.loading =true
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    let res = await get('programs?paginate=false&university_id='+ userInfo.university_id);    
    if(res){
      this.programs = res
    }
  
    get('promotion_estimates').then(res=>{      
      if(res?.message){
        this.promotionEstimate = res.message
      }
    })

    get('api/regions', false).then(res=>{      
      if(res){
        this.regions = res
      }
    })
    
    post('carts/fetch_draft',{                
         owner_id:this.userInfo.university_id,
         owner_type:'university',      
    }).then((res)=>{   
      this.$globals.loading = false
      if(res?.message?.carts.data) {
        this.clientSecret = res.message.client_secrete;                
        this.carts = res.message.carts.data
      }
    })
    
  }
};
</script>
   
   <style scoped>
.container {
  margin-bottom: 60px;
}

.application-review div {
  margin-bottom: 10px;
}

.label-text {
  margin: 10px;
}
.profile-image {
  background-color: #fceca6;
  width: 40%;
  height: 60px;
  padding-top: 2px;
  margin-top: 10px;
  margin-bottom: 20px;
  padding-left: 10px;
  border-radius: 6px;
}
.profile-image > h6 {
  font-size: 90%;
}

.label-text {
  font-size: 15px;
}
.textarea {
  width: 95%;
  margin-left: 10px;
}
.btn-container {
  padding: 2px;
}

.card-title {
  font-size: 12px;
}
.tab-container {
  height: 107px;
  border-bottom: 1px solid rgb(235, 233, 233);
}
.view-btn {
  background-color: #eaecf0;
  display: flex;
  align-items: center;
  gap: 10px;
}

/* .view-btn:hover {
     color: rgb(245, 245, 245) !important;
     box-shadow: inset 150px 0 0 0 #fac515 !important;
  } */

.view-btn img {
  width: 20px;
}

.save-next-btn {
  border-radius: 4px;
  width: 95%;
  padding: 0.6rem;
  border: none;
  margin-left: 8px;

  background-color: gray;
}

.nav-link {
  color: grey;
}
.active {
  color: rgb(12, 11, 11) !important;
  font-weight: 600;
  background-color: transparent !important;
  border-radius: 0px !important;
  border-bottom: 2px solid rgb(134, 132, 132) !important;
}
@media (max-width: 1024px) {
  .profile-image {
    width: 60%;
  }
  .profile-image > h6 {
    font-size: 13px;
  }
  .profile-image > p {
    font-size: 1px;
  }
}
@media (max-width: 664px) {
  .profile-image {
    width: 70%;
  }
  .profile-image > h6 {
    font-size: 12px;
  }
}
.nav-link > button {
  color: red;
}
.nav-link.active {
  background-color: #f9fafb;
  color: black;
}
.img-size {
  border-radius: 2px;
  background-color: gray;
  height: 80px;
  width: 70px;
}
.uselect{
  user-select: none;
  pointer-events: none;
}
</style>
  
  
<style>
  .tooltipCustom {
  position: absolute;            
  left: 0px;
  top: 19px;
  padding: 1px 15px;
  background: #FF9800;
  color: white;
  border-radius: 5px;
  display: none;
}

.p-slider-handle:hover .tooltipCustom {
  display: block;
}
tr td {
  font-size: 0.83em;
}
.modal-custom {
    position: fixed;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80% !important;
    height: 80% !important;
    background-color: white;
    border-radius: 5px;
    z-index: 5000;
}
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}

.modal-custom2 {
    position: fixed;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90%;
    height: 90%;
    background-color: white;
    overflow: hidden;
    border-radius: 5px;
    z-index: 5000;
}
</style>
