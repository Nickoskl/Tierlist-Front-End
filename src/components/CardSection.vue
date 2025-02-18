<script setup>
import { defineProps } from 'vue';
import TierCard from './TierCard.vue';

defineProps({
    title:{
        type:String,
        default:'Default section name'
    },
    cardNum:{
        type:Number,
        defalut:3
    }
    
})

</script>

<template>

<div class="basic_list">
    <h3>{{title}}</h3>

    <TierCard v-for="card in cardNum" title="Card Title" />

</div>

</template>

<style scoped>


</style>