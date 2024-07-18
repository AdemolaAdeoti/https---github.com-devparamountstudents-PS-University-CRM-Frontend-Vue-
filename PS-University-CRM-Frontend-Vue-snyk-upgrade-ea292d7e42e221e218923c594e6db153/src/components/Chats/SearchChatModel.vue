<template lang="html">
  <div>
    <div class="div">
      <!-- Modal -->
      <div
        class="modal fade"
        id="exampleModal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered" >
          <div class="modal-content" style="border-radius: 10px !important;">
           <h6 class="my-2 py-2 mx-2 px-2">
             <button
                type="button"
                class="btn-close "
                data-bs-dismiss="modal"
                aria-label="Close"
              > </button><span>search message</span>
           </h6>
            <div class="modal-header ">
         
              
            </div>
            <div class="modal-body mx-auto text-center py-5">
              <div class="mx-auto py-2">
                <label for="firstName">Search Message</label>
                <div class="input-group">
              <div class="input-group-prepend">
                <span
                  type="button"
                  class="input-icon input-group-text bg-transparent border-0"
                  id="basic-addon1"
                >
                  <img
                    :src="require(`/src/assets/images/search_icon.png`)"
                    alt=""
                /></span>
              </div>
              <div class="col-8">
                <input
                type="text"
                name="search"
                class="form-control border-left-0 "
                placeholder="Search"
                aria-label="Search"
                aria-describedby="basic-addon1"
                v-model.trim="search"
              />
              </div>
            </div>
              </div>
              <div class=" px-0">
            <template v-if="filteredChats.length > 0">
              <div
                class="message-list-item row mx-0"
                v-for="(chat, index) in filteredChats"
                :key="index"
              >
                <div class="sender_dp col-1">
                  <!-- <img :src="message.sender.imgURL" alt="sender dp" width="56" /> -->
                  <span class="position-relative">
                   
  
                    <span
                      v-if="chat.isRead"
                      class="badge position-absolute translate-custom-middle p-1 bg-orange rounded-pill"
                    >
                      <span class="visually-hidden"></span>
                    </span>
                  </span>
                </div>
                <div class="">
                 
                            <p class="text-dark col-12  "
                              >{{ chat.sender.body}} </p
                            >
                            <button class="btn btn-warning"  style="font-size: 36% !important; padding-bottom: 2px;"  >{{ chat.sender.receivedDate }}</button>
                </div>
                <hr style="padding: 2px; margin: 2px;">
                
               
              </div>
            </template>
            <template v-else>
              <div class="not-found">
                <img
                  class="mb-3"
                  :src="require('@/assets/images/no-user-found.png')"
                />
                <h3>No results found</h3>
                <p>It seems we can't find any results based on your search.</p>
              </div>
            </template>
          </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
 import { Chats} from '@/data';
export default {
  // name: 'Modal',

  data() {
      return {
        search: '',
        chats: Chats,
      };
    },
    computed: {
      filteredChats() {
        if(this.$route.fullPath == '/inbox#unread'){
          return this.chats.filter(res => res.isRead == true)
        }
        if (this.search.trim().length > 0) {
          return this.chats.filter(
            (res) =>
              res.sender.body
                .toLowerCase()
                .includes(this.search.toLowerCase())
             
          );
        }
        return this.chats;
      },
      
    },
};
</script>
<style lang=""></style>
