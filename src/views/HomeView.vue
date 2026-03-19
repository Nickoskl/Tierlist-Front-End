<script setup>
import CardSection from '@/components/CardSection.vue';
import { storeToRefs } from 'pinia';
import { useTierlistStore } from '@/stores/tierlist';
import { useTemplateStore } from '@/stores/template';
import { onMounted } from 'vue';

const {getTierListAll}=useTierlistStore();
const {tierlist,errors:errorsTierlist,statusTierlist,loadingDone:loadingTierlistDone} =storeToRefs(useTierlistStore());

const {getTemplateAll}=useTemplateStore();
const {template,errors:errorsTemplate,status:statusTemplate,loadingDone:loadingTemplateDone}=storeToRefs(useTemplateStore());

onMounted(async()=>{

    await getTemplateAll();
    await getTierListAll();

})




</script>

<template>


        <!-- #TODO Loading with errors -->
        <CardSection :list="template" :loadingDone="loadingTemplateDone" title="Our Templates" :cardNum=3 />
        <CardSection :list="tierlist" :loadingDone="loadingTierlistDone" title="User TierLists" :cardNum=6 />


</template>

<style>



</style>