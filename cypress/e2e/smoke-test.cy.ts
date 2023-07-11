
describe('Todo spec', () => {
    beforeEach(() => {
        cy.request('GET', 'http://localhost:3001/api/todos')
        .its('body')
        .each(todo => cy.request('DELETE', `http://localhost:3001/api/todos/${todo._id}`))
    })
  
    context('With no todos', () => {
      it('Adding new Todos', () => {
        const items = [
          { tName: 'Task 1', expectedLength: 1 },
          { tName: 'Task 2', expectedLength: 2 },
          { tName: 'Task 3', expectedLength: 3 }
        ]
        // cy.visit('https://todomvc.com/examples/react/#/')
        cy.visit('http://localhost:4200/todos')
        cy.intercept('/api/todos').as('create')
        items.forEach(todo => {
          cy.get('.todo-action__input').type(todo.tName).type('{enter}').debug()
          cy.wait('@create')
          cy.get('.todo-item__container').should('have.length', todo.expectedLength)
        });
      })
    })
  
  })