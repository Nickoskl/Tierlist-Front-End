<script setup>
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';


</script>

<template>



        <div class="login_card">
            <h3 class="login_title">Register</h3>
            <div class="login_img">
                <img src="../assets/icons/male-icon.svg" alt="">
                <h5 class="pointer">Add Photo</h5>
            </div>
            <div class="login_info">
                <input required="true" placeholder="Username" type="text">
                <input required="true" placeholder="Email " type="text">
                <input required="true" placeholder="Password" type="text">
                <input required="true" placeholder="Repeat Password" type="text">
                <button class="pointer">Register</button>
            </div>
        </div>



</template>

<style scoped>


</style>