<template>
    <div class="">
        <div @click="isToggled = !isToggled" :class="{'bg-emerald-200 ': !isToggled , 'bg-emerald-400 shadow-md' : isToggled }" class="h-[18px] rounded-full w-8 flex items-center transition-colors duration-200 ease-in-out">
            <div :class="{'translate-x-full bg-sky-700': isToggled, 'translate-x-0 bg-sky-900': !isToggled}" class="transition-transform duration-200 ease-in-out w-[15px] h-[15px] rounded-full">
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