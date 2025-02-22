<script setup>
import { onMounted } from 'vue';
import { computed } from 'vue';
import cookie from 'vue-cookies';
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';

const {logoutUser} = useUserStore();
const {status,errors,user} = storeToRefs(useUserStore());


const props = defineProps({
    session:{
        type:Object,
        required:true
    },
    id:{
        type: String,
        required:true
    }
})



const formattedDate = computed(() => {
  const date = new Date(props.session.date);
  return date.toLocaleString(); // You can customize the format as needed
});

</script>

<template>


                <div class="session_card" :style="user[0].token==session.token?'display:none':''" :title="'Token: '+session.token">
                    <div :class="session.token == cookie.get('user_auth')? 'thisSession session_ip':'session_ip'">
                        <img src="../assets/icons/monitor-icon.svg" alt="">
                        <div style="text-align: center;display: inline-block;width:70%;vertical-align: middle;margin-left:20px;">
                            <h5>{{session.ip}}</h5>
                            <h5>{{formattedDate}}</h5>
                        </div>
                    </div>
                    <div @click="logoutUser(props.id,session.token)" class="session_out pointer">
                        <img class="pointer" src="../assets/icons/door-check-out-icon.svg" alt=""></div>
                </div>


</template>

<style scoped>

.thisSession{
    background:#076b00;
    position: relative;
    padding-top:20px;
}

.thisSession::before{
    position: absolute;
    top:0;
    left:0;
    font-size: 80%;
    width:130px;
    text-align: center;
    height:20px;
    border-radius:  0 0 8px 0;
    content: 'This Session';
    background:rgba(0,0,0,0.2);
    color: white;
}

</style>