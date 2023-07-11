import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject, Subscription, filter, startWith, takeUntil } from 'rxjs';
import { TodoActions } from '../state/todos.actions';
import { Todo } from '../models/todo.model';
import { selectActiveTodos, selectAllTodos } from '../state/todos.selectors';

@Component({
  selector: 'app-todo-summary',
  templateUrl: './todo-summary.component.html',
  styleUrls: ['./todo-summary.component.css']
})
export class TodoSummaryComponent implements OnInit, OnDestroy {
  isDefaultLink: boolean | undefined;
  private destroy$: Subject<void> = new Subject<void>();
  private activeTodosSubscription: Subscription | undefined;
  itemLeftText: string | undefined;

  constructor(private router: Router, private store: Store) { }

  ngOnInit(): void {
    this.isDefaultLink = this.router.url === '/todos';

    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntil(this.destroy$)
      )
      .subscribe((event: NavigationEnd) => {
        this.isDefaultLink = event.url === '/todos';
      });


    this.activeTodosSubscription = this.store.select(selectActiveTodos).subscribe((todos) => {
      this.itemLeftText = `${todos.length} item${todos.length === 1 ? '' : 's'} left`;
    });
  }

  clearCompletedTodo() {
    this.store.dispatch(TodoActions.clearCompletedTodos());
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.activeTodosSubscription?.unsubscribe();
  }
}
