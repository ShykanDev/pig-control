import { ITempCart } from "@/interfaces/ITempCart";
import { defineStore } from "pinia";

export const UseItemTempCart = defineStore('itemTempCart', ({
    state() {
        return{
            tempCart: [] as Array<ITempCart>,
        }
    },
    getters: {
        getTempCart():Array<ITempCart>{
            return this.tempCart
        },
        getGrandTotal():number {
            return this.tempCart.reduce((acc, curr) => acc + curr.itemSubtotal, 0)
        }
    },
    actions: {
        pushToTempCart(newItem:ITempCart) {
            this.tempCart.push(newItem)
        },
        clearTempCart() {
            this.tempCart = []
        }
    }
}))