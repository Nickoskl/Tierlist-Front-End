<script setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import CardSection from '@/components/CardSection.vue';
import { storeToRefs } from 'pinia';
import { useTierlistStore } from '@/stores/tierlist';

const {getTierTemplatesbyId}=useTierlistStore();
const {tierlist,status,errors,loadingDone}=storeToRefs(useTierlistStore());



const route = useRoute()


const jsSetupInit=()=>{

    var draggable = document.getElementsByClassName("drag");

    const setPseudoNums=()=>{

        for(var i = 0; i < draggable.length; i++) {
            draggable[ i ].style.setProperty("--pseudo-text", `"${i+1}"`);
        }


    }


    $('.tier_add').on('click', function(){

        if(document.getElementById('tier_add_text').value.length>0){



        let tier = document.createElement("h5");

        tier.classList.add('drag');
        tier.innerHTML=document.getElementById('tier_add_text').value+'<span>X</span>'
        document.getElementById("text_sortable").appendChild(tier);
        
        setPseudoNums();

        $('.drag:last-child span').on('click', (elm)=>{
        console.log(elm.target.parentElement);
        elm.target.parentElement.remove();
        setPseudoNums();
        })


    
        }

    });


    $('.drag span').on('click', (elm)=>{
        console.log(elm.target.parentElement);
        elm.target.parentElement.remove();
        setPseudoNums();
    })

    setPseudoNums();

    $('#text_sortable').change('contentchange', function(){
        setPseudoNums();
    })
}


onMounted(async()=>{

    jsSetupInit();

    if(route.params.id){

        await getTierTemplatesbyId('675dcbfe9f2a7dbb6c086e5c');

    }

})



</script>

<template>


<div class="template_action">
            <div>
                <h3>Template Title -</h3>
                <input placeholder="Your Title for your Template" type="text">
            </div>
            <div class="pointer template_btn">
                <img src="../assets/icons/close-square-icon.svg" alt="">
                <h5>Delete</h5>
            </div>
            <div class="pointer template_btn">
                <img src="../assets/icons/pencil-icon.svg" alt="">
                <h5>Save</h5>
            </div>
            <div class="template_img">
                <div class=" pointer template_btn">
                    <img src="../assets/icons/plus-icon.svg" alt="">
                    <h5>Template Image</h5>
                </div>
                <img src="../assets/imgs/c2c9362d-eb52-47ce-a0df-ae58b0e40ae3.png" alt="">
            </div>
        </div>
        <div class="template_board">
            <h3>Tiers</h3>
            <div id="text_sortable" class="template_board_tiers">
                <h5 class="drag">Best <span>X</span></h5>
                <h5 class="drag">Good <span>X</span></h5>
                <h5 class="drag">Averageeeeeeeeee <span>X</span></h5>
                <h5 class="drag">Bad <span>X</span></h5>
                <h5 class="drag">Worst <span>X</span></h5>
                <h5 class="drag">Best <span>X</span></h5>
                <h5 class="drag">Good <span>X</span></h5>
                <h5 class="drag">Average <span>X</span></h5>
                <h5 class="drag">Bad <span>X</span></h5>
                <h5 class="drag">Worst <span>X</span></h5>
                <h5 class="drag">Best <span>X</span></h5>
                <h5 class="drag">Good <span>X</span></h5>
                <h5 class="drag">Average <span>X</span></h5>
                <h5 class="drag">Bad <span>X</span></h5>
                <h5 class="drag">Worst <span>X</span></h5>
            </div>
            <input id="tier_add_text" type="text">
            <img class="tier_add tier_plus_icon pointer" src="../assets/icons/plus-icon.svg" alt="">
            <h3>Images</h3>
            <div id="images_sortable" class="template_board_images" ondrop="">
                <div class="drag board_img">
                    <img src="../assets/imgs/c2c9362d-eb52-47ce-a0df-ae58b0e40ae3.png" alt="">
                    <span>X</span>
                </div>
                <div class="drag board_img">
                    <img src="../assets/imgs/c2c9362d-eb52-47ce-a0df-ae58b0e40ae3.png" alt="">
                    <span>X</span>
                </div>
                <div class="drag board_img">
                    <img src="../assets/imgs/c2c9362d-eb52-47ce-a0df-ae58b0e40ae3.png" alt="">
                    <span>X</span>
                </div>
                <div class="drag board_img">
                    <img src="../assets/imgs/c2c9362d-eb52-47ce-a0df-ae58b0e40ae3.png" alt="">
                    <span>X</span>
                </div>
                <div class="drag board_img">
                    <img src="../assets/imgs/c2c9362d-eb52-47ce-a0df-ae58b0e40ae3.png" alt="">
                    <span>X</span>
                </div>
            </div>
            <img class="tier_plus_icon pointer" src="../assets/icons/plus-icon.svg" alt="">
        </div>

<CardSection v-if="route.params.id && loadingDone && tierlist.length>0 " :list="tierlist" :loadingDone="loadingDone" title="Tierlists using this template" />

</template>

<style scoped>

</style>