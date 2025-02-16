<script setup>
import { RouterLink, RouterView } from 'vue-router'
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
    <header>
        <div class="pointer header_btn">
            <img src="./assets/icons/male-icon.svg" alt="" class="header_icon">
            <h5 class="header_btn_text">User</h5>
        </div>
        <div class="pointer header_btn">
            <img src="./assets/icons/pencil-icon.svg" alt="" class="header_icon">
            <h5 class="header_btn_text">My lists</h5>
        </div>
        <div class="pointer header_btn">
            <img src="./assets/icons/door-check-out-icon.svg" alt="" class="header_icon">
            <h5 class="header_btn_text">Sign in</h5>
        </div>
    </header>
    <div class="middle_title">
        <h3>TIERLIST</h3>
    </div>
    <div class="admin_menu">
        <div class="admin_menu_title">
            <h3>ADMIN MENU</h3>
        </div>
        <div class="pointer admin_menu_item">
            <img src="./assets/icons/plus-icon.svg" alt="">
            <h5>New Template</h5>
        </div>
        <div class="pointer admin_menu_item">
            <img src="./assets/icons/male-icon.svg" alt="">
            <h5>Users</h5>
        </div>
    </div>
    <div class="main">





    <RouterView />





    </div>
    <footer>
        <img src="./assets/icons/alphabet-c-icon.svg" alt="" class="footer_icon">
        <h5 class="footer_text pointer" href="https://www.instagram.com/nikos.kal_/">Designed & Developed By Nikos.kal_</h5>
    </footer>
  </body>
  </html>
</template>

<style scoped>
/* 
  body{
    background:url('./assets/imgs/c2c9362d-eb52-47ce-a0df-ae58b0e40ae3.png') no-repeat;
    background-size:cover;
    backdrop-filter:blur(10px) opacity(0.1) !important;
    -webkit-backdrop-filter: blur(10px) opacity(0.1) !important;
  } */

  body {
    position: relative;
    min-height: 100vh;
    margin: 0;
    background: rgba(255, 255, 255, 0.5); /* Add a semi-transparent background */
    backdrop-filter: blur(10px) opacity(0.1);
    -webkit-backdrop-filter: blur(10px) opacity(0.1);
  }

  body::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url('./assets/imgs/c2c9362d-eb52-47ce-a0df-ae58b0e40ae3.png') no-repeat;
    background-size: cover;
    z-index: -1;
  }

</style>
