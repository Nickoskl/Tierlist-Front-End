import { defineStore } from "pinia";
import axios from "axios";

export const useImgStore = defineStore('imgStore',{
    state:()=>{
        return{

            imgID:0,
            errors:'',
            status:'',

        }
    },
    actions:{

        async deleteImg(){




        },
        async uploadImg(formdata){

            var resp='';

            try{

                axios.defaults.withCredentials = true;
                resp = await axios.post(`${import.meta.env.VITE_API_ENDPOINT}${import.meta.env.VITE_API_UPLOAD_IMAGE}`,formdata).catch((error)=>{
                    this.errors = error.response;
                    this.status = error.response.status;
                    console.log(error);
                })



            }catch(error){

                console.error('An error occurred:', error.response ? error.response.data : error.message);

            }finally{


                if(resp){

                    console.log(resp);
                    this.imgID = resp.data;
                    this.status=resp.status;

                }


            }

        }

    },
    getters:{
        createImgUrl: (state) => (imgID) => {
            return `${import.meta.env.VITE_API_ENDPOINT}${import.meta.env.VITE_API_GET_IMAGE}${imgID}`;
        }
    }
})