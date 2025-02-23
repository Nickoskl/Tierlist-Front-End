<script setup>
import { RouterLink } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const authenticated = useAuthStore()

defineProps({
    user: {
    type: Object,
    required: true
  }
})


</script>

<template>

            <div class="user_card">
                <img class="user_img" src="../assets/imgs/c2c9362d-eb52-47ce-a0df-ae58b0e40ae3.png" alt="">
                <div class="user_info">
                    <h5 style="display: inline-block;"> {{ user.Name }}</h5><h5 v-if="authenticated.userID === user.ID" style="display:inline-block;opacity:0.5;margin:0;padding-left: 20px;">- YOU</h5>
                    <h5>{{user.Email}}</h5>
                </div>
                <RouterLink :to="{ name: 'user', params: { id: user.ID } }" class="pointer user_btn">
                    <img src="../assets/icons/eye-svgrepo-com.svg" alt="">
                    <h5>View</h5>
                </RouterLink>
                <RouterLink :to="{ name: 'user', params: { id: user.ID},query:{edit: true }}" class="pointer user_btn">
                    <img src="../assets/icons/pencil-icon.svg" alt="">
                    <h5>Edit</h5>
                </RouterLink>
                <div class="pointer user_btn">
                    <img src="../assets/icons/close-square-icon.svg" alt="">
                    <h5>Delete</h5>
                </div>
            </div>

</template>

<style scoped>


</style>