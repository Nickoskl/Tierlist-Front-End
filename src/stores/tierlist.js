import { defineStore } from "pinia";
import axios from "axios";

export const useTierlistStore = defineStore('TierlistStore',{
    state(){
        return{

            tierlist:[],
            status:'',
            errors:'',
            loadingDone:false,
        }
    },
    actions:{

        reset() {                
            this.tierlist=[];
            this.status='';
            this.errors='';
            this.loadingDone=false;
            },

        async getTierlist(id){
            var resp = '';

            try{

                axios.defaults.withCredentials=true;

                resp = await axios.get(`${import.meta.env.VITE_API_ENDPOINT}${import.meta.env.VITE_API_GET_TIERLIST}${id}`).catch((error)=>{

                    this.errors=error.response;
                    this.status=error.response.status;
                    console.log(error)

                })

            }catch(error){

                console.log('An error occured ', error.response ? error.response.data : error.message);

            }finally{

                if(resp){

                    this.tierlist.name=resp.data.name;
                    this.tierlist.template=resp.data.template;
                    this.tierlist.id=resp.data._id;
                    this.tierlist.placement=Array.from(resp.data.list_config.placement);
                    this.status=resp.status;

                }
                this.loadingDone=true;
                console.log(this.tierlist.placement)
                console.log(resp.data)
            }

        },
        async getTierListAll(){
            var resp='';

            try{
                
                axios.defaults.withCredentials=true;
                resp=await axios.get(`${import.meta.env.VITE_API_ENDPOINT}${import.meta.env.VITE_API_GET_TIERLIST}`).catch((error)=>{
                    this.errors=error.response;
                    this.status=error.status;
                })


            }catch(error){

                console.log('An error occured ', error.response ? error.response.data : error.message);

            }finally{

                if(resp){
                    this.tierlist=Array.from(resp.data);

                    this.status=resp.status;
                }
                this.loadingDone=true;


            }





        },
        async getUserTierListAll(id){
            var resp='';

            try{
                
                axios.defaults.withCredentials=true;
                resp=await axios.get(`${import.meta.env.VITE_API_ENDPOINT}${import.meta.env.VITE_API_GET_USER_TIERLISTS}${id}`).catch((error)=>{
                    this.errors=error.response;
                    this.status=error.status;
                })


            }catch(error){

                console.log('An error occured ', error.response ? error.response.data : error.message);

            }finally{

                if(resp){
                    this.tierlist=Array.from(resp.data);

                    this.status=resp.status;
                }
                this.loadingDone=true;


            }





        }

    }
})