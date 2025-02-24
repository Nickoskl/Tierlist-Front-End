<script setup>
import { ref,onMounted,watch,reactive } from 'vue';
import SessionLine from '../components/SessionLine.vue'
import {useUserStore} from '../stores/user';
import { storeToRefs } from 'pinia';

const {editUser} =useUserStore();
const {errors,status:userinfoStatus} = storeToRefs(useUserStore());


const localStatus = ref('');
const editMode=ref(false);

const formData = reactive({
    username:'',
    email: '',
    passOld: '',
    passNew:'',
    img:''
})

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



const handleEditUser = async () => {
  await editUser(props.user.ID, formData);
  localStatus.value = userinfoStatus;
  if(localStatus.value==200){
        toggleEdit();
    } // Update local status after edit
};

const toggleEdit = () => {
  editMode.value = !editMode.value;
  localStatus.value = '';
};



</script>

<template>


        <div class="profile_card">
            <h5 class="profile_title">{{user.Name}}'s Profile</h5>
            <img class="profile_img" src="../assets/icons/male-icon.svg" alt="">
            <div class="profile_info">

                <h3 v-if="!editMode" >{{ user.Name }}</h3>
                <h3 v-if="!editMode" >{{ user.Email }}</h3>

                <form @submit.prevent="handleEditUser()">

                    <input v-if="editMode" v-model="formData.username" :placeholder="user.Super?user.Name+' - Super':user.Name" type="text">
                    <input v-if="editMode" v-model="formData.email" :placeholder="user.Email" type="text">
                    <input v-if="editMode" v-model="formData.passOld" placeholder="Old Password" type="text">
                    <input v-if="editMode" v-model="formData.passNew" placeholder="New Password" type="text">

                    <button v-if="editPerm&&!editMode" @click="toggleEdit()" class="pointer profile_btn">
                        <img src="../assets/icons/pencil-icon.svg" alt="">
                        <h5>Edit</h5>
                    </button>
                    <button v-if="editPerm&&!editMode" class="pointer profile_btn">
                        <img src="../assets/icons/close-square-icon.svg" alt="">
                        <h5>Delete</h5>
                    </button>
                    <button v-if="editPerm&&editMode" type="submit" class="pointer profile_btn">
                        <img src="../assets/icons/pencil-icon.svg" alt="">
                        <h5>Save</h5>
                    </button>
                    <button v-if="editPerm&&editMode" @click="toggleEdit()" class="pointer profile_btn">
                        <img src="../assets/icons/close-square-icon.svg" alt="">
                        <h5>Cancel</h5>
                    </button>
                    <div v-if="typeof localStatus.value == 'number' && localStatus.value!==200">
                        <h5>Something Happened, {{ errors.data }}</h5>
                    </div>
                    <div v-if="localStatus.value==200">
                        Success 😎
                    </div>
                </form>
            </div>
            <div v-if="editPerm" class="profile_sessions">
                <h3>User Sessions</h3>
                <SessionLine v-for="line in props.user.session" :session="line" :id="props.user.ID" :key="line"/>
            </div>
        </div>

</template>

<style scoped>


</style>