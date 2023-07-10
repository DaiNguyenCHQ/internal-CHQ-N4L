import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodosComponent } from './todos.component';
import { FormsModule } from '@angular/forms';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoItemComponent } from './todo-item/todo-item.component';
import { TodoSummaryComponent } from './todo-summary/todo-summary.component';
import { TodoActionComponent } from './todo-action/todo-action.component';

@NgModule({
  declarations: [
    TodosComponent,
    TodoListComponent,
    TodoItemComponent,
    TodoSummaryComponent,
    TodoActionComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class TodosModule { }
