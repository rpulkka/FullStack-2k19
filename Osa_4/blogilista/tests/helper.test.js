const listHelper = require('../utils/list_helper')
const helper = require('./test_helper')

const listWithOneBlog = helper.listWithOneBlog
const listWithManyBlogs = helper.listWithManyBlogs

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  test('when list has only one blog, the total likes equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('when list has many blogs, the total likes equals the sum of their likes', () => {
    const result = listHelper.totalLikes(listWithManyBlogs)
    expect(result).toBe(36)
  })

  test('when list has no blogs, the total likes equals zero', () => {
    expect(listHelper.totalLikes([])).toBe(0)
  })
})

describe('favourite blog', () => {
  test('when list has only one blog, the favourite blog is the only blog', () => {
    const result = listHelper.favouriteBlog(listWithOneBlog)
    expect(result).toEqual({
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 5
    })
  })

  test('when list has many blogs, the favourite blog equals the one with most likes', () => {
    const result = listHelper.favouriteBlog(listWithManyBlogs)
    expect(result).toEqual({
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12
    })
  })

  test('when list has no blogs, the favourite blog equals empty array.', () => {
    const result = listHelper.favouriteBlog([])
    expect(result).toEqual('ERROR: no blogs in the given list')
  })
})

describe('most blogs', () => {
  test('when list has only one blog, the only author has most blogs', () => {
    const result = listHelper.mostBlogs(listWithOneBlog)
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      blogs: 1
    })
  })

  test('when list has many blogs, the author who has most blogs will be returned', () => {
    const result = listHelper.mostBlogs(listWithManyBlogs)
    expect(result).toEqual({
      author: 'Robert C. Martin',
      blogs: 3
    })
  })

  test('when list has no blogs, when counting most blogs, error message will be returned', () => {
    const result = listHelper.mostBlogs([])
    expect(result).toEqual('ERROR: no blogs in the given list')
  })
})

describe('most blogs', () => {
  test('when list has only one blog, the only only author has most likes', () => {  
    const result = listHelper.mostLikes(listWithOneBlog)
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 5
    })
  })
  test('when list has many blogs, the author who has most likes will be returned', () => {
    const result = listHelper.mostLikes(listWithManyBlogs)
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 17
    })
  })
  test('when list has no blogs, when counting most likes, error message will be returned', () => {
    const result = listHelper.mostLikes([])
    expect(result).toEqual('ERROR: no blogs in the given list')
  })
})