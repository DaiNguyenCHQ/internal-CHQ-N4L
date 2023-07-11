import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, from, map, of } from "rxjs";
import { Todo } from "./models/todo.model";

const BASE_URL = 'http://localhost:3001/api/todos';

@Injectable({ providedIn: 'root' })
export class TodosService {
  constructor(private http: HttpClient) { }

  retrieveTodos(status: "active" | "completed" | undefined): Observable<Array<Todo>> {
    const url = status ? `${BASE_URL}?status=${status}` : BASE_URL;

    return this.http
      .get<Todo[]>(url)
      .pipe(map((todos) => todos || []));
  }

  addTodo(todo: Todo) {
    const url = `${BASE_URL}`;
    return this.http.post<Todo>(url, todo);
  }

  updateTodo(todo: Todo) {
    const url = `${BASE_URL}/${todo._id}`;
    return this.http.put(url, todo);
  }

  removeTodo(todoId: string) {
    const url = `${BASE_URL}/${todoId}`;
    return this.http.delete(url);
  }

  clearCompletedTodo() {
    const url = `${BASE_URL}/clear`;
    return this.http.delete(url);
  }

  bulkUpdateStatus(status: "active" | "completed") {
    const url = `${BASE_URL}/bulk-update-status`;
    return this.http.patch(url, { status });
  }
}
