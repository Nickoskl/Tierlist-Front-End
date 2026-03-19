<script setup>
import TierCard from './TierCard.vue';
import LoadingCard from './LoadingCard.vue';
import { ref } from 'vue';

const moreClick = ref(false)


defineProps({
    title:{
        type:String,
        default:'Default section name'
    },
    cardNum:{
        type:Number,
        default:9
    },
    list:{
        type:Array
    },
    errors:{
        type:String
    },
    loadingDone:{
        type:Boolean
    }
    
})



</script>

<template>

<div class="basic_list">
    <h3>{{title}}</h3>

    <LoadingCard :load="loadingDone" :errors="errors"/>

    <TierCard v-for="card in list.slice(0, cardNum)" :tier_img="card.img?card.img:card.background" :title="card.name" />

    <TierCard v-if="moreClick" v-for="card in list.slice(cardNum, list.length)" :tier_img="card.img?card.img:card.background" :title="card.name" />

    <h2 @click="moreClick=true" v-if="!moreClick&&loadingDone && list.length>cardNum">MORE</h2>

</div>

</template>

<style scoped>

h2{
    font-size: 120%;
    padding: 1% 2%;
    background-color: #222831;
    width:50%;
    text-align: center;
    margin: 0 auto;
    cursor: pointer;
    border-radius: 5px;
    transition: all 0.3s;
}

h2:hover{
    background-color: #d0d0d2;
    color:#222831;
    width: 70%;
}


</style>