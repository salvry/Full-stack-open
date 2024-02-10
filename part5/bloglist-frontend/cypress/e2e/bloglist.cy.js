describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Example user',
      username: 'exampleuser',
      password: 'password'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)

    const user2 = {
      name: 'Example user 2',
      username: 'exampleuser2',
      password: 'password'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user2)
    cy.visit('http://localhost:5173')

  })

  Cypress.Commands.add('addBlog', ({ title, author, url, likes }) => {
    cy.request({
      url: 'http://localhost:3003/api/blogs',
      method: 'POST',
      body: { title: title, author: author, url: url, likes: likes },
      headers: {
        'Authorization': `Bearer ${JSON.parse(localStorage.getItem('loggedUser')).token}`
      }
    })
  })


  it('Login form is shown', function () {
    cy.visit('http://localhost:5173')
    cy.contains('Log in')
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('exampleuser')
      cy.get('#password').type('password')
      cy.get('#login-button').click()

      cy.contains('Welcome, exampleuser')
    })
    it('fails with wrong credentials', function () {
      cy.get('#username').type('exampleuser')
      cy.get('#password').type('wrongpassword')
      cy.get('#login-button').click()

      cy.contains('Wrong username or password')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.request('POST', 'http://localhost:3003/api/login', {
        username: 'exampleuser', password: 'password'
      }).then(response => {
        localStorage.setItem('loggedUser', JSON.stringify(response.body))
        cy.visit('http://localhost:5173')
      })




    })

    it('A blog can be created', function () {
      cy.contains('New blog').click()
      cy.get('#title').type('exampleblogtitle')
      cy.get('#author').type('exampleblogauthor')
      cy.get('#url').type('exampleblogurl.com')
      cy.get('#submit-blog').click()
      cy.contains('Added exampleblogtitle by exampleblogauthor')
      cy.contains('exampleblogauthor: exampleblogtitle')
    })

    it('A blog can be liked', function () {
      cy.addBlog({ title: 'exampletitle', author: 'exampleauthor', url: 'exampleurl.com' })
      cy.visit('http://localhost:5173')
      cy.get('.show-button').click()
      cy.get('.like-button').click()
      cy.contains('Likes: 1')

    })
    it('A blog can be removed', function () {
      cy.addBlog({ title: 'exampletitle', author: 'exampleauthor', url: 'exampleurl.com' })
      cy.visit('http://localhost:5173')
      cy.get('.show-button').click()
      cy.contains('remove').click()
      cy.contains('exampleauthor: exampletitle').should('not.exist');
    })
    it('Only the user who added the blog can remove it', function () {
      cy.addBlog({ title: 'exampletitle', author: 'exampleauthor', url: 'exampleurl.com' })
      cy.get('#logout-button').click()
      cy.visit('http://localhost:5173')
      cy.get('#username').type('exampleuser2')
      cy.get('#password').type('password')
      cy.get('#login-button').click()
      cy.get('.show-button').click()
      cy.contains('remove').should('not.exist')
    })

    it('Blogs are sorted by likes', function () {
      cy.addBlog({ title: 'exampletitle', author: 'exampleauthor', url: 'exampleurl.com,', likes: 1 })
      cy.addBlog({ title: 'exampletitle2', author: 'exampleauthor2', url: 'exampleur2.com', likes: 2 })
      cy.visit('http://localhost:5173')
      cy.get('.blog').eq(0).should('contain', 'exampleauthor2: exampletitle2')
      cy.get('.blog').eq(1).should('contain', 'exampleauthor: exampletitle')
      cy.get('.show-button').eq(1).click()
      cy.get('.like-button').eq(0).click()
      cy.get('.like-button').eq(0).click()
      cy.get('.blog').eq(0).should('contain', 'exampleauthor: exampletitle')



    })

  })
})
