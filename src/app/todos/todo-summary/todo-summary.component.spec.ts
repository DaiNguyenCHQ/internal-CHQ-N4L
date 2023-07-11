import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule, Store } from '@ngrx/store';
import { TodoSummaryComponent } from './todo-summary.component';
import { TodoActions } from '../state/todos.actions';
import { of } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { selectActiveTodos, selectCompletedTodos } from '../state/todos.selectors';

describe('TodoSummaryComponent', () => {
  let component: TodoSummaryComponent;
  let fixture: ComponentFixture<TodoSummaryComponent>;
  let store: MockStore;
  let router: Router;
  const initialState = { todos: [] };


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
      ],
      declarations: [TodoSummaryComponent],
      providers: [
        provideMockStore({ initialState }),
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoSummaryComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
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

  it('should update isDefaultLink property based on router events', () => {
    const navigationEndEvent = new NavigationEnd(0, '/todos', '/todos');
    spyOnProperty(router, 'url').and.returnValue('/todos');
    spyOn(router.events, 'pipe').and.returnValue(of(navigationEndEvent));

    component.ngOnInit();

    expect(component.isDefaultLink).toBeTrue();
  });

  it('should update itemLeftText property based on activeTodosSubscription', () => {
    component.ngOnInit();

    expect(component.itemLeftText).toBe('1 item left');
  });

  it('should update hasCompletedTodos property based on completedTodosSubscription', () => {
    component.ngOnInit();

    expect(component.hasCompletedTodos).toBeTrue();
  });

  it('should dispatch clearCompletedTodos action when clearCompletedTodo is called', () => {
    spyOn(store, 'dispatch');
    component.clearCompletedTodo();

    expect(store.dispatch).toHaveBeenCalledWith(TodoActions.clearCompletedTodos());
  });
});
