import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Todo } from "../models/todo.model";

export const selectAllTodos = createFeatureSelector<ReadonlyArray<Todo>>('todos');

export const selectActiveTodos = createSelector(
  selectAllTodos,
  (todos) => {
    return todos.filter(todo => todo.status == "active");
  }
);

export const selectCompletedTodos = createSelector(
  selectAllTodos,
  (todos) => {
    return todos.filter(todo => todo.status == "completed");
  }
);
