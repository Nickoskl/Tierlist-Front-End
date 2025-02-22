<script setup>
import { onMounted } from 'vue';
import SessionLine from '../components/SessionLine.vue'


const props = defineProps({

    user: {
        type:Object,
        required:true,
    },
    edit:{
        type: Boolean,
        required:true
    }


})

onMounted(()=>{
    
})


const test = () =>{
    
}

</script>

<template>


        <div class="profile_card">
            <h5 class="profile_title">{{user.Name}}'s Profile</h5>
            <img class="profile_img" src="../assets/icons/male-icon.svg" alt="">
            <div class="profile_info">
                <input :placeholder="user.Super?user.Name+' - Super':user.Name" type="text">
                <input :placeholder="user.Email" type="text">
                <input placeholder="***********" type="text">
                <div v-if="edit" class="pointer profile_btn">
                    <img src="../assets/icons/pencil-icon.svg" alt="">
                    <h5>Edit</h5>
                </div>
                <div v-if="edit" class="pointer profile_btn">
                    <img src="../assets/icons/close-square-icon.svg" alt="">
                    <h5>Delete</h5>
                </div>
            </div>
            <div class="profile_sessions">
                <h5>User Session</h5>
                <SessionLine v-for="line in props.user.session" :session="line" :id="props.user.ID" :key="line"/>
            </div>
        </div>

</template>

<style scoped>


</style>