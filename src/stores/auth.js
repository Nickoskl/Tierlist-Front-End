import { defineStore } from "pinia";
import axios from "axios";
import cookie from 'vue-cookies';

export const useAuthStore = defineStore('authStore',{
    state:()=>{
        return{
            userName:'',
            userID:'',
            userEmail:'',
            userSuper: false,
            errors:{},
            status: '',
        }
    },
    actions:{
        async authenticate(apiRoute,credentials){
            var resp='';
            try{
                axios.defaults.withCredentials = true;
                resp = await axios.post(`http://localhost:5000${apiRoute}`,credentials).catch((error)=>{
                    this.errors = error.response;
                    this.status = error.response.status;
                    // console.log(resp.status);
                })
            }catch(error){
                
                console.error('An error occurred:', error.response ? error.response.data : error.message);
            }finally{
                if(resp){
                    this.status = resp.data.status;
                    this.userName = resp.data.username;
                    this.userID = resp.data._id;
                    this.userEmail = resp.data.email;
                    this.userToken = resp.data.session.token[0];
                    this.userSuper = resp.data.super;
                    cookie.set('user_auth', resp.data.session.token[0])
                    setTimeout(()=>{this.router.push({name:'home'});},1000);
                }
            }
        }
    },
    getters:{},
})