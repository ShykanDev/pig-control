import { ITempCart } from "@/interfaces/ITempCart";
import { defineStore } from "pinia";

export const useItemDailySales = defineStore('itemDailySales', ({
    state: () => ({
        itemDailySales: [] as Array<Array<ITempCart>>,
        dailySalesTotals: [] as Array<number>
    }),
    getters: {
        getDailySales: (state): Array<Array<ITempCart>> => {
            return state.itemDailySales;
        },
       getDailySalesTotals:(state):number => {
           return state.dailySalesTotals.reduce((a, b) => a + b, 0);
       }
        
    },
    actions: {
        pushToDailySales(newItem: ITempCart[]) {
            this.itemDailySales.unshift(newItem);
        },
        pushDailySale(newItem: number) {
            this.dailySalesTotals.push(newItem);
        },
        clearDailySales() {
            this.itemDailySales = [];
            this.dailySalesTotals = [];
        }
    }
}));
