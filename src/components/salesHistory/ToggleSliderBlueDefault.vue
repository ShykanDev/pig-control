<template>
    <div class="">
    <div @click="isToggled = !isToggled" :class="{'bg-sky-300': !isToggled , 'bg-emerald-500 shadow-md' : isToggled }" class="h-[18px] rounded-full w-8 flex items-center transition-colors duration-200 ease-in-out">
        <div :class="{'translate-x-full bg-cyan-200': isToggled, 'translate-x-0 bg-orange-400': !isToggled}" class="transition-transform duration-200 ease-in-out w-[15px] h-[15px] rounded-full ">
        </div>
    </div>
</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';



const isToggled = ref(false);
</script>

<style scoped>

</style>