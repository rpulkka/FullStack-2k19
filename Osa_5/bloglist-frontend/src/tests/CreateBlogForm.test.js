import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import CreateBlogForm from '../forms/CreateBlogForm'

let user
let blog
let mockHandler
let component

beforeEach(() => {
  user = {
    id: '123abc',
    username: 'Pelle Peloton'
  }

  blog = {
    title: 'Test Blog',
    author: 'Teemu Testman',
    url: 'www.testi.com',
    likes: 0,
    user: user
  }

  mockHandler = jest.fn()

  component = render(
    <CreateBlogForm createBlog={mockHandler} user={user} />
  )
})

test('Form handler is called with correct params when creating the form.', () => {
  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  fireEvent.change(title, {
    target: { value: blog.title }
  })
  fireEvent.change(author, {
    target: { value: blog.author }
  })
  fireEvent.change(url, {
    target: { value: blog.url }
  })
  fireEvent.submit(form)

  const response = mockHandler.mock.calls[0][0]
  expect(mockHandler.mock.calls).toHaveLength(1)
  expect(response).toEqual(blog)
})