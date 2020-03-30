import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from '../components/Blog'

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
    id: 'abc123',
    title: 'Test Blog',
    author: 'Teemu Testman',
    url: 'www.testi.com',
    likes: 2,
    user: user
  }

  mockHandler = jest.fn()

  component = render(
    <Blog blog={blog} user={user} editBlog={mockHandler} />
  )
})

test('Renders blogs correctly by default.', () => {
  const titleAndAuthor = component.getByText('Test Blog - By: Teemu Testman')
  const url = component.getByText('www.testi.com')
  const likes = component.getByText('Likes: 2')

  expect(titleAndAuthor).toBeVisible()
  expect(url).not.toBeVisible()
  expect(likes).not.toBeVisible()
})

test('Shows more data by pressing the show button.', () => {
  const titleAndAuthor = component.getByText('Test Blog - By: Teemu Testman')
  const url = component.getByText('www.testi.com')
  const likes = component.getByText('Likes: 2')
  const button = component.getByText('Show')

  fireEvent.click(button)

  expect(titleAndAuthor).toBeVisible()
  expect(url).toBeVisible()
  expect(likes).toBeVisible()
})

test('Shows more data by pressing the show button.', () => {
  const button = component.getByText('Like')

  fireEvent.click(button)

  fireEvent.click(button)

  expect(mockHandler.mock.calls).toHaveLength(2)
})