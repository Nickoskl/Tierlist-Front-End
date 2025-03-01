import { defineStore } from "pinia";
import axios from "axios";

export const useImgStore = defineStore('imgStore',{
    state:()=>{
        return{

            

        }
    },
    actions:{

    },
    getters:{
        createImgUrl: (state) => (imgID) => {
            return `${import.meta.env.VITE_API_ENDPOINT}${import.meta.env.VITE_API_GET_IMAGE}${imgID}`;
        }
    }
})