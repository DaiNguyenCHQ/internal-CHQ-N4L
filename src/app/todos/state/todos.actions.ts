import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { Todo } from "../models/todo.model";

export const TodoActions = createActionGroup({
  source: 'Todos',
  events: {
    'Retrieve Todos': props<{ status: "active" | "completed" | undefined }>(),
    'Retrieve Todos Successfully': props<{ todos: ReadonlyArray<Todo> }>(),
    'Add Todo': props<{ todo: Todo }>(),
    'Add Todo Successfully': props<{ todo: Todo }>(),
    'Update Todo': props<{ todo: Todo }>(),
    'Update Todo Successfully': props<{ todo: Todo }>(),
    'Remove Todo': props<{ todoId: string }>(),
    'Remove Todo Successfully': props<{ todoId: string }>(),
    'Clear Completed Todos': emptyProps(),
    'Clear Completed Todos Successfully': emptyProps(),
    'Bulk Update Status': props<{ status: "active" | "completed" }>(),
    'On Error': props<{ error: Error }>(),
  },
});
