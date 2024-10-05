import { defineStore } from "pinia";

export const useSystemValues = defineStore("systemValues", {
  state() {
    return {
        isMainSidebarRightOpen: false,
    };
  },
  getters: {
    getIsMainSidebarRightOpen():boolean{
        return this.isMainSidebarRightOpen
    },

  },
  actions: {
    setIsMainSidebarRightOpen(value:boolean){
        this.isMainSidebarRightOpen = value
    },
  },
});
