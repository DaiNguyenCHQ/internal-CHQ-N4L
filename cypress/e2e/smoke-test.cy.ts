
describe('template spec', () => {
  const items = [
    { tName: 'Task 1', expectedLength: 1 },
    { tName: 'Task 2', expectedLength: 2 },
    { tName: 'Task 3', expectedLength: 3 }
  ]
  before(() => {
    cy.visit('/')
    cy.request('Patch', 'http://localhost:3001/api/todos/bulk-update-status', { status: 'completed' });
    cy.request('Delete', 'http://localhost:3001/api/todos/clear');
  })
  beforeEach(() => {
    cy.visit('/');
  })

  context('With no todos', () => {
    it('Adding new Todos', () => {
      cy.intercept('/api/todos').as('create')
      items.forEach(todo => {
        cy.get('.todo-action__input').type(todo.tName).type('{enter}')
        cy.wait('@create')
        cy.get('.todo-item__container').should('have.length', todo.expectedLength)
      });
      cy.get('#todos-summarry__item-left').contains(items.length)
    })
    it('Delete Todo Task 1', () => {
      const rmvTodo = 'Task 1'
      cy.contains(rmvTodo).siblings('label').click()
      cy.contains(rmvTodo).siblings('.todo-item__delete').click({ force: true })
      cy.get('.todo-item__container').should('not.contain.text',rmvTodo)
    })
    it('Update a Todo Task 2', () => {
      const from = 'Task 2'
      const to = 'Updated Task'
      cy.contains(from).dblclick({ force: true })
      cy.get('.todo-item__text-input').clear().type(to).type('{enter}')
      cy.get('.todo-item__container').should('contain.text', to)
    })
    it('Marking all Todo as Completed', () => {
      cy.intercept('PUT', '/api/todos/*').as('update')

      cy.get('div[class*=todo-item__container]').each($el => {
        cy.wrap($el).as('item').find('label[for^="todo-item"]').click()
        cy.wait('@update')
      })
      cy.get('#todos-summarry__item-left').should('contain.text', 0)
    })

    it('Clear all Completed Todo', () => {
      cy.intercept('/api/todos/clear').as('clearTodo')
      cy.get('.todos-summarry__clear-completed').click();
      cy.wait('@clearTodo')
      cy.get('.todos-card__content').should('not.exist')
    })
  })

})