import { defineStore } from "pinia";

export const useItemHistorySales = defineStore('itemHistorySales', ({
    state() {
        return{
            totalHistory: [] as Array<any>,
            totalHistoryTotals: [] as Array<any>,
            historyDate: [] as Array<any>
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
        }
    },
    actions: {
        pushSaleToHistory(item: any){
            this.totalHistory.push(item);
        },
        pushTotalsToHistory(item: any){
            this.totalHistoryTotals.push(item);
        },
        pushDateToHistory(item: any){
            this.historyDate.push(item);
        },
        clearHistory(){
            this.totalHistory = [];
        }
    }
}))