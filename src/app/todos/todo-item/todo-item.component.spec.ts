import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ElementRef } from '@angular/core';
import { TodoItemComponent } from './todo-item.component';
import { TodoActions } from '../state/todos.actions';
import { Todo } from '../models/todo.model';
import { of } from 'rxjs';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

describe('TodoItemComponent', () => {
  let component: TodoItemComponent;
  let fixture: ComponentFixture<TodoItemComponent>;
  let store: MockStore;
  let mockStoreDispatch: jasmine.Spy;
  const initialState = { todos: [] };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [

      ],
      declarations: [TodoItemComponent],
      providers: [
        provideMockStore({ initialState }),
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoItemComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);

    // Mock the store dispatch method
    mockStoreDispatch = spyOn(store, 'dispatch');

    // Provide a mock ElementRef for ViewChild
    const mockElementRef: ElementRef = new ElementRef({ value: 'New Title' });
    component.editInput = mockElementRef;

    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should handle check event and dispatch updateTodo action', () => {
    component.todo = { _id: '1', title: 'Todo 1', status: 'active' } as Todo;
    const mockEvent = { target: { checked: true } } as unknown as Event;

    component.handleCheck(mockEvent);

    expect(mockStoreDispatch).toHaveBeenCalledWith(
      TodoActions.updateTodo({
        todo: { _id: '1', title: 'Todo 1', status: 'completed' }
      })
    );
  });

  it('should handle delete event and dispatch removeTodo action', () => {
    component.todo = { _id: '1', title: 'Todo 1', status: 'active' } as Todo;

    component.handleDelete();

    expect(mockStoreDispatch).toHaveBeenCalledWith(
      TodoActions.removeTodo({ todoId: '1' })
    );
  });

  it('should save text and dispatch updateTodo action', () => {
    component.todo = { _id: '1', title: 'Old Title', status: 'active' } as Todo;
    const mockElementRef: ElementRef = new ElementRef({ value: 'New Title' });
    component.editInput = mockElementRef;

    component.saveText();

    expect(mockStoreDispatch).toHaveBeenCalledWith(
      TodoActions.updateTodo({
        todo: { _id: '1', title: 'New Title', status: 'active' }
      })
    );
    expect(component.editMode).toBeFalse();
  });
});
