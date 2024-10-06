import { defineStore } from "pinia";

export const UseSystemValues  = defineStore('SystemValues',{
    state() {
        return {
            isAppActivated: false
        }
    },
    getters:{
        getIsAppActivated():boolean{
            return this.isAppActivated;
        }
    },
    actions: {
        setIsAppActivated(isAppActivated: boolean) {
            this.isAppActivated = isAppActivated
        }
    },
    persist: true

})