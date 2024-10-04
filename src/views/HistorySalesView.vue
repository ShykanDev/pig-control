<template>
    <div class="">
        <h1>This is the history sales</h1>
        <div>
            <p>{{ historySalesStore.getHistory.length }}</p>
            <div v-for="(itemArr, index) in historySalesStore.getHistory" :key="index" class="px-2 py-1 mb-3 rounded-md bg-slate-200">
                    <p>Fecha: {{ historySalesStore.getHistoryDate[index] }}</p>
                    <div v-for="(item2, index) in itemArr[0]" :key="index" class="flex gap-1">
                        <p>
                            {{ item2.itemAmount }} 
                        </p>
                        <p>
                            {{ item2.itemName }} 
                        </p>
                        <!-- <p> de {{ item2.itemPrice }}</p> -->
                        <p v-if="item2.itemSubtotal">${{ item2.itemSubtotal }}</p>
                        <!-- <p v-if="item2.itemSubtotal">Fecha: {{ item2.itemDate }}</p> -->
                    </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useItemHistorySales } from '@/store/ItemHistorySales';

const historySalesStore = useItemHistorySales();

</script>

<style scoped>

</style>