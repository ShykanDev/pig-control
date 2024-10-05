<template>
    <div class="">
        <!-- Header Bar -->
         <div class="relative z-50">
             <slot name="top-bar">
                 <MainTopBar class="" />
             </slot>
         </div>
        <!-- Main content -->
         <div class="mt-2">
             <slot name="main"></slot>
         </div>
    </div>
</template>

<script lang="ts" setup>
import MainTopBar from '@/components/header/MainTopBar.vue';

</script>

<style scoped>

</style>