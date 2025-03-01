<script setup>
import { reactive,watchEffect } from 'vue';
import {useAuthStore} from '../stores/auth';
import {storeToRefs} from 'pinia';
import LoadingCard from '../components/LoadingCard.vue'
import { ref } from 'vue';

const {errors,status,loadingDone} = storeToRefs(useAuthStore());
const {authenticate} = useAuthStore();

const load = ref('');


const formData = reactive({
    email: '',
    password: ''
})

const handleAuth=async() =>{
    load.value = loadingDone.value;
    await authenticate(formData);
    if(loadingDone.value){load.value=loadingDone.value}

}




</script>


<template>




<div class="login_card">
            <h3 class="login_title">Login</h3>
            <div class="login_img">
                <img src="../assets/icons/male-icon.svg" alt="">
            </div>
            <div class="login_info">
                <form @submit.prevent=" handleAuth()">
                    <input required="true" v-model="formData.email" placeholder="Email " type="text" />
                    <input required="true" v-model="formData.password" placeholder="Password" type="password" />
                    <button  class="pointer">Login</button>
                </form>

            </div>
            <LoadingCard :load="load" :errors="errors"/>
        </div>





</template>

<style scoped>

</style>
