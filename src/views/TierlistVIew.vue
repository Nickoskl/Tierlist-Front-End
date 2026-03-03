<script setup>

import { useRoute } from 'vue-router';
import LoadingCard from '@/components/LoadingCard.vue';
import { storeToRefs } from 'pinia';
import { useTemplateStore } from '@/stores/template';
import { useTierlistStore } from '@/stores/tierlist';
import { useImgStore } from '@/stores/img';
import { onMounted } from 'vue';
import { ref } from 'vue';


const route = useRoute();
const {getTierlist}=useTierlistStore();
const {getTemplate} = useTemplateStore();
const {tierlist,loadingDone:loadingTierListDone,errors:tierlistErrors}=storeToRefs(useTierlistStore());
const {template,loadingDone:loadingTemplateDone,errors:templateErrors}= storeToRefs(useTemplateStore())

const imgStore = useImgStore();
const { createImgUrl } = imgStore;

const imgLoaded = ref([]);   

onMounted(async()=>{
    await getTierlist(route.params.id);
    await getTemplate(tierlist.value.template);
    console.log(tierlist.value.template)
    imgLoaded.value = Array(template.value.imgs.length).fill(false);
    console.log(imgLoaded.value);
})


</script>

<template>

    <LoadingCard :load="loadingTierListDone&&loadingTemplateDone" :errors="tierlistErrors"/>

    {{ route.params.id }}

    {{ tierlist.placement }}

    {{ template.levels }}


    <div v-if="loadingTierListDone&&loadingTemplateDone"  v-for="(img,i) in template.imgs" >
        <div v-if="!imgLoaded[i]" class="user_img"><i class="pi pi-spin pi-spinner"></i></div>
        <img :class="imgLoaded[i]?'user_img':'noDisplay'" @load="imgLoaded[i]=true"  :src="img=='default'?'/src/assets/icons/male-icon.svg':createImgUrl(img)" alt="">
    </div>

    


</template>

<style scoped>


.user_img i{

font-size: 30px;
text-align: center;
width:100px;
padding:40% 0;
display: inline-block;
color:#d0d0d2;

}

.noDisplay{
    display: none;
}


</style>