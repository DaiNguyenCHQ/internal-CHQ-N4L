import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodosComponent } from './todos.component';
import { TodoListComponent } from './todo-list/todo-list.component';

const routes: Routes = [
  {
    path: 'todos',
    component: TodosComponent,
    children: [
      {
        path: 'active',
        component: TodoListComponent
      },
      {
        path: 'completed',
        component: TodoListComponent
      },
      {
        path: '',
        component: TodoListComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TodosRoutingModule { }
