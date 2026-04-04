import { defineStore } from "pinia";
import axios from "axios";

export const useTemplateStore = defineStore('TemplateStore',{
    state(){
        return{
            template:[],
            errors:'',
            status:'',
            loadingDone:false,
        }
    },
    actions:{

            async getTemplate(id){

            var resp='';

            try{

                axios.defaults.withCredentials=true;
                resp = await axios.get(`${import.meta.env.VITE_API_ENDPOINT}${import.meta.env.VITE_API_GET_TEMPLATE}${id}`).catch((error)=>{
                    this.errors=error.response;
                    this.status=error.response.status;
                })

            }catch(error){

                console.log('An error occured ', error.response ? error.response.data : error.message);

            }finally{

                if(resp){

                    this.template.name=resp.data.name;
                    this.template.id=resp.data._id;
                    this.template.background=resp.data.background;
                    this.template.description=resp.data.description;
                    this.template.levels=Array.from(resp.data.list_config.level_table)
                    this.template.imgs=Array.from(resp.data.list_config.img_table)
                    
                    this.status=resp.status;

                }
                this.loadingDone=true;

            }

        },
        async getTemplateAll(){

            var resp='';

            try{

                axios.defaults.withCredentials=true;
                resp =await axios.get(`${import.meta.env.VITE_API_ENDPOINT}${import.meta.env.VITE_API_GET_TEMPLATE}`).catch((error)=>{
                    this.errors=error.response;
                    this.status=error.status;
                })

            }catch(error){

                console.log('An error occured ', error.response ? error.response.data : error.message);

            }finally{


                if(resp){

                    this.template=Array.from(resp.data);


                    this.status=resp.status;
                }
                this.loadingDone=true;

            }
        }

    }

})