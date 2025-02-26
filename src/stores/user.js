import { defineStore } from "pinia";
import axios from "axios";
import cookie from 'vue-cookies';


export const useUserStore = defineStore('userStore',{

    state:()=>{
        return{
            user:[],
            errors:'',
            status:'',
            loadingDone:false,

        }
    },
    actions:{
        async getUsers(){

            var resp='';

            try{
                axios.defaults.withCredentials = true;
                resp = await axios.get(`${import.meta.env.VITE_API_ENDPOINT}${import.meta.env.VITE_API_GET_USER_ALL}`).catch((error)=>{
                    this.errors = error.response;
                    this.status = error.response.status;
                    console.log(error);
                })

            }catch(error){

                console.error('An error occurred:', error.response ? error.response.data : error.message);

            }finally{

                //#######################################
                    
                    

                                    
                if(resp){

                    resp.data.forEach((element,index) => {

                        this.user[index]={
                            Name:element.username,
                            Email:element.email,
                            Img:element.avatar,
                            ID:element._id,
                            Super:element.super,
                        }

                        
                    });
                    console.log(resp.data);
                    this.loadingDone=true;
                    this.status = resp.status;
                }



                

            }

        },
        async getUser(id){

            var resp='';

            try{
                axios.defaults.withCredentials = true;
                resp = await axios.get(`${import.meta.env.VITE_API_ENDPOINT}${import.meta.env.VITE_API_GET_USER}${id}`).catch((error)=>{
                    this.errors = error.response;
                    this.status = error.response.status;
                    console.log(error);
                })

            }catch(error){

                console.error('An error occurred:', error.response ? error.response.data : error.message);

            }finally{

                if(resp){

                    var session=[];
                    
                    const date = resp.data.session.date.map((element,index)=>{
                        var dateIter=[];
                        dateIter=element
                        return dateIter
                    })

                    const token = resp.data.session.token.map((element,index)=>{
                        var tokenIter=[];
                        tokenIter=element
                        return tokenIter
                    })

                    const ip = resp.data.session.ip.map((element,index)=>{
                        var ipIter=[];
                        ipIter=element
                        return ipIter
                    })


                    ip.forEach((element,index) => {
                        session[index]={
                            ip: ip[index],
                            date: date[index],
                            token:token[index]
                        }
                    });



                    // console.log(date)
                        this.user[0]={
                            Name:resp.data.username,
                            Email:resp.data.email,
                            Img:resp.data.avatar,
                            ID:resp.data._id,
                            Super:resp.data.super,
                            session,
                            
                        }
                        this.status = resp.status;
                        this.loadingDone=true;
                    // console.log(this.user[0])
                    
                }


            }

        },
        async logoutUser(id,token){

            var resp='';

            try{

                const credentials = {
                    sessionout:token
                }

                axios.defaults.withCredentials = true;
                resp = await axios.patch(`${import.meta.env.VITE_API_ENDPOINT}${import.meta.env.VITE_API_EDIT_USER}${id}`, credentials).catch((error)=>{
                    this.errors = error.response;
                    this.status = error.response.status;
                    console.log(error);
                })



            }catch(error){

                console.error('An error occurred:', error.response ? error.response.data : error.message);

            }finally{

                if(resp){

                    this.status = resp.status;
                    this.user[0]={
                        //TODO
                    }
                    console.log(this.status);



                }

            }


        },
        async editUser(id,formData){

            var resp='';

            try{

                const credentials = {
                    email:formData.email,
                    password_new: formData.passNew,
                    password_old: formData.passOld,
                    username: formData.username,
                    img: formData.img,
                }

                axios.defaults.withCredentials = true;
                resp = await axios.patch(`${import.meta.env.VITE_API_ENDPOINT}${import.meta.env.VITE_API_EDIT_USER}${id}`, credentials).catch((error)=>{
                    this.errors = error.response;
                    this.status = error.response.status;
                    console.log(error);
                })



            }catch(error){

                console.error('An error occurred:', error.response ? error.response.data : error.message);

            }finally{

                if(resp){

                    this.status = resp.status;
                    this.user[0]={
                        //TODO
                    }
                    console.log(this.status);



                }

            }


        },
        async deleteUser(id){

            var resp='';

            try{


                axios.defaults.withCredentials = true;
                resp = await axios.delete(`${import.meta.env.VITE_API_ENDPOINT}${import.meta.env.VITE_API_DELETE_USER}${id}`).catch((error)=>{
                    this.errors = error.response;
                    this.status = error.response.status;
                    console.log(error);
                })



            }catch(error){

                console.error('An error occurred:', error.response ? error.response.data : error.message);

            }finally{

                if(resp){

                    this.status = resp.status;
                    this.user[0]={
                        //TODO
                    }
                    console.log(this.status);

                }
            }
        }
    }
})