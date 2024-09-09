import { createSlice } from "@reduxjs/toolkit";


export const todoSlice = createSlice({
  name: "todo",
  initialState: {
    todos: [
      {
        id: 1,
        title: "Learn Redux",
        body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero quasi in illo?",
        completed: false,
      },
      {
        id: 2,
        title: "Build a Todo App",
        body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero quasi in illo?",
        completed: true,
      },
      {
        id: 3,
        title: "Deploy to production",
        body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero quasi in illo?",
        completed: false,
      },
    ],
  },

  reducers: {
    addTodo: (state, action) => {
      state.todos.push(action.payload);
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      
    },
    toggleTodo: (state, action) => {
      state.todos.forEach((todo) => {
        if (todo.id === action.payload) {
          if (!todo.completed) {
            todo.completed = true;
          } else {
            todo.completed = false;
          }
        }
      });
    },
  },
});

export const { addTodo, deleteTodo, toggleTodo } = todoSlice.actions;
export default todoSlice.reducer;
