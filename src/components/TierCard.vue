<script setup>
import { ref } from 'vue';
import { useImgStore } from '@/stores/img';

const {createImgUrl}=useImgStore();

const props = defineProps({
    title:{
        type: String,
        default:'Default card name'
    },
    tier_img:{
        type: String,
        default:'00000'
    }
})

const imgLoaded=ref(false);
const imageError = ref(null);

</script>

<template>
    
    <div class="pointer list_item">
                {{ imageError }}
                <div v-if="!imgLoaded" class="user_img"><i :class="imageError?'pi pi-exclamation-circle':'pi pi-spin pi-spinner'"></i></div>
                <img :class="imgLoaded?'list_item_img':'noDisplay'" @load="imgLoaded=true"  :src="tier_img=='default'?'/src/assets/imgs/c2c9362d-eb52-47ce-a0df-ae58b0e40ae3.png':createImgUrl(tier_img)" @error="imageError='Image error'" alt="">
        <h5 class="list_item_title">{{title}}</h5>
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