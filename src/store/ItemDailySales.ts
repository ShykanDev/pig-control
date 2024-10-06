import { ITempCart } from "@/interfaces/ITempCart";
import { defineStore } from "pinia";

export const useItemDailySales = defineStore('itemDailySales', ({
    state: () => ({
        itemDailySales: [] as Array<Array<ITempCart>>,
        dailySalesTotals: [] as Array<number>,
        dailySalesDate: [] as Array<string>,
        dailyExpenses: [] as Array<Array<object>>,
        dailyExpensesOnlyExpenses: [] as Array<number>,
    }),
    getters: {
        getDailySales: (state): Array<Array<ITempCart>> => {
            return state.itemDailySales;
        },
       getDailySalesTotals:(state):Array<number> => {
           return state.dailySalesTotals;
       },
       getDailySalesDate:(state):Array<string> => {
           return state.dailySalesDate;
       },
       getDailyTotalEarned: (state): number => {
           return state.dailySalesTotals.reduce((a, b) => a + b, 0);
       },
       getDailyExpenses: (state): Array<Array<object>> => {
           return state.dailyExpenses;
       },
       getOnlyExpensesReduced: (state): number => {
           return state.dailyExpensesOnlyExpenses.reduce((a, b) => a + b, 0);
       }
        
    },
    actions: {
        pushToDailySales(newItem: ITempCart[]) {
            this.itemDailySales.unshift(newItem);
        },
        pushToDailySalesDate(newItem: string) {
            this.dailySalesDate.unshift(newItem);
        },
        pushDailySale(newItem: number) {
            this.dailySalesTotals.unshift(newItem);
        },
        clearDailySales() {
            this.itemDailySales = [];
            this.dailySalesTotals = [];
        },
        pushToDailyExpenses(newItem: object[]) {
            this.dailyExpenses.unshift(newItem);
        },
        pushToDailyExpensesOnlyExpenses(newItem: number) {
            this.dailyExpensesOnlyExpenses.unshift(newItem);
        },
        clearDailyExpensesOnlyExpenses() {
            this.dailyExpensesOnlyExpenses = [];
        },
        clearDailyExpenses() {
            this.dailyExpenses = [];
        }
    }
}));
