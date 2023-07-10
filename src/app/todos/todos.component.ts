import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TodoActions } from './state/todos.actions';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(TodoActions.retrieveTodos({ status: undefined }));
  }
}
