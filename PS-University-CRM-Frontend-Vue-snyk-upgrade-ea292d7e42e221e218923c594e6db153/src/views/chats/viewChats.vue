<template>
  <div class="position-relative">
    <div class="outsideEditor">
      <div id="toBar" style="position: absolute; z-index: 2" class="bg-light shadow-sm w-100 px-4 pt-2">
        <h6 class="text-dark w-100">{{ selectedChatInfo.full_name }}                
          <!-- <i class="icon-refresh rotating"></i> -->
          <!-- <span tabindex="0" id="reload-btn" :class="{ rotate: rotateReload }" @click="handleReloadClick">&#x21bb;</span> -->
          <span class="ms-2 text-secondary" v-if="isTyping">is typing</span>
        </h6>
      </div>
      <div ref="chatContainer" class="overflow" style="overflow-y: auto; height: 87vh;padding-bottom:160px;">
        <br />
        <TransitionGroup name="list" tag="div" class="chat-container ">
          <div v-for="(message, index) in all_message" :key="index">
            <div v-if="shouldRenderDivider(index)" class="line-middle position-relative my-3">
              <div class="display-inline-block px-3 d-flex py-2 badge rounded-pill bg-white" style="border: 1px solid #ccc">
                <span class="time">{{
                  formatDateAndPreviousDay(message.created_at, index).currentDay
                }}</span>
              </div>
            </div>     
            <div class="d-flex gutter-x">
              <div v-if="shouldRenderImage(index,shouldRenderDivider(index))" class="me-2">
                <img class="image" :src="message.user_type !== 'highSchoolEmployee'
                      ? selectedChatInfo.photo_url
                      : user.profile_photo_url
                    " />
              </div>
              <div v-else  class="me-2" style="width:36px;"></div>
              <div>
                <div>
                  <div style="margin-top: -5px;">
                    <b class="me-2 tName" >{{getName(message)}}</b>
                    <span class="time">{{ message.time_at }}</span>
                  </div>
                  <p style="font-size:14px;" v-html="message.message"></p>
                  <p v-if="message.attachement">
                    <img :src="message.attachement" alt="attachment" />
                  </p>
                </div>
              </div>
            </div>
          </div>
        </TransitionGroup>
        <!-- Add more messages here -->
      </div>
    </div>
    <div class="row w-100" style="position: absolute; bottom: 8px; transition: bottom 0.3s cubic-bezier(0.55, 0.53, 0.68, 1.26) 0s;">    
      <div id="text-container" class="col-md-8 offset-md-2" :class="{ 'message-input-container': showInput }">
        <div class="message-input-wrapper">
          <div class="input-area">       
            <div class="position-relative w-100" style="bottom:-;">         
              <Editor ref="editor" v-model="message" @keyup="sendIsTypingEvent" class="message-editor"
                :editorStyle="'max-height:'+editorHeight+'px;width:100%' " placeholder="Type a message" >
                <template v-slot:toolbar>
                    <div class="ql-toolbar">
                      <span class="ql-formats">
                        <button class="ql-bold"></button>
                        <button class="ql-italic"></button>
                        <button class="ql-underline"></button>
                        <button class="ql-strike"></button>
                      </span>
                      <span class="ql-formats">                   
                        <button class="ql-blockquote"></button>
                        <button class="ql-code-block"></button>
                        <button class="ql-list" value="ordered"></button>
                        <button class="ql-list" value="bullet"></button>
                        <button class="ql-script" value="sub"></button>
                        <button class="ql-script" value="super"></button>
                        <button class="ql-clean"></button>
                      </span>
                      <label class="file-label">
                        <input style="cursor:pointer" type="file" @change="onAdvancedUpload($event)" class="file-input" />
                        <span class="file-button"><svg xmlns="http://www.w3.org/2000/svg" width="100" style="width:20px" viewBox="0 0 100 100" id="attachment"><path fill="#555" d="M18.8 85.1c-7.8-7.8-7.8-20.5 0-28.3L63.1 13c5.5-5.5 14.3-5.5 19.8 0s5.5 14.3 0 19.8L38.6 76.7c-3.1 3.1-8.2 3.1-11.3 0-3.1-3.1-3.1-8.2 0-11.3l22.3-21.8c.8-.8 2.1-.8 2.8 0 .8.8.8 2.1 0 2.8L30.2 68.2c-1.5 1.5-1.5 4.1 0 5.6 1.6 1.6 4.1 1.6 5.7 0L80.2 30c3.9-3.9 3.9-10.2 0-14.1-3.9-3.9-10.2-3.9-14.1 0L21.7 59.7c-6.2 6.2-6.2 16.4 0 22.6 6.3 6.2 16.4 6.2 22.6 0l38.3-37.8c.8-.8 2.1-.8 2.8 0 .8.8.8 2.1 0 2.8L47.1 85.2c-7.8 7.7-20.4 7.8-28.3-.1z"></path><path fill="#fff" d="M664-510v1684h-1784V-510H664m8-8h-1800v1700H672V-518z"></path></svg></span> 
                      </label>
                    </div>
                  </template>
                </Editor>
              <div id="bottomPanel" style="position:absolute;bottom: 1px;right: 6px; padding: 5px;" class="px-3">            
                  <button v-if="!sending" @click="send" style="float:right" class="btn btn-success btn-sm py-0">
                    <img v-svg-inline style="width:26px;fill:white; pointer-events: none;" :src="require('@/assets/images/send-icon.svg')">
                  </button>          
                  <DotDot v-else />                   
              </div>
            </div>
          </div>        
        </div>
      </div>      
    </div>
  </div>
</template>

<script>
import { get, post,postFormData } from "@/api/client";
//import { showToast } from "@/plugins/modal";
//import { useChatsStore } from "@/stores/chats";
import Quill from 'quill';
import DotDot from '@/components/Global/DotDot.vue';
// Define the custom blot class
const CustomFileBlot = Quill.import('formats/link');

class CustomFile extends CustomFileBlot {
  static create(value) {
    const node = super.create(value);
    node.setAttribute('target', '_blank');
    node.setAttribute('rel', 'noopener noreferrer');
    
    const fileType = value.toLowerCase().split('.').pop();
    
    if (['jpg', 'jpeg', 'gif', 'png'].includes(fileType)) {
      const img = document.createElement('img');
      img.src = value;
      img.alt = 'Image';
      img.style.width = '110px';
      node.appendChild(img);
    } else {
      node.innerHTML = '&#128196;'; // HTML entity code for a file icon
      node.style.fontSize = '4em';
      node.style.background = 'repeating-linear-gradient(45deg, black, transparent 100px)';
      node.style.borderRadius = '5px';
    }

    return node;
  }
  static formats(node) {
    // Disable editing for the customFile format
    return { customFile: node.innerHTML };
  }
}
CustomFile.blotName = 'customFile';
CustomFile.tagName = 'A';

// Register the custom blot class
Quill.register(CustomFile, true);
import Editor from "primevue/editor";

export default {
  name: "ViewMail",
  components: { Editor,DotDot},
  data() {
    return {
      sending:false,
      editorHeight:200,
      selectedEmails: [],
      emails: [],
      all_message: {},
      selectedChatInfo: {},
      rotateReload: false,
      showToolbar:false,
      message: "",
      showInput: false,
      someFiles: [],
      attchments: [],
      user: JSON.parse(localStorage.getItem("userInfo")),
      isTyping: false,
      channel: null,
      Echo: null,
      uploadUrl:'',   
      customHeaders: {
        Authorization: 'Bearer '+ localStorage.getItem('user'),        
      }
    };
  },
  async created() {
    this.updateMessages();
    
  },
  beforeRouteLeave(to, from, next) {            
    window.Echo.leave(this.channelName())        
    next();
  },
  mounted() {       
    window.receiverChannel = window.Echo.private(this.channelName()); 
    //window.myChannel = window.Echo.private('chat.highSchoolEmployee-'+this.user.high_school_id); 
    window.receiverChannel   
    .listen(".new-message", this.handleMessage)
    .listenForWhisper("typing", this.handleIsTyping);
    //const $this = this;
    this.$nextTick(() => {

      setTimeout(()=>{      
        this.toggleToolbar(false)         
        const editorToolbar = document.querySelector('.p-editor-toolbar.ql-toolbar.ql-snow');      
        const editorContainer = document.querySelector('.p-editor-content.ql-container.ql-snow');      
        const bottomPanel = document.querySelector('#bottomPanel');              
        if ( editorToolbar) {          
          editorContainer.appendChild(bottomPanel);
        }
        const container = document.getElementById("text-container");
        const editorQl = document.querySelector(".ql-editor");
        const outsideEditor = document.querySelector('.outsideEditor');
        outsideEditor.addEventListener("click", () => {
          editorQl.style.maxHeight = '40px';
          this.toggleToolbar(false)
        });
        container.addEventListener("click", () => {
          editorQl.style.maxHeight = '150px';
          this.toggleToolbar(true)
        });
      },2000)

    });
  },
  methods: {  
    toggleToolbar(state) {
      this.showToolbar = state;
      const toolbar = document.querySelector(".p-editor-toolbar.ql-toolbar.ql-snow")
      toolbar.style.display = this.showToolbar ? 'block' : 'none';
    },
    async onAdvancedUpload(event){      
        const file = event.target.files[0];
        const formdata = new FormData();
        formdata.append('file', file);
        formdata.append('folder_name', 'chatsFiles');
        const imgUpload = await postFormData('file_upload', formdata);
        const editor = this.$refs.editor.quill;
        const range = editor.getSelection(true); 
        editor.format('customFile', imgUpload.responseBody);
        editor.setSelection(range.index + 1);
    }, 
    channelName(){
    /*   return `chat.${(this.selectedChatInfo.user_type!=='admin')?
        this.selectedChatInfo.user_type+'-'+this.selectedChatInfo.sender_id
        :this.selectedChatInfo.chat_code }` */
        return `chat.${this.selectedChatInfo.chat_code }`
    },    
    shouldRenderDivider(loopIndex) {
      if (loopIndex === 0) {
        return true; // Always render for the first loop
      } else {
        // Check if previous day is different from current day
        const prevDay = this.formatDateAndPreviousDay(
          this.all_message[loopIndex - 1].created_at,
          loopIndex - 1
        ).currentDay;
        const currentDay = this.formatDateAndPreviousDay(
          this.all_message[loopIndex].created_at,
          loopIndex
        ).currentDay;
        return prevDay !== currentDay;
      }
    },
    shouldRenderImage(loopIndex,newDivider){      
      if (loopIndex === 0) {
        return true; // Always render for the first loop
      } else {
        // Check if previous day is different from current day
        if(newDivider){
          return true
        }
        const prevUser =   this.all_message[loopIndex - 1].user_type
        const currentUser =   this.all_message[loopIndex].user_type
        
        return prevUser !== currentUser;
      }
    
    },
    formatDateAndPreviousDay(dateStr, loopIndex) {
      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];

      const date = new Date(dateStr);

      // Get the current day in the specified format: "Thursday, January 3rd"
      const currentDay = `${this.getDayOfWeek(date)}, ${months[date.getMonth()]
        } ${this.getDayWithSuffix(date.getDate())}`;

      // Calculate the previous day based on the loop index
      const previousDate = new Date(date);
      previousDate.setDate(date.getDate() - loopIndex);

      let previousDay = "";
      if (loopIndex > 0) {
        previousDay = `${this.getDayOfWeek(previousDate)}, ${months[previousDate.getMonth()]
          } ${this.getDayWithSuffix(previousDate.getDate())}`;
      }

      return { currentDay, previousDay };
    },

    getDayOfWeek(date) {
      const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      return days[date.getDay()];
    },

    getDayWithSuffix(day) {
      if (day >= 11 && day <= 13) {
        return `${day}th`;
      }
      switch (day % 10) {
        case 1:
          return `${day}st`;
        case 2:
          return `${day}nd`;
        case 3:
          return `${day}rd`;
        default:
          return `${day}th`;
      }
    },
    handleMessage(data) {                  
        if(data.sender_type !=='universityEmployee'){
          this.all_message.push(data);
        }
        setTimeout(() => {
          this.scrollToBottom();
        }, 50);   
      // Handle the received message data
    },   
    async send() {
      if(this.message ==''){
        return false;   
      } 
      this.sending = true
      const res = await post('chat/send',{             
               receiver_id: this.selectedChatInfo.sender_id,
               receiver_type: this.selectedChatInfo.user_type,             
               message:this.message,
               chat_code:this.selectedChatInfo?.chat_code
             })      
             
             if(res?.message){                          
              if(res?.message == 'chat closed'){
                this.$router.push('/chats')
              }
              this.all_message.push(res.messageData)
              //showToast(res.message)    
              this.message = ''        
             // window.receiverChannel.whisper("new-message",res.messageData);              
               // this.updateMessages()              
             }
             this.sending = false
    },
    scrollToBottom() {
      const chatContainer = this.$refs.chatContainer;
      if(chatContainer){
        chatContainer.scrollTop = chatContainer?.scrollHeight;
      }
    },
  
    async updateMessages() { 
      //  let chats = [];
   
        this.selectedChatInfo = JSON.parse(localStorage.getItem('chatInfo'))
      /*   chats = JSON.parse(localStorage.getItem('chats'))
        this.emails = chats.map((item)=>{
            return { 
              receiver_id: item.sender_id,
              receiver_email: item.sender_email,
              user_type: item.user_type,
            }         
          })    */             
        let res = await get(`chats?chat_code=${this.selectedChatInfo.chat_code}`,);
        this.all_message = res.message;
        setTimeout(() => {
          this.scrollToBottom();
        }, 50);
        return true;
      },
    messageClass(message) {
      if (message.user_type == "admin") {
        return "message receiver";
      } else {
        return "message sender";
      }
    },

    sendIsTypingEvent() {
      window.receiverChannel.whisper("typing",JSON.stringify({typing:true}));
    },
    handleIsTyping() {      
      this.isTyping = true;
      setTimeout(() => {
        this.isTyping = false;
      }, 4000);      
    },
    getName(message){
      return   message.user_type == "universityEmployee"
                    ?this.user?.first_name + ' '+this.user?.last_name 
                    : message.user_type == 'admin'?
                    'Paramount Support'
                    : this.selectedChatInfo.full_name
    }
  },
};
</script>
<style>
.chat-container {
  padding: 10px;
}

.message {
  padding: 8px;
  align-items: flex-end;
  margin-bottom: 10px;
}

.sender {
  background: white;
  border-top: 2px solid #cacfc7;
  border-bottom: 2px solid #cacfc7;
}

.receiver {
  justify-content: flex-start;
  position: relative;
}

.message.receiver::after {
  content: "You";
  /* Additional styles for the pseudo-element */
  position: absolute;
  bottom: 20px;
  right: 10px;
  font-size: 12px;
  color: #888;
}

.message.sender::after {
  content: v-bind("selectedChatInfo.user_type");
  /* Additional styles for the pseudo-element */
  position: absolute;
  bottom: 20px;
  left: 10px;
  font-size: 12px;
  color: #888;
}

.content {
  background-color: #dcf8c6;
  color: #000;
  padding: 10px;
  border-radius: 10px;
  max-width: 70%;
}

.time {
  font-size: 12px;
  color: #616061;  
}

.chat-drop-enter-active,
.chat-drop-leave-active {
  transition: all 0.5s;
}

.chat-drop-enter,
.chat-drop-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.chat-message {
  margin-bottom: 10px;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.4s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

#reload-btn {
  cursor: pointer;
  display: inline-block;
}

.rotate {
  animation: rotating 1s linear infinite;
  -webkit-animation: rotating 1s linear infinite;
}

@keyframes rotating {
  0% {
    transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
    -webkit-transform: rotate(360deg);
  }
}

/* Add your existing CSS styles here */

.input-area {
  display: flex;
  align-items: center;
}

.attachment-area {
  margin-right: 10px;
}

.attachment-button {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #ffffff;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.message-editor {
  flex: 1;
  border: 1px solid #ccc;
  border-radius: 5px;
  height: 150px;
}

.send-button {
  width: 80px;
  height: 40px;
  border: none;
  background-color: #4caf50;
  color: #fff;
  border-radius: 5px;
  margin-left: 10px;
  cursor: pointer;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform 0.3s ease;
}

.message-input-container {
  bottom: -10% !important;
}

.message-input-wrapper {  
  border-radius: 5px 5px;
}

.line-middle {
  display: flex;
  justify-content: center;
  z-index: 0;
}

.line-middle:after {
  content: "";
  width: 100%;
  height: 1px;
  background: #ccc;
  position: absolute;
  bottom: 50%;
  left: 0;
  z-index: -1;
}
.tName{
  font-size:15px;
  font-weight: 900;
}
.gutter-x{
  padding: 8px 20px;
}


.image {
    background-repeat: no-repeat;
    background-size: 100%;
    display: inline-block;
    border-radius: 4px;
    width: 36px; 
    height: 36px;
}
.col.mt-6.py-5.container-fluid {
    padding: 0px !important;
}
.p-editor-toolbar.ql-toolbar.ql-snow {
    background: white;
}
.file-label {
  display: inline;
  position: relative;
  overflow: hidden;    
  border-radius: 5px;
  padding:2px;
  border-radius: 4px;
  color: #FFF;  
  cursor: pointer;
  
}

.file-input {
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
}

.ql-editor{
  height:auto !important;
  max-height: 150px;
}
.ql-container{
  height:auto !important;
  max-height: 150px;
}
.message-editor {
  height:auto !important;
}
</style>
