<script setup>
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';
import { reactive,watchEffect,ref } from 'vue';
import {useImgStore} from '@/stores/img'

const {errors,status} = storeToRefs(useAuthStore());
const {register} = useAuthStore();

const {uploadImg,createImgUrl} = useImgStore();
const {status:imgStatus,imgID,errors:imgErrors} = storeToRefs(useImgStore())

const password_ver=ref('');
const passMatch=ref(false);

// const imgLoaded=ref(false);
// const imgLoading=ref(false);


const formData = reactive({
    username:'',
    email: '',
    password: '',
    img:''
})

function pass_ver(){

    console.log(formData.password)
    console.log(password_ver.value)
    console.log(passMatch.value)

    if(formData.password !== password_ver.value){

        passMatch.value=false;

    }else{
        passMatch.value=true;
    }


}


function postPreCheck(){


    if(passMatch.value){
        register(formData);
    }



}


// const handleImageSubmit=async()=>{

//     const file = event.target.files[0];
//     imgLoaded.value = false;
//     imgLoading.value = true;

//     if (file) {
//     const imgFormData = new FormData();
//     imgFormData.append('file', file);
//     await uploadImg(imgFormData);
//         if(imgStatus.value===200){
//             formData.img = imgID.value; // Correctly set the imgID value to formData.img
//             console.log("HERE DONE");
//         }

//     }

//     console.log(formData.img);
//     console.log(imgLoaded.value);
//     console.log(formData.img);


// }




</script>

<template>



        <div class="login_card">
            <h3 class="login_title">Register</h3>
            <div class="login_img">
                <img src="../assets/icons/male-icon.svg" alt="">
                <!-- <div v-if="imgLoading&&!imgLoaded" class="profile_img"><i class="pi pi-spin pi-spinner"></i></div>
                <img v-if="imgLoading || imgStatus==200" :class="imgLoaded?'':'noDisplay'" @load="imgLoaded=true"  :src="createImgUrl(imgID)" alt="">
                <img v-else src="../assets/icons/male-icon.svg" alt=""> -->
                <!-- <form method="post" enctype="multipart/form-data"> -->
                    <!-- <label for="file-input" class="pointer">Add Photo <i v-if="imgStatus==200&& imgLoaded" style="font-size: 15px;width:10px;margin:0;padding: 0;" class="pi pi-check"></i></label> -->
                    <!-- <input type="file" @change="handleImageSubmit" class="file-input" id="file-input" accept=".png,.jpg" name="file"> -->
                <!-- </form> -->
            </div>
            <div class="login_info">
                <form @submit.prevent="postPreCheck()">
                    <h6 class="register_label" >You can change your photo on your profile page</h6>
                    <input required="true" v-model="formData.username" placeholder="Username" type="text">
                    <input required="true" v-model="formData.email" placeholder="Email " type="text">
                    <input required="true" v-model="formData.password" placeholder="Password" type="text">
                    <input required="true" @keyup="pass_ver()" v-model="password_ver"  placeholder="Repeat Password" type="text">
                    <h6 v-if="!passMatch&&password_ver.length>0" style="margin:0;font-size: 15px;text-align: left;opacity: 0.5;font-weight: 400;">passwords do not match</h6>
                    <button class="pointer">Register</button>
                </form>
            </div>
            <div v-if="typeof status == 'number' && status!==200">
                <h5>Something Happened, {{ errors.data }}</h5>
            </div>
            <div v-if="status==200">
                Success 😎, Redirecting ...
            </div>
        </div>



</template>

<style scoped>

.login_img i{

font-size: 30px;
text-align: center;
width:150px;
padding:40% 0;
display: inline-block;

}

.file-input {
  display: none;
}

.noDisplay{
    display: none;
}

.register_label{
    padding:2%;
    margin: 0;
    margin-top:3%;
    font-size: 13px;
    background-color: #222831;
    text-align: left;
    font-weight: 400;
}


</style>