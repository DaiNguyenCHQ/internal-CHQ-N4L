import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TodosService } from './todos.service';
import { Todo } from './models/todo.model';

describe('TodosService', () => {
  let service: TodosService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TodosService]
    });

    service = TestBed.inject(TodosService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve todos', () => {
    const status: 'active' | 'completed' | undefined = 'active';
    const expectedTodos: Todo[] = [{ _id: '1', title: 'Todo 1', status: 'active' }];

    service.retrieveTodos(status).subscribe((todos) => {
      expect(todos).toEqual(expectedTodos);
    });

    const req = httpMock.expectOne(`http://localhost:3001/api/todos?status=${status}`);
    expect(req.request.method).toBe('GET');
    req.flush(expectedTodos);
  });

  it('should add a todo', () => {
    const newTodo: Todo = { _id: '1', title: 'New Todo', status: 'active' };

    service.addTodo(newTodo).subscribe((response) => {
      expect(response).toEqual(newTodo);
    });

    const req = httpMock.expectOne(`http://localhost:3001/api/todos`);
    expect(req.request.method).toBe('POST');
    req.flush(newTodo);
  });

  it('should update a todo', () => {
    const updatedTodo: Todo = { _id: '1', title: 'Updated Todo', status: 'completed' };

    service.updateTodo(updatedTodo).subscribe((response) => {
      expect(response).toEqual(updatedTodo);
    });

    const req = httpMock.expectOne(`http://localhost:3001/api/todos/${updatedTodo._id}`);
    expect(req.request.method).toBe('PUT');
    req.flush(updatedTodo);
  });

  it('should remove a todo', () => {
    const todoId = '1';

    service.removeTodo(todoId).subscribe(() => {
      expect().nothing();
    });

    const req = httpMock.expectOne(`http://localhost:3001/api/todos/${todoId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });

  it('should clear completed todos', () => {
    service.clearCompletedTodo().subscribe(() => {
      expect().nothing();
    });

    const req = httpMock.expectOne(`http://localhost:3001/api/todos/clear`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });

  it('should bulk update todos status', () => {
    const status: 'active' | 'completed' = 'completed';

    service.bulkUpdateStatus(status).subscribe(() => {
      expect().nothing();
    });

    const req = httpMock.expectOne(`http://localhost:3001/api/todos/bulk-update-status`);
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual({ status });
    req.flush({});
  });
});
