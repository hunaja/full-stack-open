/// <reference types="cypress" />

describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/tests/reset')

    const user = {
      name: 'Etunimi Sukunimi',
      username: 'me',
      password: 'my_password'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)

    cy.visit('http://localhost:3000')
  })

  it('login form is shown', function() {
    cy.contains('login to the application')
    cy.get('#username')
    cy.get('#password')
    cy.get('#login-button')
  })

  describe('Login', function() {
    it('fails with wrong credentials', function() {
      cy.get('#username').type('me')
      cy.get('#password').type('not_my_password')
      cy.get('#login-button').click()

      cy.contains('wrong username or password')
      cy.get('html').should('not.contain', 'Etunimi Sukunimi logged in')
    })

    it('succeeds with correct credentials', function() {
      cy.get('#username').type('me')
      cy.get('#password').type('my_password')
      cy.get('#login-button').click()

      cy.contains('blogs')
      cy.contains('Etunimi Sukunimi logged in')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/login', {
        username: 'me', password: 'my_password'
      }).then((response) => {
        localStorage.setItem('user', JSON.stringify(response.body))
        cy.visit('http://localhost:3000')
      })
    })

    it('a blog can be created', function() {
      cy.contains('create new blog').click()

      cy.get('#title-field').type('My first blog')
      cy.get('#author-field').type('Steve Jobs')
      cy.get('#url-field').type('https://google.fi')
      cy.get('#submit-new-blog-form').click()
    
      cy.get('#blog-list').contains('My first blog Steve Jobs')
    })

    it('a blog can be liked', function() {
      cy.addBlog({
        title: 'My second blog',
        author: 'Steve Jobs',
        url: 'https://apple.com'
      })

      cy.get('.blog:contains(My second blog)').within(() => {
        cy.get('.toggle-button').click()
        cy.get('.like-button').click()
        cy.contains('likes 1')
      })
      
    })

    it('own blog can be deleted', function() {
      cy.addBlog({
        title: 'My third blog',
        author: 'Steve Jobs',
        url: 'https://google.fi'
      })

      cy.get('.blog:contains(My third blog Steve Jobs)').within(() => {
        cy.get('.toggle-button').click()
        cy.get('.remove-button').click()
      })
      
      cy.get('html').should('not.contain', 'My third blog Steve Jobs')
    })

    it('blogs are sorted by the amount of likes', function() {
      cy.addBlog({ title: 'first blog', author: 'me', url: 'https://google.fi' }) // 1
      cy.addBlog({ title: 'second blog', author: 'me', url: 'https://google.fi' }) // 0
      cy.addBlog({ title: 'third blog', author: 'me', url: 'https://google.fi' }) // 2

      cy.get('.blog:contains(first blog me)').within(() => {
        cy.get('.toggle-button').click()
        cy.get('.like-button').click()
        cy.contains('likes 1')
      })

      cy.get('.blog:contains(third blog me)').within(() => {
        cy.get('.toggle-button').click()
        cy.get('.like-button').click()
        cy.contains('likes 1')
        cy.get('.like-button').click()
        cy.contains('likes 2')
      })

      cy.get('.blog').then((blogs) => {
        const correct = ['third blog', 'first blog', 'second blog']

        const result = blogs.children('span.title')
          .map((_, el) => el.innerText)
          .get()

        cy.wrap(result).should('deep.equal', correct)
      })
    })
  })
})