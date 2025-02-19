import { defineStore } from "pinia";
import axios from "axios";
import cookie from 'vue-cookies';


export const useUserStore = defineStore('userStore',{

    state:()=>{
        return{
            userName:[],
            userEmail:[],
            userImg:[],
            userID:[],
            userSuper:[]
        }
    },
    actions:{
        async getUsers(){

            

        }
    }

})