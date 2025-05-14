import { createSlice } from '@reduxjs/toolkit';

//Implementing createSlice actions for changing count using count actions
interface CounterState {
   count: number;
   loading: boolean;
   error: string | null;
}

const initialState: CounterState = {
   count: 0,
   loading: false,
   error: null,
};

const counterSlice = createSlice({
   name: 'counter',
   initialState,
   reducers: {
      increment: (state) => {
         state.count += 1;
      },
      decrement: (state) => {
         if (state.count > 0) {
         state.count -= 1;
         }
      },
   },
});

export const { increment, decrement } = counterSlice.actions;

export default counterSlice.reducer;