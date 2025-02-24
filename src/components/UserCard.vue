<script setup>
import { RouterLink } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { useUserStore } from '@/stores/user';
import { ref } from 'vue';
import { storeToRefs } from 'pinia';

const authenticated = useAuthStore()
const {deleteUser} = useUserStore();
const {status:userCardStatus,errors,user} = storeToRefs(useUserStore());

const localStatus = ref('');

const handleDelete = async (usrID) => {
  await deleteUser(usrID);
  localStatus.value = userCardStatus;
};

defineProps({
    userIt: {
    type: Object,
    required: true
  }
})


</script>

<template>

            <div class="user_card">
                <img class="user_img" src="../assets/imgs/c2c9362d-eb52-47ce-a0df-ae58b0e40ae3.png" alt="">
                <div class="user_info">
                    <h5 style="display: inline-block;"> {{ userIt.Name }}</h5><h5 v-if="authenticated.userID === userIt.ID" style="display:inline-block;opacity:0.5;margin:0;padding-left: 20px;">- YOU</h5>
                    <h5>{{userIt.Email}}</h5>
                </div>
                <RouterLink :to="{ name: 'user', params: { id: userIt.ID } }" class="pointer user_btn">
                    <img src="../assets/icons/eye-svgrepo-com.svg" alt="">
                    <h5>View</h5>
                </RouterLink>
                <RouterLink :to="{ name: 'user', params: { id: userIt.ID},query:{edit: true }}" class="pointer user_btn">
                    <img src="../assets/icons/pencil-icon.svg" alt="">
                    <h5>Edit</h5>
                </RouterLink>
                <div @click="handleDelete(userIt.ID)" class="pointer user_btn">
                    <img src="../assets/icons/close-square-icon.svg" alt="">
                    <h5>Delete</h5>
                </div>
                <div v-if="typeof localStatus.value == 'number' && localStatus.value!==200">
                    <h5>Something Happened, {{ errors.data }}</h5>
                </div>
                <div v-if="localStatus.value==200">
                    Success 😎
                </div>
            </div>

</template>

<style scoped>


</style>