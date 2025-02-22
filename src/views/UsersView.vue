<script setup>
import {storeToRefs} from 'pinia';
import { useUserStore } from '@/stores/user';
import { onMounted } from 'vue';
import UserCard from '../components/UserCard.vue'

const {getUsers} = useUserStore();
const {user,errors,status} = storeToRefs(useUserStore());



onMounted(async()=>{

    await getUsers();

})




</script>

<template>



        <div class="admin_userlist">
            <UserCard v-for="card in user" :user="card" />
        </div>




</template>

<style scoped>

</style>