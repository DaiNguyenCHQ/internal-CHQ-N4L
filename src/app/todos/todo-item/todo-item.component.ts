import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Todo } from '../models/todo.model';
import { Store } from '@ngrx/store';
import { TodoActions } from '../state/todos.actions';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent {
  @Input() todo: Todo | undefined;
  @ViewChild('editInput') editInput!: ElementRef;
  editMode = false;

  constructor(private store: Store) { }

  get isCompleted(): boolean {
    return this.todo?.status === 'completed';
  }

  handleCheck(event: Event) {
    if (this.todo) {
      const isChecked = (event.target as HTMLInputElement).checked;

      const status = isChecked ? "completed" : "active";

      const modifiedTodo: Todo = {
        ...this.todo,
        status
      };

      this.store.dispatch(TodoActions.updateTodo({ todo: modifiedTodo }));
    }
  }

  handleDelete() {
    if (this.todo) {
      this.store.dispatch(TodoActions.removeTodo({ todoId: this.todo._id }));
    }
  }

  saveText() {
    const title = this.editInput.nativeElement.value;
    if (title !== this.todo?.title && this.todo) {

      const modifiedTodo: Todo = {
        ...this.todo,
        title
      };
      this.store.dispatch(TodoActions.updateTodo({ todo: modifiedTodo }));
    }
    this.editMode = false; // Disable the edit mode after saving
  }
}
