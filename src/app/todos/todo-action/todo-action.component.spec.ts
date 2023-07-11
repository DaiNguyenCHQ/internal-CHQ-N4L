import { TestBed, ComponentFixture } from '@angular/core/testing';
import { TodoActionComponent } from './todo-action.component';
import { TodoActions } from '../state/todos.actions';
import { Todo } from '../models/todo.model';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { selectActiveTodos, selectCompletedTodos } from '../state/todos.selectors';

describe('TodoActionComponent', () => {
  let component: TodoActionComponent;
  let fixture: ComponentFixture<TodoActionComponent>;
  let store: MockStore;
  const initialState = { todos: [] };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule
      ],
      declarations: [TodoActionComponent],
      providers: [
        provideMockStore({ initialState }),
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoActionComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    store.overrideSelector(selectActiveTodos, [{ _id: '1', title: 'Todo 1', status: 'active' }])
    store.overrideSelector(selectCompletedTodos, [{ _id: '1', title: 'Todo 1', status: 'completed' }])
    store.refreshState();

    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should handle keydown event and dispatch addTodo action', () => {
    spyOn(store, 'dispatch');

    const event = new KeyboardEvent('keydown', { key: 'Enter' });
    component.todoTitle = 'New Todo';
    component.handleKeyDown(event);

    expect(store.dispatch).toHaveBeenCalledWith(
      TodoActions.addTodo({ todo: { _id: '', status: 'active', title: 'New Todo' } })
    );
    expect(component.todoTitle).toBe('');
  });

  it('should update all todos status', () => {
    spyOn(store, 'dispatch');

    component.allCompleted = true;
    component.hasTodos = true;
    component.updateAll();

    expect(store.dispatch).toHaveBeenCalledWith(
      TodoActions.bulkUpdateStatus({ status: 'active' })
    );
  });
});
