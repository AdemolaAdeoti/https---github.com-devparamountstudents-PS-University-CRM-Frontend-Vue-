import { defineStore } from 'pinia'


export const useUserStore = defineStore({
    id: 'user',
    state: () => ({
        user: {},
        chats:[],
        isLoading:false,
        countries:[],
        faculties:[],        
    }),
    getters : {
        getUser: (state) => {
            return state.user
        },
        getCountries(){
            return this.state.countries
        },
        getFaculties(){
            return this.state.faculties
        }
    },
    persist: true,
    actions: {
        setUser(userInfo) {
            this.user = userInfo
        },
        removeUser() {
            this.user = ""
        },
        setCountries(countries){
            this.countries = countries
        },    
        setFaculties(faculties){
            this.faculties = faculties
        }      
    }
})
