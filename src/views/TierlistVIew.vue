<script setup>

import { useRoute } from 'vue-router';
import LoadingCard from '@/components/LoadingCard.vue';
import { storeToRefs } from 'pinia';
import { useTemplateStore } from '@/stores/template';
import { useTierlistStore } from '@/stores/tierlist';
import { useUserStore } from '@/stores/user';
import { useImgStore } from '@/stores/img';
import { onMounted } from 'vue';
import { ref,watch } from 'vue';
import Sortable from 'sortablejs';

const route = useRoute();

const {getTemplate} = useTemplateStore();
const {getUser}=useUserStore()

const {getTierlist}=useTierlistStore();
const {tierlist,loadingDone:loadingTierListDone,errors:tierlistErrors}=storeToRefs(useTierlistStore());
const {template,loadingDone:loadingTemplateDone,errors:templateErrors}= storeToRefs(useTemplateStore())
const {user:userBy,loadingDone:loadingUserByDone,errors:userByErrors}=storeToRefs(useUserStore())

const imgStore = useImgStore();
const { createImgUrl } = imgStore;

const imgDragLoaded = ref([]);
const imgDropLoaded = ref([]);
const bgImg=ref();
const bgImgLoaded=ref(false);

const imgDragLoadedError = ref([]);
const imgDropLoadedError = ref([]);
const bgImgError=ref(false);

const tierlistPlacement=ref('');
const tierlistPlacementArr=ref([]);
const editMode=ref(false);

var drop_hook=[];
var drag_hook='';
const createMode=ref();

 if(route.params.id){
    createMode.value=false;
 }else{
    createMode.value=true;
 }


const props = defineProps({
    userIt:{
        type:Object
    }
})

const toogleEdit=()=>{
    editMode.value=!editMode.value;

    drag_hook.options.disabled=!editMode.value;
    for(let j=0;j<drop_hook.length;j++){
        drop_hook[j].options.disabled=!editMode.value;
    }
    console.log(drag_hook.options.disabled)
        // Sortable(drag_sortable, {
        //     animation: 300,
        //     group:'tierlist',
        //     sort: editMode.value
        //     //ghostClass: 'blue-background-class'
        // });

}

const sortableInit=(dragArray, dropArray)=> {
    

    if(dragArray.indexOf(false)==-1 && dropArray.indexOf(false)==-1){


        

        // let text_sortable = document.getElementById('text_sortable');
        // let images_sortable = document.getElementById('images_sortable');

        const drop_sortable=document.getElementsByClassName('drop_sortable');
        const drag_sortable=document.getElementById('drag_sortable');

        // $('.tier_add').on('click', function(){
        //     let tier = document.createElement("h5");

        //     tier.classList.add('drag');
        //     tier.innerHTML=document.getElementById('tier_add_text').value+'<span>X</span>'
        //     document.getElementById("text_sortable").appendChild(tier);
        //     BG_coloring();

        //     $('.drag:last-child span').on('click', (elm)=>{
        //     console.log(elm.target.parentElement);
        //     elm.target.parentElement.remove();
        // })
        // });


        // $('.drag span').on('click', (elm)=>{
        //     console.log(elm.target.parentElement);
        //     elm.target.parentElement.remove();
        // })


        // new Sortable(text_sortable, {
        //     animation: 300,
        //     //ghostClass: 'blue-background-class'
        // });

        // new Sortable(images_sortable, {
        //     animation: 300,
        //     //ghostClass: 'blue-background-class'
        // });
        

        drag_hook = new Sortable(drag_sortable, {
            animation: 300,
            group:'tierlist',
            sort: true
            //ghostClass: 'blue-background-class'
        });

        for(let i=0;i<drop_sortable.length;i++){

            drop_hook[i] = new Sortable(drop_sortable[i], {
            animation: 300,
            group:'tierlist',
            sort: true
            //ghostClass: 'blue-background-class'
        });

        }





        

    }

    
}

onMounted(async()=>{
    if(!createMode.value){
        await getTierlist(route.params.id);
        await getUser(tierlist.value.by);
        for(var i=0;i<tierlist.value.placement.length;i++){
            imgDropLoaded.value[i] = Array(tierlist.value.placement[i].split(',').length).fill(false);
            imgDropLoadedError.value[i] = Array(tierlist.value.placement[i].split(',').length).fill(null);

            tierlistPlacement.value=tierlist.value.placement[i]+','+tierlistPlacement.value;
            tierlistPlacementArr.value=tierlistPlacement.value.split(',');
        }
    }
    await getTemplate('675dcbfe9f2a7dbb6c086e5c');//replace with route query template id
    imgDragLoaded.value = Array(template.value.imgs.length).fill(false);
    imgDragLoadedError.value = Array(template.value.imgs.length).fill(null);
    bgImg.value=tierlist.value.img?tierlist.value.img:template.value.background;
    // bgImg.value=template.value.background;





   watch([imgDragLoaded, imgDropLoaded], ([dragVal, dropVal]) => {
        console.log(dragVal, dropVal)
        sortableInit(dragVal, dropVal);


    }, { deep: true })

    


    if(route.query.edit){//ADD USERCHECK

        toogleEdit();

    }


})




</script>


<script>




</script>

<template>

    <LoadingCard :load="!createMode?loadingTierListDone&&loadingTemplateDone:loadingTemplateDone" :errors="!createMode?tierlistErrors||templateErrors:templateErrors"/>

    <div class="tierlist_from_temp">
            <div class="tierlist_action">
                <div>
                    {{ route.meta.user }}
                    <h3 v-if="createMode">{{ template.name }} -</h3>
                    <input v-if="createMode" placeholder="Your title here" type="text">
                    <h3 v-if="!createMode && editMode">{{ template.name }} -</h3>
                    <input v-if="!createMode &&editMode" :placeholder="tierlist.name" type="text">
                    <h3 v-if="!createMode && !editMode">{{ template.name }} - {{ tierlist.name }}</h3>
                </div>
                <div class="pointer template_btn">
                    <img src="../assets/icons/close-square-icon.svg" alt="">
                    <h5>Delete</h5>
                </div>
                <div @click="toogleEdit()" class="pointer template_btn">
                    <img src="../assets/icons/pencil-icon.svg" alt="">
                    <h5 v-if="editMode">Save</h5>
                    <h5 v-else >Edit</h5>
                </div>
                <div class="template_img" >
                    <div :class="editMode?'pointer template_btn bg_img_enable':'pointer template_btn'">
                        <img src="../assets/icons/plus-icon.svg" alt="">
                        <h5>Tier Image</h5>
                    </div>
                    <h5 v-if="typeof bgImg=='undefined' || bgImgError" ><i class="pi pi-exclamation-circle"></i><br>Error loading table image</h5>
                    <div v-if="typeof bgImg!='undefined' && !bgImgLoaded" class="user_img"><i class="pi pi-spin pi-spinner"></i></div>
                    <img v-if="typeof bgImg!='undefined'" :src="bgImg=='default'?'../src/assets/icons/male-icon.svg':createImgUrl(bgImg)" @load="bgImgLoaded=true" @error="bgImgError=true" alt="">
                </div>
            </div>
            <div class="tierlist_board template_board">
                <div class="template_board_tiers_row">


                    <div v-for="(lvl,i) in template.levels" class="tier_level">
                        <h5>{{lvl}}</h5>
                        <div class="drop_sortable">
                            <div v-if="!createMode" v-for="(row,j) in tierlist.placement[i].split(',')" class="pointer tier_level_img">
                                <div v-if="!imgDropLoaded[i][j]" class="user_img"><i class="pi pi-spin pi-spinner"></i></div>
                                <img v-if="typeof template.imgs[row] != 'undefined'" @load="imgDropLoaded[i][j]=true" @error="imgDropLoadedError[i][j]=true" :src="template.imgs[row]=='default'?'../src/assets/icons/male-icon.svg':createImgUrl(template.imgs[row])" alt="">
                                <h6 v-if="typeof template.imgs[row] == 'undefined' || imgDropLoadedError[i][j]" >Error loading table image</h6>
                            </div>
                        </div>
                    </div>



                </div>
                <div class="tier_images">
                    <div :class="editMode?'drag_sortable_enable':''" id="drag_sortable">

                        <div   class="pointer tier_level_img" v-if="!createMode?loadingTierListDone&&loadingTemplateDone:loadingTemplateDone"  v-for="(img,i) in template.imgs" >
                                <div v-if="!imgDragLoaded[i]" class="user_img"><i class="pi pi-spin pi-spinner"></i></div>
                                <img v-if="createMode" :class="imgDragLoaded[i]?'':'noDisplay'" :src="img=='default'?'../src/assets/icons/male-icon.svg':createImgUrl(img)" @load="imgDragLoaded[i]=true" alt="">
                                <img v-if="!createMode" :class="imgDragLoaded[i] && tierlistPlacementArr.indexOf(`${i}`)==-1?'':'noDisplay'" :src="img=='default'?'../src/assets/icons/male-icon.svg':createImgUrl(img)" @load="imgDragLoaded[i]=true" alt="">
                        </div>
                        
                    </div>
                </div>

                
                <div v-if="!createMode && loadingUserByDone" class="tierlistCreator">
                    <h4>Created by {{ userBy[0].Name }}</h4>
                    <img :src="userBy[0].Img=='default'?'../src/assets/icons/male-icon.svg':createImgUrl(userBy[0].Img)" alt="">
                </div>
                <div v-if="!createMode && loadingUserByDone" class="tierlistShare tierlistCreator">
                    <h4>Share Link</h4>
                    <h4>test.link/ko-wai3</h4>
                </div>

                    
            </div>
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

.tierlistCreator{
    width:300px;
    background-color: #222831;
    padding:10px 20px;
    border-radius: 5px;
    display: flex;
    justify-content: space-around;
    align-items: center;
}

.tierlistCreator h4{
    font-weight: 400;
    font-size: 17px;
}


.tierlistCreator img{
    width:30px;
    border-radius: 100%;
    float: right;
}

.tier_level_img i{
    margin-top:-27%;
    width: 100px;
}

.tier_level_img h6{
    display: inline-block;
    width:150px;
    position: absolute;
    top:-60%;
    left:0;
    font-size: 14px;
}

.tierlistShare{
    background-color: #d0d0d2;
    color: #222831;
    cursor: text;
    width: 500px;
    pointer-events:all;
    user-select: all;
}

.tierlistShare h4{
    user-select: none;
    text-transform: uppercase;
}

.tierlistShare h4:last-child{
    background-color: #d0d0d2;
    color: #222831;
    cursor: text;
    pointer-events:all;
    text-decoration:underline;
    user-select: all;
    text-underline-offset: 5px;
}



</style>