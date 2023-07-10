
import { createReducer, on } from "@ngrx/store";
import { Todo } from "../models/todo.model";
import { TodoActions } from "./todos.actions";

export const initialState: ReadonlyArray<Todo> = [];

const handleError = (error: Error) => {
  console.log(error);
};

export const todoReducer = createReducer(
  initialState,
  on(TodoActions.retrieveTodosSuccessfully, (_state, { todos }) => {
    return todos;
  }),
  on(TodoActions.addTodoSuccessfully, (state, { todo }) => {
    const newState = [...state, todo];
    return newState;
  }),
  on(TodoActions.updateTodoSuccessfully, (state, { todo }) => {
    const newState = state.map((t) => (t.id === todo.id ? todo : t));
    return newState;
  }),
  on(TodoActions.removeTodoSuccessfully, (state, { todoId }) => {
    const newState = state.filter((todo) => todo.id !== todoId)
    return newState;
  }),
  on(TodoActions.clearCompletedTodosSuccessfully, (state) => {
    const newState = state.filter((todo) => todo.status != "completed");
    return newState;
  }),
  on(TodoActions.onError, (state, { error }) => {
    handleError(error);
    return state;
  }),
);
