import { defineStore } from 'pinia'


export const useChatsStore = defineStore({
    id: 'chat',
    state: () => ({        
        chats:[],
        drafts:[]
    }),
    getters : {
        getChats: (state) => {
            return state.chats
        },
        getDrafts: (state) => {
            return state.drafts
        },
        getSents: (state) => {
            return state.sents
        },
        getTrashed: (state) => {
            return state.trashed
        }        
    },
    persist: true,
    actions: {        
        setChats(chats) {
            this.chats = chats;
        },
        setDrafts(drafts) {
            this.Drafts = drafts;
        },
        setSents(sents) {
            this.chats = sents;
        },
        setTrashed(trashed) {
            this.Drafts = trashed;
        },
                  
    }
})
