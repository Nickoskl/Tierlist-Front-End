<script setup>
import CardSection from '@/components/CardSection.vue';
import { storeToRefs } from 'pinia';
import { useTierlistStore } from '@/stores/tierlist';
import { onMounted } from 'vue';

const {getTierListAll}=useTierlistStore();
const {tierlist,errors,status,loadingDone:loadingTierlistDone} =storeToRefs(useTierlistStore());

onMounted(async()=>{

    await getTierListAll();

})




</script>

<template>



        <!-- <CardSection title="Our Templates" :cardNum=3 /> -->
        <CardSection :list="tierlist" :loadingDone="loadingTierlistDone" title="User TierLists" :cardNum=6 />


</template>

<style>



</style>