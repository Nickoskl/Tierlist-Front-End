<script setup>
import { onMounted } from 'vue';
import CardSection from '../components/CardSection.vue'
import UserInfoSection from '../components/UserInfoSection.vue'
import { useUserStore } from '@/stores/user';
import { useTierlistStore } from '@/stores/tierlist';
import { useRoute,useRouter } from 'vue-router';
import{storeToRefs} from 'pinia';
import cookie from 'vue-cookies';
import { useAuthStore } from '@/stores/auth';
import {ref} from 'vue'
import LoadingCard from '../components/LoadingCard.vue'
import { watch } from 'vue';


const editMode = ref(false);
const editable = ref(false);
const userData = ref([]);

const route = useRoute();
const router = useRouter();

const {getUser} = useUserStore();
const {user,status:profileViewstatus,loadingDone:profileLoadingDone,errors:profileErrors} = storeToRefs(useUserStore())

const {reset,getUserTierListAll}=useTierlistStore();
const {tierlist,errors:tierlistErrors,status,loadingDone:loadingTierlistDone}=storeToRefs(useTierlistStore())

const { authenticate } = useAuthStore();
const { userSuper: userSuperRef } = storeToRefs(useAuthStore());
// const {authenticate} = useAuthStore();

watch(() => route.params.id, async(val) => {
  console.log("ID CHANGED: "+val);
  await getData();
});


onMounted(async()=>{
  await getData();
  await getUserTierListAll(user.value[0].ID);

})

const getData =async () =>{

  
  console.log("LOADING DONE :"+profileLoadingDone.value)

     await getUser(route.params.id);

    if(profileViewstatus.value!=200){
      router.push({name:'notfound'});
    }
     userData.value = user.value[0];


    if(userData.value.session.length>0 || userSuperRef.value){
        editable.value = true;
    }

    if(route.query.edit == 'true'&&editable.value==true){
        editMode.value=true;
    }


    // editMode.value = route.query.editMode == 'true';
  console.log('Edit Mode:', editMode.value);


}


</script>

<template>

<LoadingCard :load="profileLoadingDone" :errors="profileErrors"/>

<UserInfoSection v-if="profileLoadingDone" :user="userData" :editPerm="editable" :editModeImp="editMode" />

<CardSection :list="tierlist" :loadingDone="loadingTierlistDone" title="User TierLists" :cardNum=6 />

</template>

<style scoped>


</style>