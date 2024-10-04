import { ITempCart } from "@/interfaces/ITempCart";
import { defineStore } from "pinia";

export const useItemDailySales = defineStore('itemDailySales', {
    state: () => ({
        itemDailySales: [] as Array<Array<ITempCart>>
    }),
    getters: {
        getDailySales: (state): Array<Array<ITempCart>> => {
            return state.itemDailySales;
        }
    },
    actions: {
        pushToDailySales(newItem: ITempCart[]) {
            this.itemDailySales.push(newItem);
        }
    }
});
