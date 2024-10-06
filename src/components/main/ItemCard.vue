<template>
    <div class="">
        <div class="flex flex-col items-center p-1 transition-transform duration-200 bg-white shadow-md min-w-36 min-h-36 max-w-20 rounded-2xl justify-evenly hover:border hover:border-sky-800 hover:scale-105 font-poppins ">
            <h2 class="font-semibold select-none text-slate-800">{{ props.itemName }}</h2>
            <h2 class="text-xl font-bold select-none text-sky-900">${{ props.itemPrice }}</h2>
            <div class="flex items-center justify-center gap-3">
                <!-- <p @click="editAmount('-')" class="text-lg font-semibold select-none text-sky-800">-</p> -->
                <v-icon @click="editAmount('-')"  name="md-remove-round" scale="1.5" color="#075985" class="cursor-pointer active:text-red-500" />
                <input @input="updateValues" v-model="itemAmount" class="w-[40%] text-center appearance-none font-bold" type="number" min="0">
                <!-- <p @click="editAmount('+')" class="text-lg font-semibold select-none ">+</p> -->
                <v-icon @click="editAmount('+')" name="md-addcircle" scale="1.5" color="#075985" class="cursor-pointer active:text-emerald-300 active:scale-110"  />
            </div>
            <p class="text-lg font-semibold select-none text-sky-800">Total: ${{ totalToPay }}</p>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useItemsStore } from '@/store/ItemsStore';
import { UseItemTempCart } from '@/store/ItemTempCart';
import { computed, defineProps, ref } from 'vue';

const itemsTempCart = UseItemTempCart();
const itemsStore = useItemsStore();

// value for vmodel input
let itemAmount = ref(0);
// value for total to pay
let totalToPay = computed(()=>props.itemPrice * itemAmount.value);

// function to edit amount
const editAmount = (param:string) => {
    const foundItem = itemsTempCart.getTempCart.find((item) => item.itemName === props.itemName);
    if(param === "+"){
        itemAmount.value++;
        // funtion to add item to cart 
        // if item already exist just increase the quantity
        if (foundItem){
            foundItem.itemAmount = itemAmount.value;
            foundItem.itemDate = new Date().toLocaleString();
            foundItem.itemSubtotal = totalToPay.value;
        } else {
            // If item does not exist, add to the cart
            itemsTempCart.getTempCart.push({
                itemName: props.itemName,
                itemPrice: props.itemPrice,
                itemAmount: itemAmount.value,
                itemSubtotal: totalToPay.value,
                itemDate: new Date().toLocaleString(),
            });
        }
    }else if(param === "-" ){
        if(itemAmount.value > 0){
            itemAmount.value--;
        }
        // funtion to remove item to cart
        const foundItem = itemsTempCart.getTempCart.find((item) => item.itemName === props.itemName);
        // if itemAmount is less than 1 then remove from cart
        if (foundItem && foundItem.itemAmount <=1){
             const indexToRemove = itemsTempCart.getTempCart.indexOf(foundItem);
             itemsTempCart.getTempCart.splice(indexToRemove, 1);
        }
        if (foundItem){
            foundItem.itemAmount = itemAmount.value;
            foundItem.itemDate = new Date().toLocaleString();
            foundItem.itemSubtotal = totalToPay.value;
        } 
    }
}

// functio to update onchange input 
const updateValues = () => {
    const foundItem = itemsTempCart.getTempCart.find((item) => item.itemName === props.itemName);
    if(itemAmount.value <= 0 && foundItem) {
        const indexToRemove = itemsTempCart.getTempCart.indexOf(foundItem);
        itemsTempCart.getTempCart.splice(indexToRemove, 1);
    }
    if (foundItem){
        foundItem.itemAmount = itemAmount.value;
        foundItem.itemDate = new Date().toLocaleString();
        foundItem.itemSubtotal = totalToPay.value;
    } else {
        // If item does not exist, add to the cart
        itemsTempCart.getTempCart.push({
            itemName: props.itemName,
            itemPrice: props.itemPrice,
            itemAmount: itemAmount.value,
            itemSubtotal: totalToPay.value,
            itemDate: new Date().toLocaleString(),
        });
    }
}



const props = defineProps({
    itemName:{
        type:String,
        required:true,
        default:"Tacos"
    },
    itemPrice:{
        type:Number,
        required:true,
        default:10
    },
})



</script>

<style scoped>

</style>