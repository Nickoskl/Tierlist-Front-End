import { defineStore } from "pinia";
import axios from "axios";
import cookie from 'vue-cookies';

export const useAuthStore = defineStore('authStore',{
    state:()=>{
        return{
            userLoggedIn:false,
            userName:'',
            userID:'',
            userEmail:'',
            userToken:'',
            userSuper: false,
            errors:'',
            status: '',
        }
    },
    actions:{
        async authenticate(credentials){
            var resp='';
            try{
                axios.defaults.withCredentials = true;
                resp = await axios.post(`${import.meta.env.VITE_API_ENDPOINT}${import.meta.env.VITE_API_LOGIN}`,credentials).catch((error)=>{
                    this.errors = error.response;
                    this.status = error.response.status;
                    // console.log(resp.status);
                })
            }catch(error){
                
                console.error('An error occurred:', error.response ? error.response.data : error.message);
            }finally{
                if(resp){
                    this.userLoggedIn=true
                    this.status = resp.status;
                    this.userName = resp.data.username;
                    this.userID = resp.data._id;
                    this.userEmail = resp.data.email;
                    this.userToken = resp.data.session.token[0];
                    this.userSuper = resp.data.super;
                    cookie.set('user_auth', resp.data.session.token[0])
                    if(this.router.currentRoute.name == 'login'){
                        setTimeout(()=>{
                            this.router.push({name:'home'});
                        },1000)
                    }
                }else{
                    setTimeout(()=>{
                        this.reset();
                    },3000)
                }
            }
        },
        async logout(){
            var resp='';
            try{
                axios.defaults.withCredentials = true;
                resp = await axios.post(`${import.meta.env.VITE_API_ENDPOINT}${import.meta.env.VITE_API_LOGOUT}`).catch((error)=>{
                    this.errors = error.response;
                    this.status = error.response.status;
                    // console.log(resp.status);
                })
            }catch(error){
                
                console.error('An error occurred:', error.response ? error.response.data : error.message);
            }finally{
                if(resp){
                    this.userLoggedIn=false
                    this.status = resp.status;
                    this.userName = '';
                    this.userID = '';
                    this.userEmail = '';
                    this.userToken = '';
                    this.userSuper = false;
                    cookie.remove('user_auth');
                    if(this.router.currentRoute.name == 'logout'){
                        setTimeout(()=>{
                            this.router.push({name:'home'});
                            this.status = '';
                            this.errors = '';
                        },1000)
                    }
                }else{
                    setTimeout(()=>{
                        this.reset();
                    },3000)
                }
            }
        },
        reset(){
            this.status = '';
            this.errors = '';
        }
    },
    getters:{},
})