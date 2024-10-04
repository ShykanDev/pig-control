<template>
    <MainLayout>
        <template #main>
            <div class=" w-dvw">
        <div class="fixed top-0 bottom-0 left-0 right-0 bg-slate-100 -z-20"></div>
        <h1 class="text-2xl font-bold font-poppins text-sky-800">Historial de Ventas</h1>
        <div class="flex w-full gap-1 mb-3 ml-2">
            <p>Mostrar Resumen</p>
            <input type="checkbox" @click="toggleSummary" v-model="showSummary">
        </div>
        <!-- Lenght limitator -->
        <div class="flex">
            <div class="flex">
                <p>Mostrando:</p>
                <p class="text-center w-14"  type="number" min="1">{{ start  }}</p>
                <p class="text-lg font-bold">/</p>
                <p class="text-center w-14">{{ historyLength }}</p>
            </div>
        </div>
        <div class="flex flex-col items-center">
            <div v-for="(itemArr, indexArr) in historySalesStore.getHistory.slice(start, end)" :key="indexArr" class="px-2 py-1 mb-3 overflow-auto w-[95%] bg-white rounded-md font-poppins max-h-40">
                <!-- {{ itemArr[0] }} -->
                  <div class="flex justify-end mr-3">
                      <p>Fecha: {{ historySalesStore.getHistoryDate[indexArr] }}</p>
                  </div>
                  <p>
                     Total Vendido: ${{ historySalesStore.getHistoryTotals[indexArr].reduce((a:number, b:number) => a + b, 0) }}
                  </p>
                  <section v-if="showSummary">
                      <div v-for="(item2, index) in itemArr" :key="index">
                          <div v-for="(item, index) in item2" :key="index" class="flex gap-1">
                              <p>{{ item.itemAmount }}</p>
                              <p>{{ item.itemName }}</p>
                              <p>${{ item.itemSubtotal }}</p>
                            </div>
                        </div>
                    </section>
            <div>

            </div>
            </div>
            </div>

            </div>
        </template>
    </MainLayout>
</template>

<script lang="ts" setup>
import MainLayout from '@/layouts/MainLayout.vue';
import { useItemHistorySales } from '@/store/ItemHistorySales';
import { ref } from 'vue';

const historySalesStore = useItemHistorySales();

// ref to the checkbox element to show or hide the summary
let showSummary = ref(false);

// function to toggle the summary
const toggleSummary = () => {
    showSummary.value = !showSummary.value;
}

// initial number to limit the number of sales to show
let start = ref(10);
let historyLength = ref(historySalesStore.getHistory.length);
let end = ref(15);
</script>

<style scoped>

</style>