<script setup>


</script>

<script>

document.addEventListener('keydown', function(e) {
    if (e.key === ',') {
        window.location.href = "https://github.dev/Nickoskl/Tierlist-Front-End";
    }
});

</script>
<template>



<h4 target="_blank" href="" class="github">
    
    <div v-if="!imgLoaded" class="githubIcon"><i class="pi pi-github"></i></div>
    <h4 v-if="!buttonActive">Github Link</h4>

</h4>


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
    height:50px;
    z-index: 0;
    transition: right 0.3s,bottom 0.3s,width 0.6s,height 0.6s,transform 0.3s;
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
    height:100px;
    transition: all 0.3s;
    transform:translate(50%,calc(50% - 30px));
}

.github:hover>h4{
    transition: all 0.3s;
    color:#31363f;
    transform: translateY(20px);
}

.github:hover > .githubIcon > i{
    color:#31363f;
    transform: translateY(20px);
}

.github::before{
    pointer-events: none;
    width:100%;
    height:60px;
    position: absolute;
    top:-27px;
    color:rgba(49, 54, 63,1);
    border-radius: 5px;
    left:0;
    content: "or hit ',' on your keyboard to open git web editor";
    font-size: 12px;
    padding:10px 20px;
    z-index: -1 !important;
    opacity: 0;
    transition: all 0.3s;
}

.github:hover::before{
    opacity: 1;
    transition: all 0.3s ;
    transform: translateY(50%);
}

</style>