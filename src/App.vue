<script setup>
import { RouterView } from 'vue-router'
import { reactive,ref, onMounted,onUpdated,watchEffect,watch } from 'vue';
import NavHeader from './components/NavHeader.vue';
import AdminMenu from './components/AdminMenu.vue';
import NavFooter from './components/NavFooter.vue';
import { useAuthStore } from './stores/auth';
import {storeToRefs} from 'pinia';
import cookie from 'vue-cookies';

const {authenticate} = useAuthStore();
const {error,status,userName,userID,userToken,userSuper,userEmail} = storeToRefs(useAuthStore());

const hasCookie = ref($cookies.get('user_auth'));

onMounted(async()=>{
  // if(cookie.get('user_auth')){
  //   await authenticate('/user/login',0);
  // }
})

// watchEffect(() => {
//   hasCookie.value = cookie.get('user_auth');
// });

// watch(hasCookie, async (newValue, oldValue) => {
//   if (newValue !== oldValue) {
//     console.log('Cookie value changed:', newValue);
//     if (newValue) {
//       await authenticate('/user/login', 0);
//     } else {
//       // Handle cookie deletion or other actions
//       console.log('Cookie deleted');
//     }
//   }
// });
</script>

<template>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Source+Code+Pro:ital,wght@0,200..900;1,200..900&display=swap" rel="stylesheet">
    <!-- <script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script> -->
</head>
<body class="body">
    <!-- <form method="post" enctype="multipart/form-data" action="http://localhost:5000/img/upload">
        <input type="file" accept=".png,.jpg" name="file">
        <button>Upload PNG or JPG up to 10 MB</button>
    </form> -->
    <!-- <img src="http://localhost:5000/img/44158.png" alt=""> -->
    <NavHeader :user="userID" />
    <div class="middle_title">
        <h3>TIERLIST</h3>
    </div>
    <AdminMenu v-if="userSuper" />
    <div class="main">

    <RouterView />

    </div>
    <NavFooter />
  </body>
  </html>
</template>

<style scoped>

  body{
    background:rgb(49, 54, 63,0.5);
  }



  body::after {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url('./assets/imgs/c2c9362d-eb52-47ce-a0df-ae58b0e40ae3.png') no-repeat;
    background-size: cover;
    background-position: center center;
    filter: opacity(1) blur(10px);
    z-index: -1;
  } 

</style>
