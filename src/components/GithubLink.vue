<script setup>


</script>
<template>



<a target="_blank" href="" class="github">
    
    <div v-if="!imgLoaded" class="githubIcon"><i class="pi pi-github"></i></div>
    <h4 v-if="!buttonActive">Github Link</h4>

</a>


</template>

<style scoped>

.github{
    text-align: center;
    position: fixed;
    bottom: 100px;
    justify-content: space-evenly;
    left:-40px;
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
    text-decoration: none;
}


.github i{
    transition: all 0.3s;
    font-size: 30px;
    vertical-align: middle;
    color:#d0d0d2;
}

.github h4{
    background: transparent;
    transition: all 0.3s;
}


.github:hover{
    background-color: #d0d0d2;
    transition: all 0.3s;
}

.github:hover>h4{
    transition: all 0.3s;
    color:#31363f;
}

.github:hover > .githubIcon > i{
    color:#31363f
}


</style>