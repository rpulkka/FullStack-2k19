import { gql } from '@apollo/client'

export const ALL_BOOKS = gql`
  query {
    allBooks { 
      title 
      author
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
      author
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