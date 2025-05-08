import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = ({
    totalItem: localStorage.getItem('totalItem')?JSON.parse(localStorage.getItem('totalItem')):0,
    total: localStorage.getItem('total')?(JSON.parse(localStorage.getItem('total'))):0,
    cart: localStorage.getItem('cart')?(JSON.parse(localStorage.getItem('cart'))):[],
});



const CartSlice = createSlice({
    name:"Cart",
    initialState:initialState,
    reducers:{

       resetCart(state){
            state.cart = [];
            state.total = 0;
            state.totalItem = 0;
            localStorage.removeItem('cart');
            localStorage.removeItem('total');
            localStorage.removeItem('totalItem');
       },

       addToCart(state,action){
            const course = action.payload;
            //check if the course is already in the cart or not 
            const matchInd = state.cart.findIndex(ele => ele._id === course._id);
            if(matchInd>=0){
                toast.error('Course in Already Added in Cart');
            }
            else{
                //not duplicate so add it in cart
                state.cart.push(course);

                //add into total items
                state.totalItem = state.totalItem+1;

                //add the cost to total
                state.total = state.total + course.price;

                //save the info into the local storage now for future fetch
                localStorage.setItem('cart',JSON.stringify(state.cart));
                localStorage.setItem('total',state.total);
                localStorage.setItem('totalItem',state.totalItem);

                toast.success('Course Successfully Added to Your Cart');
            }
            console.log(state.cart);
       },

       removeFromCart(state,action){
        const courseId = action.payload;
        //check if present to remove
        const matchInd = state.cart.findIndex(ele => ele._id===courseId);
        if(matchInd<0){
            toast.error('You Have Not Added This Course To Your Cart');
        }
        else{
            //remove this course price from total
            state.total-=state.cart[matchInd].price;

            //reduce the count by 1
            state.totalItem -=1;

            //remove the specific index element
            state.cart.splice(matchInd,1);

            //save the info into the local storage now for future fetch
            localStorage.setItem('cart',JSON.stringify(state.cart));
            localStorage.setItem('total',state.total);
            localStorage.setItem('totalItem',state.totalItem);

            toast.success('Course Removed From Cart');
        }
       },

       setcart(state,action){
        state.cart = action.payload;
        for(let i of state.cart){
            state.total+=i.price;
        }
        state.totalItem = state.cart.length;
        // console.log('Hello',action.payload);
       }
    }
});

export const {resetCart,addToCart,removeFromCart,setcart} = CartSlice.actions;
export default CartSlice.reducer;