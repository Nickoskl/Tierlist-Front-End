<script setup>
import UserCard from '@/components/UserCard.vue';
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/stores/user';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import LoadingCard from '@/components/LoadingCard.vue';
import CardSection from '@/components/CardSection.vue';
import { useTierlistStore } from '@/stores/tierlist';

const {user,errors:userErrors,loadingDone:userLoadingDone}=storeToRefs(useUserStore())
const {getUser}=useUserStore();

const {tierlist,errors:tierlistErrors,loadingDone:tierlistLoadingDone}=storeToRefs(useTierlistStore());
const {getUserTierListAll}=useTierlistStore();

const route =useRoute();

onMounted(async()=>{
    await getUser(route.params.id);
    await getUserTierListAll(user.value[0].ID);
})


</script>

<template>

<LoadingCard :load="userLoadingDone" :errors="tierlistErrors&&userErrors"/>
<UserCard v-if="userLoadingDone" :userIt="user[0]"/>
<CardSection :list="tierlist" :loadingDone="tierlistLoadingDone" title="User TierLists" />


</template>

<style scoped>

.usrcard_for_tierlist_bg{
    background-color:#31363f;
}

</style>