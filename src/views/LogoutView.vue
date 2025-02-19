<script setup>
import { onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';

const {logout} = useAuthStore();
const {status,errors} =storeToRefs(useAuthStore());

onMounted(async()=>{

    await logout();

})

</script>

<template>


<div class="login_card">
            <div class="login_img">
                <img src="../assets/icons/male-icon.svg" alt="">
            </div>
            <h3 class="login_title">Logging you out...</h3>
            <h3 v-if="status==200">Success 😉 Redirecting..</h3>
            <h3 v-if="status!==200">{{errors}}</h3>
        </div>


</template>

<style scoped>

</style>