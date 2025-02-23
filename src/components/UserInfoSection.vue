<script setup>
import { ref,onMounted,watch } from 'vue';
import SessionLine from '../components/SessionLine.vue'

const editMode=ref(false);

const props = defineProps({

    user: {
        type:Object,
        required:true,
    },
    editPerm:{
        type: Boolean,
        required:true
    },
    editModeImp:{
        type: Boolean,
    }


})

watch(() => props.editModeImp, (val) => {
  editMode.value = val;
});



// onMounted({


// })

const toggleEdit = () => {
  editMode.value = !editMode.value;
};



</script>

<template>


        <div class="profile_card">
            <h5 class="profile_title">{{user.Name}}'s Profile</h5>
            <img class="profile_img" src="../assets/icons/male-icon.svg" alt="">
            <div class="profile_info">

                <h3 v-if="!editMode" >{{ user.Name }}</h3>
                <h3 v-if="!editMode" >{{ user.Email }}</h3>

                <input v-if="editMode" :placeholder="user.Super?user.Name+' - Super':user.Name" type="text">
                <input v-if="editMode" :placeholder="user.Email" type="text">
                <input v-if="editMode" placeholder="Old Password" type="text">
                <input v-if="editMode" placeholder="New Password" type="text">

                <div v-if="editPerm&&!editMode" @click="toggleEdit()" class="pointer profile_btn">
                    <img src="../assets/icons/pencil-icon.svg" alt="">
                    <h5>Edit</h5>
                </div>
                <div v-if="editPerm&&!editMode" class="pointer profile_btn">
                    <img src="../assets/icons/close-square-icon.svg" alt="">
                    <h5>Delete</h5>
                </div>
                <div v-if="editPerm&&editMode" class="pointer profile_btn">
                    <img src="../assets/icons/pencil-icon.svg" alt="">
                    <h5>Save</h5>
                </div>
                <div v-if="editPerm&&editMode" @click="toggleEdit()" class="pointer profile_btn">
                    <img src="../assets/icons/close-square-icon.svg" alt="">
                    <h5>Cancel</h5>
                </div>
            </div>
            <div v-if="editPerm" class="profile_sessions">
                <h3>User Sessions</h3>
                <SessionLine v-for="line in props.user.session" :session="line" :id="props.user.ID" :key="line"/>
            </div>
        </div>

</template>

<style scoped>


</style>