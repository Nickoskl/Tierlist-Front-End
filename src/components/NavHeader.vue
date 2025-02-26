<script setup>
import { RouterLink } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import {storeToRefs} from 'pinia';

const {userLoggedIn,userID,userImg} = storeToRefs(useAuthStore())

</script>

<template>

<header>
        <RouterLink :to="{name:'home'}" class="pointer header_btn">
            <img src="../assets/icons/home-svgrepo-com.svg" alt="" class="header_icon">
            <h5 class="header_btn_text">Home</h5>
        </RouterLink>
        <RouterLink  v-if="!userLoggedIn" :to="{name:'register'}" class="pointer header_btn">
            <img src="../assets/icons/plus-icon.svg" alt="" class="header_icon">
            <h5 class="header_btn_text">Register</h5>
        </RouterLink>
        <RouterLink :to="{ name: 'user', params: { id: userID } }" v-if="userLoggedIn" class="pointer header_btn">
            <img :src="userImg=='default'?'/src/assets/icons/male-icon.svg':''" alt="" class="header_icon">
            <h5 class="header_btn_text">Me</h5>
        </RouterLink>
        <div v-if="userLoggedIn" class="pointer header_btn">
            <img src="../assets/icons/pencil-icon.svg" alt="" class="header_icon">
            <h5 class="header_btn_text">My lists</h5>
        </div>
        <RouterLink :to="{name: userLoggedIn?'logout':'login'}" class="pointer header_btn">
            <img src="../assets/icons/door-check-out-icon.svg" alt="" class="header_icon">
            <h5 v-if="userLoggedIn" class="header_btn_text">Sign Out</h5>
            <h5 v-else class="header_btn_text">Sign In</h5>
        </RouterLink>
    </header>

</template>

<style scoped>

</style>