<script setup>
import { reactive,watchEffect } from 'vue';
import {useAuthStore} from '../stores/auth';
import {storeToRefs} from 'pinia';

const {errors,status} = storeToRefs(useAuthStore());
const {authenticate} = useAuthStore();


const formData = reactive({
    email: '',
    password: ''
})




</script>


<template>




<div class="login_card">
            <h3 class="login_title">Login</h3>
            <div class="login_img">
                <img src="../assets/icons/male-icon.svg" alt="">
            </div>
            <div class="login_info">
                <form @submit.prevent=" authenticate(formData)">
                    <input required="true" v-model="formData.email" placeholder="Email " type="text" />
                    <input required="true" v-model="formData.password" placeholder="Password" type="password" />
                    <button  class="pointer">Login</button>
                </form>

            </div>
            <div v-if="typeof status == 'number' && status!==200">
                <h5>Incorrect Credentials, {{ errors.data }}</h5>
            </div>
            <div v-if="status==200">
                Success 😎, Redirecting ...
            </div>
        </div>





</template>

<style scoped>

</style>
