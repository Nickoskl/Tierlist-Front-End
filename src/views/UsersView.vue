<script setup>
import {storeToRefs} from 'pinia';
import { useUserStore } from '@/stores/user';
import { onMounted } from 'vue';
import UserCard from '../components/UserCard.vue'

const {getUsers} = useUserStore();
const {user,errors,status,loadingDone} = storeToRefs(useUserStore());



onMounted(async()=>{

    await getUsers();


})




</script>

<template>

    
        <div v-if="!loadingDone">
            <h3>LOADING</h3>
        </div>

        <div v-if="errors">
            <h3>{{errors.data}}</h3>
        </div>


        <div class="admin_userlist">
            <UserCard v-for="card in user" :userIt="card" />
        </div>




</template>

<style scoped>

</style>