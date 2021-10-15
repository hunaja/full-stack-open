Cypress.Commands.add('addBlog', ({ title, author, url }) => {
  cy.request({
    url: 'http://localhost:3003/api/blogs',
    method: 'POST',
    body: { title, author, url },
    headers: {
      Authorization: `bearer ${JSON.parse(localStorage.getItem('user')).token}`
    }
  })

  cy.visit('http://localhost:3000')
})
