import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from '../models/todo.model';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { selectActiveTodos, selectAllTodos, selectCompletedTodos } from '../state/todos.selectors';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  todos$: Observable<ReadonlyArray<Todo>> | undefined;

  constructor(private store: Store, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const segments = this.route.snapshot.url.map(segment => segment.path);

    switch (segments[0]) {
      case "active":
        this.todos$ = this.store.select(selectActiveTodos);
        break;
      case "completed":
        this.todos$ = this.store.select(selectCompletedTodos);
        break;
      default:
        this.todos$ = this.store.select(selectAllTodos);
        break;
    }
  }
}
