import { TestBed, ComponentFixture } from '@angular/core/testing';
import { TodosComponent } from './todos.component';
import { TodoActions } from './state/todos.actions';
import { selectAllTodos } from './state/todos.selectors';
import { TodosModule } from './todos.module';
import { ActivatedRoute } from '@angular/router';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

describe('TodosComponent', () => {
  let component: TodosComponent;
  let fixture: ComponentFixture<TodosComponent>;
  let store: MockStore;
  const initialState = { todos: [] };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TodosModule
      ],
      declarations: [TodosComponent],
      providers:[
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { url: [{ path: 'active' }] } }
        },
        provideMockStore({ initialState }),
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodosComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    store.overrideSelector(selectAllTodos, [{ _id: '1', title: 'Todo 1', status: 'active' }])

    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set isDisplay to true when there are todos', () => {
    component.ngOnInit();
    expect(component.isDisplay).toBeTrue();
  });

  it('should dispatch retrieveTodos action on component initialization', () => {
    spyOn(store, 'dispatch');
    component.ngOnInit();
    expect(store.dispatch).toHaveBeenCalledWith(TodoActions.retrieveTodos({ status: undefined }));
  });
});
