import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, from, map, of } from "rxjs";
import { Todo } from "./models/todo.model";

const BASE_URL = 'https://example.com/todos';

@Injectable({ providedIn: 'root' })
export class TodosService {
  constructor(private http: HttpClient) { }

  retrieveTodos(status: "active" | "completed" | undefined): Observable<Array<Todo>> {
    // const url = status ? `${BASE_URL}?status=${status}` : BASE_URL;

    // return this.http
    //   .get<Todo[]>(url)
    //   .pipe(map((todos) => todos || []));
    const source: Array<Todo> = [
      { id: "1", status: "active", title: "This is todo 1" },
      { id: "2", status: "active", title: "This is todo 2" },
      { id: "3", status: "completed", title: "This is todo 3" }
    ];
    return of(source);
  }

  addTodo(todo: Todo) {
    const url = `${BASE_URL}`;
    return this.http.post<Todo>(url, todo);
  }

  updateTodo(todo: Todo) {
    const url = `${BASE_URL}/${todo.id}`;
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
}
