import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TodoActions } from './state/todos.actions';
import { Subscription } from 'rxjs';
import { selectAllTodos } from './state/todos.selectors';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit, OnDestroy {
  private allTodosSubscription: Subscription | undefined;
  isDisplay: boolean = false;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(TodoActions.retrieveTodos({ status: undefined }));

    this.allTodosSubscription = this.store.select(selectAllTodos).subscribe((todos) => {
      this.isDisplay = todos.length > 0;
    });
  }

  ngOnDestroy(): void {
    this.allTodosSubscription?.unsubscribe();
  }
}
