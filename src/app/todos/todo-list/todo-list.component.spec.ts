import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { TodoListComponent } from './todo-list.component';
import { selectActiveTodos, selectAllTodos, selectCompletedTodos } from '../state/todos.selectors';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;
  let store: MockStore;
  let route: ActivatedRoute;
  const initialState = { todos: [] };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [

      ],
      declarations: [TodoListComponent, TodoItemComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { url: [{ path: 'active' }] } }
        },
        provideMockStore({ initialState }),
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    route = TestBed.inject(ActivatedRoute);

    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should select active todos when URL segment is "active"', () => {
    spyOn(route.snapshot.url, 'map').and.returnValue([{ path: 'active' }]);
    component.ngOnInit();
    expect(store.select(selectActiveTodos)).toBeDefined();
  });

  it('should select completed todos when URL segment is "completed"', () => {
    spyOn(route.snapshot.url, 'map').and.returnValue([{ path: 'completed' }]);
    component.ngOnInit();
    expect(store.select(selectCompletedTodos)).toBeDefined();
  });

  it('should select all todos by default', () => {
    spyOn(route.snapshot.url, 'map').and.returnValue([]);
    component.ngOnInit();
    expect(store.select(selectAllTodos)).toBeDefined();
  });
});
