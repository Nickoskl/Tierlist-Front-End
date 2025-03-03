<script setup>
import { onMounted } from 'vue';
import CardSection from '../components/CardSection.vue'
import UserInfoSection from '../components/UserInfoSection.vue'
import { useUserStore } from '@/stores/user';
import { useRoute } from 'vue-router';
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

const {getUser} = useUserStore();
const {user,status:profileViewstatus,loadingDone,errors} = storeToRefs(useUserStore())

const { authenticate } = useAuthStore();
const { userSuper: userSuperRef } = storeToRefs(useAuthStore());
// const {authenticate} = useAuthStore();

watch(() => route.params.id, async(val) => {
  console.log("ID CHANGED: "+val);
  await getData();
});


onMounted(async()=>{

  await getData();

})

const getData =async () =>{

  
  console.log("LOADING DONE :"+loadingDone.value)

     await getUser(route.params.id);
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

<LoadingCard :load="loadingDone" :errors="errors"/>

<UserInfoSection v-if="loadingDone" :user="userData" :editPerm="editable" :editModeImp="editMode" />

<CardSection title="User TierLists" :cardNum=6 />

</template>

<style scoped>


</style>