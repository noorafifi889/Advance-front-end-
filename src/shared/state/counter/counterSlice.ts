import { createSlice } from "@reduxjs/toolkit";

interface CounterState {
    value: number;
}

const initialState: CounterState = {
    value: 0, 
};

// Create a slice of the store for the counter
const counterSlice =createSlice ({
    name :"counter",
    initialState,
    reducers :{
    // increment :(stats) =>{
    //     stats.value += 1;           
    // },
    // decrement :(stats) =>{
    //     stats.value -= 1;
    //     },
    }
})

// export const { increment, decrement } = counterSlice.actions;
 export  default counterSlice.reducer 