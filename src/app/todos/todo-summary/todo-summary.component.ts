import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Subject, filter, startWith, takeUntil } from 'rxjs';

@Component({
  selector: 'app-todo-summary',
  templateUrl: './todo-summary.component.html',
  styleUrls: ['./todo-summary.component.css']
})
export class TodoSummaryComponent implements OnInit, OnDestroy {
  isDefaultLink: boolean | undefined;
  private destroy$: Subject<void> = new Subject<void>();

  constructor(private router: Router) { }

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
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
