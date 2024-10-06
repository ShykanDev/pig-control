<template>
    <MainLayout>
    <template #main>
        <div class="fixed top-0 bottom-0 left-0 right-0 bg-slate-100 -z-20"></div>
        <div class="animate-fade-left">
        <h2 class="text-3xl font-medium font-poppins text-sky-800">Ventas</h2>
        <div class="flex items-center w-full mb-3 ml-2">
                    <RouterLink :to="{name: 'home'}">
                    <div class="flex items-center px-1 text-white shadow-md bg-sky-800 rounded-xl">
                    <p class="inline-block p-1 px-2 text-lg font-medium font-poppins">Ir al inicio</p>
                    <v-icon name="hi-solid-view-grid-add" scale="1.5" color="white" />
                </div>
            </RouterLink>
        </div>
        <!-- Chart -->
         <div class="flex items-center justify-end gap-1 mr-3">
            <div  class="flex items-center gap-2 px-3 bg-white rounded-md shadow-sm">
                <p class="font-semibold font-poppins text-sky-800">Mostrar Gráfico</p>
                <ToggleSliderBlueDefault @click="toggleGraph"/>
            </div>
         </div>
        <div v-if="showGraph" class="flex flex-col items-center mb-3 ml-2">
                <PieChart class="w-[70%]  p-1 " :data="[dailySalesStore.getDailyTotalEarned, dailySalesStore.getOnlyExpensesReduced, dailySalesStore.getDailyTotalEarned - dailySalesStore.getOnlyExpensesReduced]"/>
        </div>
        <div class="flex w-full mb-3 ml-2">
            <div class="flex items-center ml-3 bg-white shadow-md rounded-xl">
                <p class="p-1 text-lg font-semibold bg-white text-sky-800 rounded-xl font-poppins">Ingresos Netos:</p>
                <p v-if="!showTotal" class="ml-1 text-lg font-bold text-sky-800 font-poppins">$****</p>
                <p v-if="showTotal"  class="ml-1 text-lg font-bold text-sky-800 font-poppins">${{ dailySalesStore.getDailyTotalEarned }}</p>
                <v-icon @click="toggleTotal" v-if="showTotal" class="mx-2 cursor-pointer"  name="bi-eye" scale="1.5" color="#075985"/>
                <v-icon @click="toggleTotal" v-if="!showTotal"  class="mx-2 cursor-pointer" name="bi-eye-slash" scale="1.5" color="#075985"/>
            </div>
        </div>
        <!-- Add expenses -->
         <section class="flex flex-col gap-4 ml-2 max-w-56">
            <div>
                <div @click="toggleExpenses" class="flex items-center gap-2 p-1 px-2 ml-3 text-lg font-medium bg-white shadow-md cursor-pointer text-sky-800 rounded-xl font-poppins">
                    <p class="font-semibold font-poppins">Agregar Gastos</p>
                    <v-icon v-if="!showExpenses" name="md-libraryadd-round" scale="1.5" color="#075985"/>
                    <v-icon v-if="showExpenses" name="md-closefullscreen" scale="1.5" color="#075985"/>
                </div>
            </div>
            <!-- vif for adding expenses -->
             <article v-if="showExpenses" class="flex flex-col items-center gap-2 p-1 px-2 text-lg font-medium bg-white shadow-md text-sky-800 rounded-2xl font-poppins">
                <p>Gastos hoy: {{ dailySalesStore.getDailyExpenses.length  }}</p>
                <p>Motivo</p>
                <input type="text" v-model="expenseReason" placeholder="Pagué la renta" class=" text-center w-full border-b-[1px] border-sky-800 shadow-sm focus:outline-none mb-2">
                <p>Monto</p>
                <input type="number" v-model="expenseAmount" placeholder="2650" class=" text-center w-full border-b-[1px] border-sky-800 shadow-sm focus:outline-none" min="0">
                <button @click="addExpense" class="p-1 text-xl bg-white border border-gray-300 rounded-lg shadow-md text-sky-800 hover:bg-gray-100 font-poppins">Añadir Gasto</button>
             </article>
         </section>
        <div class="flex justify-end w-full mb-3 ml-2">
            <button @click="saveAndReset" class="p-1 mr-10 text-sm text-white rounded-lg bg-sky-700 font-poppins">Guardar y Reestablecer Datos</button>
        </div>
        <section v-if="dailySalesStore.getDailySales" class="flex flex-col items-center justify-center w-full">
            <div v-for="(itemArr, index) in dailySalesStore.getDailySales" :key="index" class="flex flex-col items-start p-2 mx-2 mb-4 w-[95%] bg-white rounded-xl shadow-md font-poppins hover:border hover:border-sky-800 hover:scale-[1.03]">
                <p class="px-2 text-lg font-semibold text-white rounded-md bg-sky-800">Fecha:{{ dailySalesStore.getDailySalesDate[index] }}</p>
                <div v-for="(item, index) in itemArr" :key="index" class="flex items-center gap-1 p-2 text-sky-700">
                    {{ item.itemAmount }}
                    {{ item.itemName }}
                    <p v-if="item.itemSubtotal" class="text-lg font-semibold underline text-sky-800">
                        ${{ item.itemSubtotal }}
                    </p>
                </div>
                <p class="text-lg font-semibold">Total: {{ dailySalesStore.getDailySalesTotals[index] }}</p>
        </div>
    </section>
        </div>
    </template>
</MainLayout>

</template>

<script lang="ts" setup>
import PieChart from '@/components/charts/PieChart.vue';
import ToggleSliderBlueDefault from '@/components/salesHistory/ToggleSliderBlueDefault.vue';
import MainLayout from '@/layouts/MainLayout.vue';
import router from '@/router';
import { useItemDailySales } from '@/store/ItemDailySales';
import { useItemHistorySales } from '@/store/ItemHistorySales';
import { ref } from 'vue';

const dailySalesStore = useItemDailySales();
const historySalesStore = useItemHistorySales();

// value to toogle the view of the total amount
const showTotal = ref(false);
// function to toogle the view of the total amount
const toggleTotal = () => showTotal.value = !showTotal.value;

// value to show the show expenses div
let showExpenses = ref(false)
// function to toogle the view of the show expenses;
const toggleExpenses = () => {
    showExpenses.value = !showExpenses.value;
}

// vmodel for input to add expenses
let expenseReason = ref('');
let expenseAmount = ref(0);

// function to add expenses
const addExpense = () => {
    if(expenseReason.value !== '' && expenseAmount.value > 0) {
        dailySalesStore.pushToDailyExpenses([{expenseReason: expenseReason.value, expenseAmount: expenseAmount.value, expenseDate: new Date().toLocaleString()}]);
        dailySalesStore.pushToDailyExpensesOnlyExpenses(expenseAmount.value);
        expenseReason.value = '';
        expenseAmount.value = 0;
        // showExpenses.value = false;
    } else {
        alert('Please enter a valid reason and amount');
    }
}
// vmodel for show hide the graph
let showGraph = ref(false);
// function to toggle the view of the graph
const toggleGraph = () => showGraph.value = !showGraph.value;

const saveAndReset = () => {
    if(dailySalesStore.getDailySales.length > 0) {       
    historySalesStore.pushToHistoryExpenses(dailySalesStore.getDailyExpenses);    
    const saveTimeStamp = new Date().toLocaleString();
    historySalesStore.pushSaleToHistory(dailySalesStore.getDailySales);
    historySalesStore.pushTotalsToHistory(dailySalesStore.dailySalesTotals);
    historySalesStore.pushDateToHistory(saveTimeStamp);
    dailySalesStore.clearDailySales();
    dailySalesStore.clearDailyExpenses();
    dailySalesStore.clearDailyExpensesOnlyExpenses();
    router.push({ name: 'salesHistory' });
} else {
    alert('Necesitas tener al menos una venta');
}
}
</script>

<style scoped>

</style>