import React, { useState, useEffect } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";
import book from "../components/Searchfield/booky.png"

function Books() {
  const [books, setBooks] = useState([])
  const [formObject, setFormObject] = useState({})

  useEffect(() => {
    loadBooks()
  }, [])

  function loadBooks() {
    API.getBooks()
      .then(res =>
        setBooks(res.data)
      )
      .catch(err => console.log(err));
  };


  function deleteBook(id) {
    API.deleteBook(id)
      .then(res => loadBooks())
      .catch(err => console.log(err));
  }

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({ ...formObject, [name]: value })
  };

  function handleFormSubmit(event) {
    event.preventDefault();
    if (formObject.title && formObject.author) {
      API.saveBook({
        title: formObject.title,
        author: formObject.author,
        synopsis: formObject.synopsis
      })
        .then(res => loadBooks())
        .catch(err => console.log(err));
    }
  };

  return (
    <Container fluid>
      <Row>
        <Col size="md-1">
        </Col>
        <Col size="md-10">
          <Jumbotron>
            <h1>(React) Google Books Search</h1>
            <h4>Search for and Save Books of Interest</h4>
          </Jumbotron>
          {books.length ? (
            <List>
              {books.map(book => (
                <ListItem key={book._id}>
                  <DeleteBtn onClick={() => deleteBook(book._id)} />
                  <strong>
                    <img alt="logo" style={{ width: 50, height: 50, overflow: 'hidden', resizeMode: 'contain' }} src={book.image}></img>
                    <p>Book Title: {book.title}</p>
                    <p>By: {book.author}</p>
                    <p>Description: {book.synopsis}</p>

                  </strong>
                </ListItem>
              ))}
            </List>
          ) : (
              <h3>No Results to Display</h3>
            )}
        </Col>
        <Col size="md-1">
        </Col>
      </Row>
    </Container>
  );
}


export default Books;
