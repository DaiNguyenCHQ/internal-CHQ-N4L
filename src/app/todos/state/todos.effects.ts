import { Injectable } from "@angular/core";
import { TodosService } from "../todos.service";
import { createEffect, ofType, Actions } from "@ngrx/effects";
import { TodoActions } from "./todos.actions";
import { catchError, exhaustMap, map, of } from "rxjs";
import { Todo } from "../models/todo.model";

@Injectable()
export class TodoEffects {
  constructor(
    private actions$: Actions,
    private todosService: TodosService
  ) { }

  retrieveTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.retrieveTodos),
      exhaustMap((action) =>
        this.todosService.retrieveTodos(action.status).pipe(
          map((todos) =>
            TodoActions.retrieveTodosSuccessfully({ todos })
          ),
          catchError((error: Error) =>
            of(TodoActions.onError({ error }))
          )
        )
      )
    )
  );

  addTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.addTodo),
      exhaustMap((action) =>
        this.todosService.addTodo(action.todo).pipe(
          map((todo: Todo) =>
            TodoActions.addTodoSuccessfully({ todo })
          ),
          catchError((error: Error) =>
            of(TodoActions.onError({ error }))
          )
        )
      )
    )
  );

  updateTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.updateTodo),
      exhaustMap((action) =>
        this.todosService.updateTodo(action.todo).pipe(
          map(() =>
            TodoActions.updateTodoSuccessfully({ todo: action.todo })
          ),
          catchError((error: Error) =>
            of(TodoActions.onError({ error }))
          )
        )
      )
    )
  );

  removeTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.removeTodo),
      exhaustMap((action) =>
        this.todosService.removeTodo(action.todoId).pipe(
          map(() =>
            TodoActions.removeTodoSuccessfully({ todoId: action.todoId })
          ),
          catchError((error: Error) =>
            of(TodoActions.onError({ error }))
          )
        )
      )
    )
  );

  clearCompletedTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.clearCompletedTodos),
      exhaustMap(() =>
        this.todosService.clearCompletedTodo().pipe(
          map(() =>
            TodoActions.clearCompletedTodosSuccessfully()
          ),
          catchError((error: Error) =>
            of(TodoActions.onError({ error }))
          )
        )
      )
    )
  );
}
