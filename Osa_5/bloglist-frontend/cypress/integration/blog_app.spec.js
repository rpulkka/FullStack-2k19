describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Teemu Testman',
      username: 'testman_teemu',
      password: 'tEeMunPaSsWorDDD13'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown.', function () {
    cy.contains('Log in')
    cy.contains('Username')
    cy.contains('Password')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('testman_teemu')
      cy.get('#password').type('tEeMunPaSsWorDDD13')
      cy.get('#login-button').click()
      cy.contains('Logged in successfully')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('testman_tuomas')
      cy.get('#password').type('tu0m2k5en52l252n2')
      cy.get('#login-button').click()
      cy.contains('Wrong username or password')
    })
  })

  describe.only('When logged in', function () {
    beforeEach(function () {
      cy.request('POST', 'http://localhost:3003/api/login', {
        username: 'testman_teemu', password: 'tEeMunPaSsWorDDD13'
      }).then(response => {
        localStorage.setItem('loggedInUser', JSON.stringify(response.body))
        cy.visit('http://localhost:3000')
      })
    })

    it('A blog can be created', function () {
      cy.contains('Post a New Blog').click()
      cy.get('#title').type('Pellen blogi')
      cy.get('#author').type('Pelle Hermanni')
      cy.get('#url').type('www.hermannipelleilee.org')
      cy.get('#create-blog-button').click()
      cy.contains('Pellen blogi')
      cy.contains('Pelle Hermanni')
      cy.contains('Blog has been posted to the server successfully.')
    })

    it('A blog can be liked', function () {
      //Create a new blog
      cy.contains('Post a New Blog').click()
      cy.get('#title').type('Pellen blogi')
      cy.get('#author').type('Pelle Hermanni')
      cy.get('#url').type('www.hermannipelleilee.org')
      cy.get('#create-blog-button').click()
      //Like the blog
      cy.contains('Pellen blogi').contains('Show').click()
      cy.contains('Like').click()
      cy.contains('Likes: 1')
    })

    it('A blog can be deleted', function () {
      //Create a new blog
      cy.contains('Post a New Blog').click()
      cy.get('#title').type('Pellen blogi')
      cy.get('#author').type('Pelle Hermanni')
      cy.get('#url').type('www.hermannipelleilee.org')
      cy.get('#create-blog-button').click()
      //Delete the blog
      cy.contains('Pellen blogi').contains('Show').click()
      cy.contains('Delete').click()
      cy.contains('Blog has been deleted successfully.')
    })

    it('Blogs are listed in order by likes', function () {
      //Create first blog
      cy.contains('Post a New Blog').click()
      cy.get('#title').type('Pellen blogi')
      cy.get('#author').type('Pelle Hermanni')
      cy.get('#url').type('www.hermannipelleilee.org')
      cy.get('#create-blog-button').click()
      //Create second blog
      cy.get('#title').type('Seikkailijan blogi')
      cy.get('#author').type('Reissumies')
      cy.get('#url').type('www.reissumiehenseikkeilut.fi')
      cy.get('#create-blog-button').click()
      //Create third blog
      cy.get('#title').type('Saliblogi')
      cy.get('#author').type('Salimasa')
      cy.get('#url').type('www.gains.ru')
      cy.get('#create-blog-button').click()
      //Like the blogs
      cy.contains('Seikkailijan blogi').contains('Show').click()
      cy.wait(1000)
      cy.contains('Seikkailijan blogi').contains('Like').click()
      cy.wait(1000)
      cy.contains('Seikkailijan blogi').contains('Like').click()
      cy.wait(1000)
      cy.contains('Seikkailijan blogi').contains('Hide').click()

      cy.contains('Saliblogi').contains('Show').click()
      cy.wait(1000)
      cy.contains('Saliblogi').contains('Like').click()
      cy.wait(1000)
      cy.contains('Saliblogi').contains('Hide').click()
      //Open each blog
      cy.contains('Pellen blogi').contains('Show').click()
      cy.contains('Seikkailijan blogi').contains('Show').click()
      cy.contains('Saliblogi').contains('Show').click()
      //List all blogs
      cy.get('#blogs').children()
        .then(function(blogs) {
          //Check that the blogs are in right order
          cy.get(blogs[0]).contains('Seikkailijan blogi')
          cy.get(blogs[1]).contains('Saliblogi')
          cy.get(blogs[2]).contains('Pellen blogi')
        })
    })
  })
})