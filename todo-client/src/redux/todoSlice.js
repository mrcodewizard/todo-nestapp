import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
   loading: false,
   error: "",
   todo: {}
}

const todoSlice = createSlice({
   name: "todo",
   initialState: initialState,
   reducers: {
      todoSuccess: function(state, action) {
         state.loading = false;
         state.todo = action.payload;
         state.error = "";
      },
      todoError: function(state, action) {
         state.loading = false;
         state.todo = {};
         state.error = action.payload
      }
   }
});
export const todoActions = todoSlice.actions;
export default todoSlice.reducer;

export const createTodo = (todoItem) =>  async(dispatch) => {
   const token = localStorage.getItem("token");
   const headers = {
      "token": token,
      'Content-Type': 'application/json',
   }
   try {
      const res = await axios.post("http://localhost:8080/todos/create", todoItem, { headers });
      dispatch(todoActions.todoSuccess(res.data));
   }
   catch(error) {
      dispatch(todoActions.todoError(error.message));
   }
};