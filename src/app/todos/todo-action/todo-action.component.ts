import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TodoActions } from '../state/todos.actions';
import { Todo } from '../models/todo.model';
import { Observable, Subscription, combineLatestWith, forkJoin } from 'rxjs';
import { selectAllTodos, selectCompletedTodos } from '../state/todos.selectors';

@Component({
  selector: 'app-todo-action',
  templateUrl: './todo-action.component.html',
  styleUrls: ['./todo-action.component.css']
})
export class TodoActionComponent implements OnInit, OnDestroy {
  todoTitle: string | undefined;
  todos$: Observable<ReadonlyArray<Todo>> | undefined;
  completedTodos$: Observable<ReadonlyArray<Todo>> | undefined;
  allCompleted: boolean = false;
  hasTodos: boolean = false;
  private subscription: Subscription | undefined;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.todos$ = this.store.select(selectAllTodos);
    this.completedTodos$ = this.store.select(selectCompletedTodos);

    this.subscription = this.todos$.pipe(
      combineLatestWith(this.completedTodos$)
    )
      .subscribe(([todos, completedTodos]) => {
        this.allCompleted = todos.length == completedTodos.length && todos.length > 0;
        this.hasTodos = todos.length > 0;
      });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  handleKeyDown(event: KeyboardEvent) {
    if (event.key === "Enter") {
      const todo: Todo = {
        _id: "",
        status: 'active',
        title: this.todoTitle ?? ""
      };
      this.store.dispatch(TodoActions.addTodo({ todo }));
      this.todoTitle = '';
    }
  }

  updateAll() {
    if (this.hasTodos) {
      const status = this.allCompleted ? "active" : "completed";
      this.store.dispatch(TodoActions.bulkUpdateStatus({ status }));
    }
  }
}
