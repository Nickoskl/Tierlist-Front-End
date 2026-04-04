<script setup>
import { storeToRefs } from 'pinia';
import { useTemplateStore } from '@/stores/template';
import LoadingCard from '@/components/LoadingCard.vue';
import CardSection from '@/components/CardSection.vue';
import { onMounted } from 'vue';

const {getTemplateAll}=useTemplateStore();
const {template,errors,status,loadingDone}=storeToRefs(useTemplateStore());


onMounted(async()=>{
    await getTemplateAll();
})


</script>

<template>

<CardSection :list="template" :loadingDone="loadingDone" title="Global Templates" />


</template>

<style scoped>


</style>