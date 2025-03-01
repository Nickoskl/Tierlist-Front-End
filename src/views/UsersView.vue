<script setup>
import {storeToRefs} from 'pinia';
import { useUserStore } from '@/stores/user';
import { onMounted } from 'vue';
import UserCard from '../components/UserCard.vue'
import LoadingCard from '../components/LoadingCard.vue'

const {getUsers} = useUserStore();
const {user,errors,status,loadingDone} = storeToRefs(useUserStore());



onMounted(async()=>{

    await getUsers();


})




</script>

<template>

    
        <LoadingCard :load="loadingDone" :errors="errors"/>

        <div v-if="loadingDone" class="admin_userlist">
            <UserCard v-for="card in user" :userIt="card" />
        </div>




</template>

<style scoped>

</style>