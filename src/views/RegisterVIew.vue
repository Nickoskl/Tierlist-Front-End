<script setup>
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';
import { reactive,watchEffect,ref } from 'vue';

const {errors,status} = storeToRefs(useAuthStore());
const {register} = useAuthStore();

const password_ver=ref('');
const passMatch=ref(false);

const formData = reactive({
    username:'',
    email: '',
    password: '',
    img:''
})

function pass_ver(){

    console.log(formData.password)
    console.log(password_ver.value)
    console.log(passMatch.value)

    if(formData.password !== password_ver.value){

        passMatch.value=false;

    }else{
        passMatch.value=true;
    }


}


function postPreCheck(){


    if(passMatch.value){
        register(formData);
    }



}




</script>

<template>



        <div class="login_card">
            <h3 class="login_title">Register</h3>
            <div class="login_img">
                <img src="../assets/icons/male-icon.svg" alt="">
                <h5 class="pointer">Add Photo</h5>
            </div>
            <div class="login_info">
                <form @submit.prevent="postPreCheck()">
                    <input required="true" v-model="formData.username" placeholder="Username" type="text">
                    <input required="true" v-model="formData.email" placeholder="Email " type="text">
                    <input required="true" v-model="formData.password" placeholder="Password" type="text">
                    <input required="true" @keyup="pass_ver()" v-model="password_ver"  placeholder="Repeat Password" type="text">
                    <h6 v-if="!passMatch&&password_ver.length>0" style="margin:0;font-size: 15px;text-align: left;opacity: 0.5;font-weight: 400;">passwords do not match</h6>
                    <button class="pointer">Register</button>
                </form>
            </div>
            <div v-if="typeof status == 'number' && status!==200">
                <h5>Something Happened, {{ errors.data }}</h5>
            </div>
            <div v-if="status==200">
                Success 😎, Redirecting ...
            </div>
        </div>



</template>

<style scoped>


</style>