<script setup>
import { RouterLink, stringifyQuery } from 'vue-router';

defineProps({
    user:{
        type: String
    }
})

</script>

<template>

<header>
        <RouterLink :to="{name:'home'}" class="pointer header_btn">
            <img src="../assets/icons/home-svgrepo-com.svg" alt="" class="header_icon">
            <h5 class="header_btn_text">Home</h5>
        </RouterLink>
        <div v-if="user" class="pointer header_btn">
            <img src="../assets/icons/male-icon.svg" alt="" class="header_icon">
            <h5 class="header_btn_text">User</h5>
        </div>
        <div v-if="user" class="pointer header_btn">
            <img src="../assets/icons/pencil-icon.svg" alt="" class="header_icon">
            <h5 class="header_btn_text">My lists</h5>
        </div>
        <RouterLink :to="{name: user?'logout':'login'}" class="pointer header_btn">
            <img src="../assets/icons/door-check-out-icon.svg" alt="" class="header_icon">
            <h5 v-if="user" class="header_btn_text">Sign Out</h5>
            <h5 v-else class="header_btn_text">Sign In</h5>
        </RouterLink>
    </header>

</template>

<style scoped>

</style>