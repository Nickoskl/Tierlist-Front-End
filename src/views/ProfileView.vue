<script setup>
import { onMounted } from 'vue';
import CardSection from '../components/CardSection.vue'
import UserInfoSection from '../components/UserInfoSection.vue'
import { useUserStore } from '@/stores/user';
import { useRoute } from 'vue-router';
import{storeToRefs} from 'pinia';
import cookie from 'vue-cookies';
import { useAuthStore } from '@/stores/auth';
import {ref} from 'vue'


const editable = ref(false);
const userData = ref([]);

const route = useRoute();

const {getUser} = useUserStore();
const {user,status,errors} = storeToRefs(useUserStore())

const authenticated = useAuthStore();
const {authenticate} = useAuthStore();

onMounted(async()=>{

     await getUser(route.params.id);
     userData.value = user.value[0];

    if(user.value[0].session.indexOf({token:cookie.get("user_auth")}) || authenticated.userSuper){
        editable.value = true;
    }

})

</script>

<template>

    <!-- <h1>{{ data[0]}}</h1> -->

<UserInfoSection :user="userData" :edit="editable" />

<CardSection title="User TierLists" :cardNum=6 />

</template>

<style scoped>


</style>