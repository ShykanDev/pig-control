<template>
    <MainLayout>
    <template #main>
        <div class="">
        <div class="fixed top-0 bottom-0 left-0 right-0 bg-slate-100 -z-20"></div>
        <h2 class="text-3xl font-medium font-poppins text-sky-800">Ventas</h2>
        <div class="flex w-full mb-3 ml-2"><RouterLink :to="{name: 'home'}"><p class="inline-block p-1 px-2 text-lg font-medium bg-white shadow-md text-sky-800 rounded-2xl font-poppins">Ir al inicio</p></RouterLink></div>
        <div class="flex w-full mb-3 ml-2"><p class="inline-block p-1 px-2 text-lg font-medium bg-white shadow-md text-sky-800 rounded-2xl font-poppins">Ingresos Netos: ${{ dailySalesStore.getDailyTotalEarned }}</p></div>
        <div class="flex justify-end w-full mb-3 ml-2">
            <button @click="saveAndReset" class="p-1 mr-10 text-sm text-white rounded-lg bg-sky-700 font-poppins">Guardar y Reestablecer Datos</button>
        </div>
        <section v-if="dailySalesStore.getDailySales" class="flex flex-col items-center justify-center w-full">
            <div v-for="(itemArr, index) in dailySalesStore.getDailySales" :key="index" class="flex flex-col items-start p-2 mx-2 mb-4 w-[95%] bg-white rounded-xl shadow-md font-poppins hover:border hover:border-sky-800 hover:scale-[1.03]">
                <p class="text-lg font-semibold">Fecha:{{ dailySalesStore.getDailySalesDate[index] }}</p>
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
import MainLayout from '@/layouts/MainLayout.vue';
import router from '@/router';
import { useItemDailySales } from '@/store/ItemDailySales';
import { useItemHistorySales } from '@/store/ItemHistorySales';
import { onMounted, ref } from 'vue';

const dailySalesStore = useItemDailySales();
const historySalesStore = useItemHistorySales();

const showTotal = ref(false);

const saveAndReset = () => {
    if(dailySalesStore.getDailySales.length > 0) {       
    const saveTimeStamp = new Date().toLocaleString();
    historySalesStore.pushSaleToHistory(dailySalesStore.getDailySales);
    historySalesStore.pushTotalsToHistory(dailySalesStore.dailySalesTotals);
    historySalesStore.pushDateToHistory(saveTimeStamp);
    dailySalesStore.clearDailySales();
    router.push({ name: 'salesHistory' });
} else {
    alert('You have to add at least one item to the cart');
}
}
</script>

<style scoped>

</style>