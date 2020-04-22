import { gql } from '@apollo/client'

export const ALL_BOOKS = gql`
  query {
    allBooks { 
      title 
      author {
        name
      }
      published 
      genres
    }
  }
`

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`

export const ADD_BOOK = gql`
  mutation createBook($title: String!, $author: String!, $publishedParam: Int!, $genres: [String!]!) {
    addBook(
      title: $title,
      author: $author,
      published: $publishedParam,
      genres: $genres
    ) {
      title,
      author {
        name
      }
    }
  }
`

export const EDIT_AUTHOR = gql`
  mutation editAuthor($nameParam: String!, $setBornTo: Int!) {
    editAuthor(
      name: $nameParam,
      setBornTo: $setBornTo
    ) {
      name,
      born
    }
  }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

export const FAVORITE_GENRE = gql`
  query{
    me {
      username
      favoriteGenre
    }
  }
`

export const BOOKS_BY_GENRE = gql`
  query allBooks($genre: String!) {
    allBooks(genre: $genre) { 
      title
      author {
        name
      }
      published 
      genres
    }
  }
`
export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      title
      author {
        name
      }
      published
      genres
    }
  }
`