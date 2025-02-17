<script setup>
import { RouterLink } from 'vue-router';

</script>

<template>

<header>
        <RouterLink to="/" class="pointer header_btn">
            <img src="../assets/icons/home-svgrepo-com.svg" alt="" class="header_icon">
            <h5 class="header_btn_text">Home</h5>
        </RouterLink>
        <div class="pointer header_btn">
            <img src="../assets/icons/male-icon.svg" alt="" class="header_icon">
            <h5 class="header_btn_text">User</h5>
        </div>
        <div class="pointer header_btn">
            <img src="../assets/icons/pencil-icon.svg" alt="" class="header_icon">
            <h5 class="header_btn_text">My lists</h5>
        </div>
        <RouterLink to="/login" class="pointer header_btn">
            <img src="../assets/icons/door-check-out-icon.svg" alt="" class="header_icon">
            <h5 class="header_btn_text">Sign In</h5>
        </RouterLink>
    </header>

</template>

<style scoped>

</style>