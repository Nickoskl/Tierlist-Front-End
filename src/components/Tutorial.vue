<script setup>
import { ref, watch } from 'vue';

const buttonActive=ref(false);

watch(buttonActive, (newValue) => {
    const elm =document.getElementsByClassName('tutorialDesc');
    if(newValue){
        
        setTimeout(()=>{elm[0].style.opacity=1},350)
    }else{
        elm[0].style.opacity=0;
    }
    
})

</script>

<template>

<div @click="buttonActive=true" :class="buttonActive?'bigWindow tutorial':'tutorial'">
    
    <img v-if="!buttonActive" src="../assets/icons/8310386.svg" alt="">
    <h4 v-if="!buttonActive">Game Tutorial</h4>

    <div v-show="buttonActive" class="tutorialDesc">
        <img @click.stop="buttonActive=false;" src="../assets/icons/close-square-icon.svg" alt="">
        <div class="tutorialBox">
            <h2>Admin Credentials</h2>
            <h4>admin@admin.com</h4>
            <h4>admin</h4>
            <h4 style="font-size:12px;font-weight: 400">with more permissions</h4>
        </div>
        <div class="tutorialBox">
            <h2>User Credentials</h2>
            <h4>name@name.com</h4>
            <h4>name</h4>
            <h4 style="font-size:12px;font-weight: 400">or you can register your own</h4>
        </div>
        <div style="width:400px;" class="tutorialBox">
            <h4>Image uploading has been disabled due to security reasons.</h4>
            <h4>You can deploy it yourself or contact me for further functionality</h4>
            <h4>This is propably going to get updated with an android app and other technologies I want to experiment</h4>
        </div>
    </div>

</div>


</template>

<style scoped>  


.tutorial{
    text-align: center;
    position: fixed;
    bottom: 100px;
    justify-content: space-evenly;
    right:200px;
    background-color: rgba(49, 54, 63,0.8);
    color:#d0d0d2 ;
    display: flex;
    align-items: center;
    padding:10px 20px;
    gap:15px;
    width:250px;
    height:50;
    z-index: 9;
    transition: right 0.3s,bottom 0.3s,width 0.6s,height 0.6s;
    border-radius: 5px;
    transform:translate(50%,50%);
    cursor:pointer;
    backdrop-filter: blur(5px);    
}


.tutorial img{
    transition: all 0.3s;
    width:30px;
    transform: rotate(-25deg);
    animation: anim 0.8s alternate;
    animation-delay: 1000ms;
}

.tutorial h4{
    background: transparent;
    transition: all 0.3s;
}


.tutorial:hover{
    background-color: #d0d0d2;
    transition: all 0.3s;
}

.tutorial:hover>h4{
    transition: all 0.3s;
    color:#31363f;
}

.tutorial:hover > img{
    filter: invert();
    transition: all 0.3s;
    animation: anim 0.5s infinite alternate;
}


.tutorialDesc h4{
    opacity:1;
    transition: all 0.3s ;
    transition-delay: 200ms;
}


.bigWindow{
    right:50%;
    bottom: 50%;
    width: 1300px;
    height:700px;
    cursor: default;
    text-align: left;
}

.bigWindow{
    opacity: 1;
    transition: all 0.3s ;
}

.bigWindow h4{
    opacity:1;
    color: #d0d0d2;
    transition: all 0.3s ;
    transition-delay: 1200ms;
    background: #212730;
}

.bigWindow:hover{
    background-color: rgba(49, 54, 63,0.8);
    color:#d0d0d2
}


.bigWindow h2{
    padding:15px 0;
    color: #d0d0d2;
}


.bigWindow h4{
    padding: 5px 10px;
    border-radius: 5px;
    margin:5px 0;
}


.tutorialDesc{
    transition: all 0.3s;
    margin:0 auto;
    display: flex;
    gap: 80px;
    opacity: 0;
    align-items: center;
}


.tutorialDesc img{
    transform: none;
    position: absolute;
    top:50px;
    right:50px;
    width:50px;
    cursor:pointer;
    animation: none;
}


.tutorialBox:last-child h4{
    font-size:12px;
    font-weight: 400;
}



@keyframes anim {

    0%{
        transform: rotate(-25deg);
    }
    25%{
        transform: rotate(-45deg);
    }
    50%{
        transform: rotate(-10deg);
    }
    75%{
        transform: rotate(-25deg);
    }
    
}




</style>