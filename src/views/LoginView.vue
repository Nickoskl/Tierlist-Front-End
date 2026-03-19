<script setup>
import { reactive,watchEffect } from 'vue';
import {useAuthStore} from '../stores/auth';
import {storeToRefs} from 'pinia';
import LoadingCard from '../components/LoadingCard.vue'
import { ref } from 'vue';

const {errors,status,loadingDone} = storeToRefs(useAuthStore());
const {authenticate} = useAuthStore();

const loadStart = ref(false);


const formData = reactive({
    email: '',
    password: ''
})

const handleAuth=async() =>{
    loadStart.value = true;
    await authenticate(formData);
    if(loadingDone.value){loadStart.value=false}
    console.log(loadingDone)

}




</script>


<template>




<div v-if="loadingDone||!loadStart"  class="login_card">
            <h3 class="login_title">Login</h3>
            <div class="login_img">
                <img src="../assets/icons/male-icon.svg" alt="">
            </div>
            <div v-if="!errors" class="login_info">
                <form @submit.prevent=" handleAuth()">
                    <input required="true" v-model="formData.email" placeholder="Email " type="text" />
                    <input required="true" v-model="formData.password" placeholder="Password" type="password" />
                    <button  class="pointer">Login</button>
                </form>

            </div>
            <LoadingCard :load="!loadStart||loadingDone" :errors="errors"/>
        </div>





</template>

<style scoped>

</style>
