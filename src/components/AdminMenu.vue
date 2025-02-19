<script setup>
import { RouterLink } from 'vue-router';

</script>

<template>

<div class="admin_menu">
        <div class="admin_menu_title">
            <h3>ADMIN MENU</h3>
        </div>
        <div class="pointer admin_menu_item">
            <img src="../assets/icons/plus-icon.svg" alt="">
            <h5>New Template</h5>
        </div>
        <RouterLink :to="{name:'users'}" class="pointer admin_menu_item">
            <img src="../assets/icons/male-icon.svg" alt="">
            <h5>Users</h5>
        </RouterLink>
    </div>

</template>

<style scoped>


</style>