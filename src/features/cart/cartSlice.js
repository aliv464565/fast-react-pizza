import { createSlice } from "@reduxjs/toolkit"
import { useSelector } from "react-redux"

const initialState={cart:[]}
const cartSlice=createSlice({
    name:'cart',
    initialState,
    reducers:{
        additem(state,action){
            state.cart.push(action.payload)
        },
        deleteItem(state,action){
            state.cart=state.cart.filter(item=>item.pizzaId!==action.payload)
        },
        decreaseItemQuantity(state,action){
            const item=state.cart.find(item=>item.pizzaId===action.payload)
            item.quantity++;
            item.totalPrice = item.unitPrice * item.quantity;
        },
        indItemQuantity(state,action){
            const item=state.cart.find(item=>item.pizzaId===action.payload)
            
        item.quantity--;
        item.totalPrice = item.unitPrice * item.quantity;
        if(item.quantity<=0)cartSlice.caseReducers.deleteItem(state,action)
        
        }
        ,clearCart(state,action){
            state.cart=[]
        },

    }
})

export const {additem,indItemQuantity,deleteItem,decreaseItemQuantity,clearCart}=cartSlice.actions
export default cartSlice.reducer
export const getTotalQuantity=(state)=> 
    state.Carts.cart.reduce((sum, item) => sum += item?.quantity, 0);
export const getTotalProce=(state)=>
     state.Carts.cart.reduce((sum, item) => sum += item?.totalPrice, 0);
export const getCart=(state)=>state.Carts.cart;

export const getCurrentQuantityId = id => state => state.Carts.cart.find(item=>item.pizzaId===id)?.quantity??0 ;
