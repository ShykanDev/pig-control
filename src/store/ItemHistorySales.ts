import { defineStore } from "pinia";

export const useItemHistorySales = defineStore('itemHistorySales', ({
    state() {
        return{
            totalHistory: [] as Array<any>,
            totalHistoryTotals: [] as Array<any>,
            historyDate: [] as Array<any>,
            historyExpenses: [] as Array<any>
        }
    },
    getters: {
        getHistory():any{
            return this.totalHistory;
        },
        getHistoryTotals():any{
            return this.totalHistoryTotals;
        },
        getHistoryDate():any{
            return this.historyDate;
        },
        getHistoryExpenses():any{
            return this.historyExpenses;
        }
    },
    actions: {
        pushSaleToHistory(itemArr: any[]){ 
            // Asegúrate de que itemArr es un array antes de mapear
            this.totalHistory.unshift(itemArr);
        },
        pushTotalsToHistory(item: any){
            this.totalHistoryTotals.unshift(item);
        },
        pushDateToHistory(item: any){
            this.historyDate.unshift(item);
        },
        clearHistory(){
            this.totalHistory = [];
        },
        pushToHistoryExpenses(item: any){
            this.historyExpenses.unshift(item);
        }
    },
    persist: true
}))