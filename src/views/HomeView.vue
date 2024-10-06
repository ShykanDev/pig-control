<template>
  <div class="">
    <MainLayout>
      <template #main>
        <!-- <div  class="fixed top-0 bottom-0 left-0 right-0 bg-slate-100 -z-10"></div> -->
        <!-- <div class="w-full animate-fade-right h-dvh"> -->
          <div @click="sidebarClosed = true" class="fixed top-0 bottom-0 left-0 right-0 transition-colors duration-500 ease-in-out" :class="{'bg-black bg-opacity-40': !sidebarClosed, 'bg-sky-50 -z-20': sidebarClosed }"></div>
          <article :class="{'translate-x-0': !sidebarClosed, '-translate-x-[88%]': sidebarClosed }" class="transition-transform ease-out duration-500 fixed top-0 bottom-0 left-0 bg-slate-100 text-white w-[65%] py-16 flex flex-col items-center gap-3">
            <p class="px-2 text-2xl font-bold bg-white rounded-md shadow-md font-poppins text-sky-800">Orden</p>
            <div class="flex flex-col items-start gap-3 overflow-auto ">
              <p v-for="(item, index) in cartItems" :key="index" class="px-2 mx-10 font-bold bg-white rounded-md shadow-md text-sky-800">{{ item.itemAmount }} {{ item.itemName }} ${{ item.itemSubtotal }}</p>
            </div>
            <p class="px-2 text-xl font-bold bg-white rounded-md shadow-md text-sky-800">Total: ${{ itemsTempCart.getGrandTotal }}</p>
              <div :class="{'bg-white': !sidebarClosed, 'bg-sky-800': sidebarClosed }" @click="toggleSidebar" class="absolute top-0 bottom-0 right-0 flex items-center justify-center w-[12%] cursor-pointer ">
                <v-icon  name="md-arrowforwardios-round" scale="1.5" :color="sidebarClosed ? 'white' : '#075985'" :flip="!sidebarClosed ? 'horizontal' : 'vertical'" />
              </div>
            </article>
            <div class="flex flex-wrap justify-center gap-5 mt-4">
              <ItemCard v-for="item in totalItems" :key="item.itemName" :item-name="item.itemName" :item-price="item.itemPrice" />
            </div>
         <!-- Add sale and Show GranTotal -->
         <section class="flex flex-wrap items-center justify-evenly">
           <h3 class="p-2 text-2xl font-bold text-white px-7 bg-sky-900 rounded-xl">Total: ${{ itemsTempCart.getGrandTotal }}</h3>
           <button @click="pushToDailySales" class="p-2 text-xl font-semibold text-white rounded-lg bg-sky-700 font-poppins">Agregar Venta</button>
          </section>
        <!-- </div> -->
      </template>
    </MainLayout>
  </div>
</template>

<script lang="ts" setup>
import ItemCard from '@/components/main/ItemCard.vue';
import MainLayout from '@/layouts/MainLayout.vue';
import router from '@/router';
import { useItemDailySales } from '@/store/ItemDailySales';
import { useItemsStore } from '@/store/ItemsStore';
import { UseItemTempCart } from '@/store/ItemTempCart';
import { onUnmounted, ref } from 'vue';

const itemsStore = useItemsStore();
const totalItems = itemsStore.getItemsStore;
const itemsTempCart = UseItemTempCart();
const cartItems = itemsTempCart.getTempCart;
const dailySalesStore = useItemDailySales();

let tempCart = itemsTempCart.getTempCart; 

// value to toggle the sidebar 
let sidebarClosed = ref(true);

// function to toggel the sidebar
const toggleSidebar = () => sidebarClosed.value = !sidebarClosed.value;

// function to push selected cart to dailySales and push to that view
const pushToDailySales = () => {
  // verify if the cart is not empty
  if (tempCart.length > 0) {  
    dailySalesStore.pushToDailySales([...tempCart] as any);
    dailySalesStore.pushToDailySalesDate(new Date().toLocaleString());
    dailySalesStore.pushDailySale(itemsTempCart.getGrandTotal);
    itemsTempCart.clearTempCart();
    router.push({ name: 'sales' });
  } else{
    alert('Necesitas tener al menos una venta');
    return;
  }
}

onUnmounted(() => {
  itemsTempCart.clearTempCart();
})

</script>

<style scoped></style>