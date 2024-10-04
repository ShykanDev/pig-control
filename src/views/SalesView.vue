<template>
    <div class="">
        <div class="fixed top-0 bottom-0 left-0 right-0 bg-slate-200 -z-20"></div>
        <h2>This is a sales view</h2>
        <section v-if="dailySalesStore.getDailySales" class="flex flex-col items-center justify-center w-full">
            <div v-for="(itemArr, index) in dailySalesStore.getDailySales" :key="index" class="flex flex-col items-start p-2 mx-2 mb-4 w-[95%] bg-white rounded-xl shadow-md font-poppins hover:border hover:border-sky-800 hover:scale-[1.03]">
                <div class="flex items-center justify-end w-full gap-1 text-base text-sky-800">
                    <p>Fecha:</p>
                    <p class="text-base font-semibold font-poppins ">{{ itemArr[0].itemDate }}</p>
                </div>
            <div v-for="(item, index) in itemArr" :key="index" class="flex items-center gap-1 p-2 text-sky-700">
                {{ item.itemAmount }}
                {{ item.itemName }}
                <p class="text-lg font-semibold underline text-sky-800">
                    ${{ item.itemSubtotal }}
                </p>
            </div>
        </div>
    </section>
    </div>
</template>

<script lang="ts" setup>
import { useItemDailySales } from '@/store/ItemDailySales';

const dailySalesStore = useItemDailySales();
</script>

<style scoped>

</style>