const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  let total = 0
  blogs.forEach(blog => {
    total += blog.likes
  });
  return total
}

const favouriteBlog = (blogs) => {
  if(blogs.length === 0) {
    return 'ERROR: no blogs in the given list'
  }
  let fav = []
  let mostLikes = 0
  blogs.forEach(blog => {
    if(blog.likes > mostLikes) {
      fav = blog
      mostLikes = blog.likes
    }
  });
  return {
    'title': fav.title,
    'author': fav.author,
    'likes': mostLikes
  }
}

const mostBlogs = (blogs) => {
  if(blogs.length === 0) {
    return 'ERROR: no blogs in the given list'
  }
  if(blogs.length === 1) {
    return {
      'author': blogs[0].author,
      'blogs': 1
    }
  }
  const authors = blogs.map(blog => blog.author)
  let author = ''
  let mostFrequent = 0
  let frequency = 0
  authors.sort()
  for(let i = 0; i < authors.length; i++) {
    if(authors[i] === authors[i+1]) {
      frequency++
    } else {
      frequency = 0
    }
    if(frequency > mostFrequent) {
      author = authors[i]
      mostFrequent = frequency
    }
  }
  return {
    'author': author,
    'blogs': mostFrequent + 1
  }
}

const mostLikes = (blogs) => {
  if(blogs.length === 0) {
    return 'ERROR: no blogs in the given list'
  }
  const authors = blogs.map(blog => blog.author)
  let authorsAndLikes = {}
  authors.forEach(author => {
    authorsAndLikes[author] = 0
  })
  blogs.forEach(blog => {
    authorsAndLikes[blog.author] = authorsAndLikes[blog.author] + blog.likes
  })
  let author = ''
  let mostLikes = 0
  Object.keys(authorsAndLikes).forEach(key => {
    if(authorsAndLikes[key] > mostLikes) {
      author = key
      mostLikes = authorsAndLikes[key]
    }
  })
  return {
    'author': author,
    'likes': mostLikes
  }
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes
}
