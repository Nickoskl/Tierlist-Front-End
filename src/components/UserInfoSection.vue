<script setup>
import { ref, onMounted, watch, reactive } from 'vue';
import SessionLine from '../components/SessionLine.vue';
import { useUserStore } from '../stores/user';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/auth';
import { useImgStore } from '@/stores/img';
import { useRouter } from 'vue-router';

const { editUser,deleteUser,changeUserImg } = useUserStore();
const { errors:userErrors, status: userStatus } = storeToRefs(useUserStore());

const { userSuper,userID } = storeToRefs(useAuthStore());

const imgStore = useImgStore();
const { createImgUrl,uploadImg } = imgStore; 
const {status:imgStatus,imgID,errors:imgErrors} = storeToRefs(useImgStore())

const router = useRouter();


const imgLoaded = ref(false);
const imgUpoaded = ref(false);
const localStatus = ref('');
const editMode = ref(false);
const usrDeleteStatus = ref('');
const usrDeleteErrors = ref('');
const usrImgChangeStatus = ref('');




const formData = reactive({
  username: '',
  email: '',
  passOld: '',
  passNew: '',
  img: '',
});

const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
  editPerm: {
    type: Boolean,
    required: true,
  },
  editModeImp: {
    type: Boolean,
  },
});

watch(() => props.editModeImp, (val) => {
  editMode.value = val;
});


const handleEditUser = async () => {
  await editUser(props.user.ID, formData);
  localStatus.value = userStatus.value;
  if (localStatus.value == 200) {
    toggleEdit();
  } // Update local status after edit
};

const toggleEdit = () => {
  editMode.value = !editMode.value;
  localStatus.value = '';
  
};


const handleImageSubmit=async()=>{
    imgID.value=0;
    imgStatus.value='';
    formData.img=0
    const file = event.target.files[0];
    imgLoaded.value = false;
    imgUpoaded.value = false;


    if (file) {
    const imgFormData = new FormData();
    imgFormData.append('file', file);
    await uploadImg(imgFormData);
        if(imgStatus.value===200){
            formData.img = imgID.value; // Correctly set the imgID value to formData.img
            console.log("HERE DONE");
            imgUpoaded.value = true;
            await changeUserImg(props.user.ID,imgID.value);
            usrImgChangeStatus.value = userStatus.value
        }

    }

}


const handleDelete = async () => {

    if(userID.value==props.user.ID){
        if (confirm('Are you sure you want to delete your own accout?')) {

            await deleteUser(props.user.ID);
            usrDeleteStatus.value = userStatus.value;

            if(usrDeleteStatus.value==200){
                setTimeout(() => {
                router.push({ name: 'home' }); // Redirect to home
                }, 1000);
            }

        }
    }else{

        await deleteUser(props.user.ID);
        usrDeleteStatus.value = userStatus.value;

    }

  
  
};

</script>

<template>
  <div class="profile_card">
    <h5 class="profile_title">{{ user.Name }}'s Profile</h5>
    <div class="login_img">
        <div v-if="!imgLoaded" class="profile_img"><i class="pi pi-spin pi-spinner"></i></div>
        <img v-if="imgUpoaded && imgStatus==200" :class="imgLoaded?'':'noDisplay'" @load="imgLoaded=true"  :src="createImgUrl(formData.img)" alt="">
        <img @load="imgLoaded=true" :class="imgLoaded&&!imgUpoaded?'':'noDisplay'" :src="props.user.Img==='default'?'/src/assets/icons/male-icon.svg':createImgUrl(props.user.Img)" alt="">
        <form v-if="editMode" style="text-align:center;margin:0 auto;" method="post" enctype="multipart/form-data">
            <label for="file-input" class="pointer">Change Photo <i v-if="imgLoaded&&usrImgChangeStatus==200 && imgStatus==200" style="font-size: 15px;width:10px;margin:0;padding: 0;" class="pi pi-check"></i></label>
            <input type="file" @change="handleImageSubmit" class="noDisplay file-input" id="file-input" accept=".png,.jpg" name="file">
        </form>
    </div>
    <div class="profile_info">
      <h3 v-if="!editMode">{{ user.Name }}</h3>
      <h3 v-if="!editMode">{{ user.Email }}</h3>
      <h3 v-if="!editMode && userSuper">Superuser: {{ user.Super }}</h3>

      <div>
        <input v-if="editMode" v-model="formData.username" :placeholder="user.Super ? user.Name + ' - Super' : user.Name" type="text">
        <input v-if="editMode" v-model="formData.email" :placeholder="user.Email" type="text">
        <input v-if="editMode && !userSuper" v-model="formData.passOld" placeholder="Old Password" type="text">
        <input v-if="editMode" v-model="formData.passNew" placeholder="New Password" type="text">

        <button v-if="editPerm && !editMode" @click="toggleEdit()" class="pointer profile_btn">
          <img src="../assets/icons/pencil-icon.svg" alt="">
          <h5>Edit</h5>
        </button>
        <button @click="handleDelete()" v-if="editPerm && !editMode" class="pointer profile_btn">
          <img src="../assets/icons/close-square-icon.svg" alt="">
          <h5>Delete</h5>
        </button>
        <button @click="handleEditUser()" v-if="editPerm && editMode" type="submit" class="pointer profile_btn">
          <img src="../assets/icons/pencil-icon.svg" alt="">
          <h5>Save</h5>
        </button>
        <button v-if="editPerm && editMode" @click="toggleEdit()" class="pointer profile_btn">
          <img src="../assets/icons/close-square-icon.svg" alt="">
          <h5>Cancel</h5>
        </button>
        <div v-if="typeof localStatus.value == 'number' && localStatus.value !== 200">
          <h5>Something Happened, {{ errors.data }}</h5>
        </div>
        <div v-if="usrDeleteStatus.value == 200||localStatus.value == 200">
          Success 😎
        </div>
    </div>
    </div>
    <div v-if="editPerm" class="profile_sessions">
      <h3>User Sessions</h3>
      <SessionLine v-for="line in props.user.session" :session="line" :id="props.user.ID" :key="line" />
    </div>
  </div>
</template>

<style scoped>

.noDisplay{
    display: none;
}

.profile_card i{

    font-size: 30px;
    text-align: center;
    width:150px;
    padding:40% 0;
    display: inline-block;

}

.login_img{
    padding:0;
}
/* Your styles here */
</style>