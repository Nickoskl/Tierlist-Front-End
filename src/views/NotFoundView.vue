<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();


setTimeout(()=>{

    router.push({name:'home'})

},3000)


</script>

<template>
    <div class="not-found">
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <router-link to="/">Go to Home</router-link>
    </div>
  </template>
  
  <script setup>
  </script>
  
  <style scoped>
  .not-found {
    text-align: center;
    margin-top: 50px;
    color:#d0d0d2;
    padding:10% 0;    
  }
  </style>