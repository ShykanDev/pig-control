<template>
  <div class="">
    <MainLayout>
      <template #main>
        <div class="fixed top-0 bottom-0 left-0 right-0 bg-slate-200 -z-20"></div>
          <article :class="{'translate-x-0': !sidebarClosed, '-translate-x-[92%]': sidebarClosed }" class="transition-transform ease-out duration-500 fixed top-0 bottom-0 left-0 bg-slate-100 w-[25%] py-12 flex flex-col items-center gap-3 overflow-auto">
            <p class="text-2xl font-bold">Venta</p>
            <p v-for="item in cartItems" :key="item.itemName" class="px-2 mx-10 font-bold bg-white rounded-md shadow-sm text-sky-800">{{ item.itemAmount }} {{ item.itemName }} ${{ item.itemSubtotal }}</p>
            <p class="px-2 text-xl font-bold bg-white rounded-md shadow-md text-sky-800">Total: ${{ itemsTempCart.getGrandTotal }}</p>
            <div :class="{'bg-white': !sidebarClosed, 'bg-sky-800': sidebarClosed }" @click="toggleSidebar" class="absolute top-0 bottom-0 right-0 flex items-center justify-center cursor-pointer">
              <v-icon  name="md-arrowforwardios-round" scale="1.5" :color="sidebarClosed ? 'white' : '#075985'" :flip="!sidebarClosed ? 'horizontal' : 'vertical'" />
            </div>
        </article>
        <div class="flex flex-wrap justify-center gap-5">
          <ItemCard v-for="item in totalItems" :key="item.itemName" :item-name="item.itemName" :item-price="item.itemPrice" />
        </div>
         <!-- Add sale and Show GranTotal -->
         <section class="flex flex-wrap items-center justify-evenly">
          <h3 class="p-2 font-sans text-2xl font-bold text-white px-7 bg-sky-900 rounded-xl">Total: ${{ itemsTempCart.getGrandTotal }}</h3>
          <button class="p-2 text-xl text-white rounded-lg bg-sky-700 font-poppins">Agregar Venta</button>
         </section>
      </template>
    </MainLayout>
  </div>
</template>

<script lang="ts" setup>
import ItemCard from '@/components/main/ItemCard.vue';
import MainLayout from '@/layouts/MainLayout.vue';
import { useItemsStore } from '@/store/ItemsStore';
import { UseItemTempCart } from '@/store/ItemTempCart';
import { ref } from 'vue';

const itemsStore = useItemsStore();
const totalItems = itemsStore.getItemsStore;
const itemsTempCart = UseItemTempCart();
const cartItems = itemsTempCart.getTempCart;

let tempCart = itemsTempCart.getTempCart; 

// value to toggle the sidebar 
let sidebarClosed = ref(true);

// function to toggel the sidebar
const toggleSidebar = () => sidebarClosed.value = !sidebarClosed.value;
</script>

<style scoped></style>