<template>
    <div class="">
        <!-- Header Bar -->
         <div class="relative z-50">
             <slot name="top-bar">
                 <MainTopBar class="" />
             </slot>
         </div>
        <!-- Main content -->
         <div class="pb-16 mt-16">
             <slot name="main"></slot>
         </div>
    </div>
</template>

<script lang="ts" setup>
import MainTopBar from '@/components/header/MainTopBar.vue';

</script>

<style scoped>

</style>