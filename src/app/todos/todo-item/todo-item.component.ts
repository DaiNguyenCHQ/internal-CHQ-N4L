import { Component, Input } from '@angular/core';
import { Todo } from '../models/todo.model';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent {
  @Input() todo: Todo | undefined;

  get isCompleted(): boolean {
    return this.todo?.status === 'completed';
  }
}
