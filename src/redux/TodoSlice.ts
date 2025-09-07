import { createSlice } from '@reduxjs/toolkit';

export interface Todo {
  id: string;
  title: string;
}

interface TodoState {
  todos: Todo[];
}

const todoState = {
  todos: [],
} as TodoState;

export const todoSlice = createSlice({
  name: 'todo',
  initialState: todoState,
  reducers: {
    addTodo: (state, action) => {
      state.todos.push({
        id: Date.now().toString(),
        title: action.payload,
      });
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter(t => t.id !== action.payload);
    },
  },
});

export const { addTodo, deleteTodo } = todoSlice.actions;

export default todoSlice.reducer;
