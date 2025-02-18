<script setup>
import { defineProps } from 'vue';

defineProps({
    title:{
        type: String,
        default:'Default card name'
    },
    tier_img:{
        type: String,
        default:'00000'
    }
})

</script>

<template>

            <div class="pointer list_item">
                <img src="../assets/imgs/c2c9362d-eb52-47ce-a0df-ae58b0e40ae3.png" alt="" class="list_item_img">
                <h5 class="list_item_title">{{title}}</h5>
            </div>

</template>

<style scoped>


</style>