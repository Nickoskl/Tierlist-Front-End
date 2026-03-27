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

const imgLoaded = ref([]);
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

const sortableInit=(imgArray)=> {
    

    if(imgArray.indexOf(false)==-1){


    console.log(imgArray[0]);


        

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
            tierlistPlacement.value=tierlist.value.placement[i]+','+tierlistPlacement.value;
            tierlistPlacementArr.value=tierlistPlacement.value.split(',');
        }
    }
    await getTemplate('675dcbfe9f2a7dbb6c086e5c');//replace with route query template id
    imgLoaded.value = Array(template.value.imgs.length).fill(false);





   watch(imgLoaded, (updVal) => {
        console.log(updVal)
        sortableInit(updVal);


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
            </div>
            <div class="tierlist_board template_board">
                <div class="template_board_tiers_row">


                    <div v-for="(lvl,i) in template.levels" class="tier_level">
                        <h5>{{lvl}}</h5>
                        <div class="drop_sortable">
                            <div v-if="!createMode" v-for="(row,j) in tierlist.placement[i].split(',')" class="pointer tier_level_img">
                                <img :src="template.imgs[row]=='default'?'../src/assets/icons/male-icon.svg':createImgUrl(template.imgs[row])" alt="">
                            </div>
                        </div>
                    </div>



                </div>
                <div class="tier_images">
                    <div :class="editMode?'drag_sortable_enable':''" id="drag_sortable">

                        <div   class="pointer tier_level_img" v-if="!createMode?loadingTierListDone&&loadingTemplateDone:loadingTemplateDone"  v-for="(img,i) in template.imgs" >
                                <div v-if="!imgLoaded[i]" class="user_img"><i class="pi pi-spin pi-spinner"></i></div>
                                <img v-if="createMode" :class="imgLoaded[i]?'':'noDisplay'" :src="img=='default'?'../src/assets/icons/male-icon.svg':createImgUrl(img)" @load="imgLoaded[i]=true" alt="">
                                <img v-if="!createMode && tierlistPlacementArr.indexOf(`${i}`)==-1" :class="imgLoaded[i]?'':'noDisplay'" :src="img=='default'?'../src/assets/icons/male-icon.svg':createImgUrl(img)" @load="imgLoaded[i]=true" alt="">
                        </div>
                        
                    </div>
                </div>

                
                <div v-if="loadingUserByDone" class="tierlistCreator">
                    <h4>Created by {{ userBy[0].Name }}</h4>
                    <img :src="userBy[0].Img=='default'?'../src/assets/icons/male-icon.svg':createImgUrl(userBy[0].Img)" alt="">
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


</style>