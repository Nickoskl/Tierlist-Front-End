<script setup>

const props = defineProps({
    load:{
        type:Boolean,
        required:true
    },
    errors:{
        type:String,
    }
})

</script>

<template>

    <div class="loaddiv" v-if="!props.load">
            <h3>LOADING</h3>
            <i class="pi pi-spin pi-spinner"></i>
        </div>

        <div v-if="props.errors">
            <h3>Error: {{props.errors.data}}</h3>
        </div>


</template>

<style scoped>

.loaddiv{
    text-align: center;
    color:#d0d0d2;
    padding: 10% 0;
}

.loaddiv h3{
    text-align: center;
    color:#d0d0d2;
    padding: 5% 0;
    font-size: 30px;
    font-weight: 400;
}

h3{
    text-align: center;
    color:#d0d0d2;
    padding: 1% 0;
    font-size: 30px;
    font-weight: 400;
}

i{
    font-size: 40px;
    font-weight: 500;
}



</style>