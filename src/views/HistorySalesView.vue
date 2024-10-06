<template>
    <MainLayout>
        <template #main>
            <div class="fixed top-0 bottom-0 left-0 right-0 bg-sky-50 -z-20"></div>
            <div class="w-dvw animate-fade-left">
                <h1 class="text-2xl font-bold font-poppins text-sky-800">Historial de Ventas</h1>
                <div class="flex items-center w-full mb-3 ml-2">
                    <RouterLink :to="{name: 'home'}">
                    <div class="flex items-center px-1 text-white shadow-md bg-sky-800 rounded-xl">
                    <p class="inline-block p-1 px-2 text-lg font-medium font-poppins">Ir al inicio</p>
                    <v-icon name="hi-solid-view-grid-add" scale="1.5" color="white" />
                </div>
            </RouterLink>
        </div>
                <div
                    class="fixed flex items-center gap-2 px-3 mb-3 ml-2 bg-white shadow-md min-w-16 max-w-52 text-sky-800 rounded-2xl ">
                    <p class="font-semibold font-poppins">Mostrar Ventas</p>
                    <ToggleSlider @click="toggleSummary('summary')" />
                </div>
                <div
                    class="fixed flex items-center gap-2 px-3 mb-3 ml-2 bg-white shadow-md right-3 min-w-16 max-w-52 text-sky-800 rounded-2xl ">
                    <p class="font-semibold font-poppins">Mostrar Gastos</p>
                    <ToggleSliderOrange @click="toggleSummary('expenses')" />
                </div>
                <!-- Lenght limitator -->
                <div class="flex justify-center my-3">
                    <div
                        class="flex items-center justify-center gap-2 p-2 transition-all duration-300 bg-white border border-gray-200 rounded-lg shadow-md">
                        <p class="font-bold text-sky-900 font-poppins">Mostrando:</p>
                        <p v-if="historyLength<15" class="w-16 text-lg font-semibold text-center text-gray-800">{{ historyLength }}</p>
                        <!-- <p v-if="historyLength>=15" class="w-16 text-lg font-semibold text-center text-gray-800">{{ end }}</p> -->
                        <input v-if="historyLength>=15" class="w-16 text-lg font-semibold text-center text-gray-800" type="number" v-model="end" name="" id="" min="1" :max="historyLength">
                        <p class="text-lg font-bold text-gray-800">/</p>
                        <p class="w-16 text-lg font-semibold text-center text-gray-800">{{ historyLength }}</p>
                    </div>
                </div>
                <div>
                </div>
                <div class="flex flex-col items-center">
                    <div v-for="(itemArr, indexArr) in historySalesStore.getHistory.slice(start, end)" :key="indexArr"
                        class="px-2 py-1 mb-3 overflow-auto w-[95%] bg-white rounded-md font-poppins  max-h-96 resize-y ">
                        <div class="flex justify-end mr-3">
                            <p class="inline-block px-3 font-semibold text-white rounded-lg text-md bg-sky-900 font-poppins">Fecha: {{ historySalesStore.getHistoryDate[indexArr] }}</p>
                        </div>
                        <!-- Este es el codigo que necesito corregir para mostrar cada -->
                        <!-- <p>{{ historySalesStore.getHistoryExpenses[indexArr].map((item) => item[0].expenseReason) }}</p> -->
                        <p class="inline-block px-3 text-lg font-semibold text-white rounded-lg bg-sky-800 font-poppins">
                            Total Vendido: ${{ historySalesStore.getHistoryTotals[indexArr].reduce((a:number, b:number)=> a + b, 0) }}
                        </p>
                        <div v-if="showExpenses" class="flex justify-end mr-6">
                            <p class="inline-block px-3 mb-2 text-lg font-semibold text-white bg-orange-800 rounded-lg font-poppins">Gastos:</p>
                        </div>
                        <section v-if="showExpenses">
                            <div v-for="(itemdoes, indedex) in historySalesStore.getHistoryExpenses[indexArr]" :key="indedex">
                                <div v-for="item in itemdoes" :key="item" class="flex justify-end gap-3">
                                    <p v-if="!item" class="inline-block px-3 mb-1 font-semibold text-orange-700 rounded-lg shadow-sm bg-orange-50 text-md font-poppins">No hubo gastos</p>
                                    <p class="inline-block px-3 mb-1 font-medium text-orange-700 rounded-lg shadow-sm bg-orange-50 text-md font-poppins">Motivo: {{ item.expenseReason }}</p>
                                    <p class="inline-block px-3 mb-1 font-medium text-orange-700 rounded-lg shadow-sm bg-orange-50 text-md font-poppins">Monto: ${{ item.expenseAmount }}</p>
                                    <p class="inline-block px-3 mb-1 font-medium text-orange-700 rounded-lg shadow-sm bg-orange-50 text-md font-poppins">Fecha: {{ item.expenseDate }}</p>
                                </div>
                            </div>
                        </section>
                        <!--  -->
                         
                        <section v-if="showSummary">
                            <div v-for="(item2, index) in itemArr" :key="index">
                                <div v-for="(item, index) in item2" :key="index" class="flex gap-1 mb-1">
                                    <p class="inline-block px-3 text-white font-poppins bg-sky-800 rounded-2xl ">{{ item.itemAmount }}</p>
                                    <p class="inline-block px-3 text-white font-poppins bg-sky-800 rounded-2xl ">{{ item.itemName }}</p>
                                    <p class="inline-block px-3 font-bold text-emerald-800 font-poppins bg-emerald-200 rounded-2xl">${{ item.itemSubtotal }}</p>
                                </div>
                            </div>
                        </section>
                        <div>
                        </div>
                    </div>
                </div>
            </div>
        </template>
        <template>
    <MainLayout>
        <template #main>
            <div class=" w-dvw">
                <div class="fixed top-0 bottom-0 left-0 right-0 bg-sky-50 -z-20"></div>
                <h1 class="text-2xl font-bold font-poppins text-sky-800">Historial de Ventas</h1>
                <div
                    class="fixed flex items-center gap-2 px-3 mb-3 ml-2 bg-white shadow-md min-w-16 max-w-52 text-sky-800 rounded-2xl ">
                    <p class="font-semibold font-poppins">Mostrar Resumen</p>
                    <ToggleSlider @click="toggleSummary" />
                </div>
                
                <!-- Limitador de longitud -->
                <div class="flex justify-center my-3">
                    <div class="flex items-center justify-center gap-2 p-2 transition-all duration-300 bg-white border border-gray-200 rounded-lg shadow-md">
                        <p class="font-bold text-sky-900 font-poppins">Mostrando:</p>
                        <p v-if="historyLength < 15" class="w-16 text-lg font-semibold text-center text-gray-800">{{ historyLength }}</p>
                        <input v-if="historyLength >= 15" class="w-16 text-lg font-semibold text-center text-gray-800" type="number" v-model="end" :min="1" :max="historyLength">
                        <p class="text-lg font-bold text-gray-800">/</p>
                        <p class="w-16 text-lg font-semibold text-center text-gray-800">{{ historyLength }}</p>
                    </div>
                </div>

                <!-- Mostrar cada venta y sus gastos -->
                <div class="flex flex-col items-center">
                    <div v-for="(itemArr, indexArr) in historySalesStore.getHistory.slice(start, end)" :key="indexArr"
                        class="px-2 py-1 mb-3 overflow-auto w-[95%] bg-white rounded-md font-poppins max-h-96 resize-y">
                        
                        <!-- Mostrar la fecha -->
                        <div class="flex justify-end mr-3">
                            <p class="inline-block px-3 text-lg font-semibold text-white bg-black rounded-lg font-poppins">Fecha: {{ historySalesStore.getHistoryDate[indexArr] }}</p>
                        </div>

                        <!-- Mostrar los gastos (historySalesStore.getHistoryExpenses[indexArr]) -->
                        <div v-if="historySalesStore.getHistoryExpenses[indexArr].length > 0" class="mb-2">
                            <h3 class="font-semibold text-sky-800">Gastos:</h3>
                            <div v-for="(expense, expenseIndex) in historySalesStore.getHistoryExpenses[indexArr]" :key="expenseIndex" class="mb-1">
                                <p>Motivo: {{ expense.expenseReason }}</p>
                                <p>Cantidad: ${{ expense.expenseAmount }}</p>
                                <p>Fecha: {{ expense.expenseDate }}</p>
                            </div>
                        </div>
                        <div v-else>
                            <p class="text-gray-600">Sin gastos registrados.</p>
                        </div>

                        <!-- Mostrar el total vendido -->
                        <p class="inline-block px-3 text-lg font-semibold text-white rounded-lg bg-sky-800 font-poppins">
                            Total Vendido: ${{ historySalesStore.getHistoryTotals[indexArr].reduce((a: number, b: number) => a + b, 0) }}
                        </p>

                        <!-- Mostrar resumen de ventas -->
                        <section v-if="showSummary">
                            <div v-for="(item2, index) in itemArr" :key="index" class="flex gap-1 mb-1">
                                <p class="inline-block px-3 text-white font-poppins bg-sky-800 rounded-2xl ">{{ item2.itemAmount }}</p>
                                <p class="inline-block px-3 text-white font-poppins bg-sky-800 rounded-2xl ">{{ item2.itemName }}</p>
                                <p class="inline-block px-3 font-bold text-emerald-800 font-poppins bg-emerald-200 rounded-2xl">${{ item2.itemSubtotal }}</p>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </template>
    </MainLayout>
</template>

    </MainLayout>
</template>

<script lang="ts" setup>
import ToggleSlider from '@/components/salesHistory/ToggleSlider.vue';
import ToggleSliderOrange from '@/components/salesHistory/ToggleSliderOrange.vue';
import MainLayout from '@/layouts/MainLayout.vue';
import { useItemHistorySales } from '@/store/ItemHistorySales';
import { onMounted, ref } from 'vue';

const historySalesStore = useItemHistorySales();

// ref to the checkbox element to show or hide the summary
let showSummary = ref(false);
// ref to the checkbox element to show or hide the expenses
let showExpenses = ref(false);

// function to toggle the summary
const toggleSummary = (elementToToggle: string) => {
    if (elementToToggle === 'summary'){
        showSummary.value = !showSummary.value;
    } else if (elementToToggle === 'expenses') {
        showExpenses.value = !showExpenses.value;
    } else {
        console.log('Error');
    }
}

// initial number to limit the number of sales to show
let start = ref(0);
let historyLength = ref(historySalesStore.getHistory.length);
let end = ref(15);

// function to limit the number of sales to show
const limitSales = () => {
    if (historySalesStore.getHistory.length >= 15) {
        end.value = 16;
    }
}

onMounted(() => {
    limitSales();
})
</script>

<style scoped>

</style>