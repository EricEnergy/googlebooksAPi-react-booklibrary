import React, { useState } from 'react';
import API from '../../utils/API'
import { List, ListItem } from "../List2";
import book from "./booky.png"
import Jumbotron from "../Jumbotron";


export default function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);

  function productSearch(e) {
    e.preventDefault();
    API.searchBook(searchTerm)
      .then(res => {
        setProducts(res.data);
      });
  }


  function myList(value) {
    var selectName = products.filter(a => a.id === value)

    API.saveBook({
      id: selectName[0].id,
      title: selectName[0].volumeInfo.title,
      author: selectName[0].volumeInfo.authors[0],
      image: selectName[0].volumeInfo.imageLinks.thumbnail,
      synopsis: selectName[0].volumeInfo.description
    })
  }

  // title: { type: String, required: true },
  // author: { type: String, required: true },
  // image: { type: String, required: true },
  // link: String,
  // synopsis: String,

  function beast(prod) {
    console.log(prod)
    if (!prod.volumeInfo.imageLinks) {
      return (book)
    } else { 
      return (prod.volumeInfo.imageLinks.smallThumbnail) 
    }
  }

  return (
    <section>
      <Jumbotron>
        <h3>Book Search</h3>
      <form >
        <input id="searchBar" name="searchBar" type="search" onChange={(e) => setSearchTerm(e.target.value)} />
        <label htmlFor="searchBar"> Search </label>
        <button className="btn btn-primary" style={{ marginLeft: "20px" }} type="submit" onClick={(e) => productSearch(e)}>Search</button>
      </form>
      </Jumbotron>
      <br></br>
      <div>
      <h1>Results</h1>

      <List>
        {products.map(prod => (
          //  console.log(prod.volumeInfo.imageLinks.smallThumbnail),
          <ListItem key={prod.id}>
            <strong>
              <img alt="logo" style={{ width: 50, height: 50, overflow: 'hidden', resizeMode: 'contain' }} src={beast(prod)}></img>  {prod.volumeInfo.title}
            </strong>
            <br />
            <br />
            <div style={{ display: "flex" }}>
              <button className="btn btn-primary" style={{ marginLeft: "auto" }} onClick={() => myList(prod.id)}> Add to List</button>
            </div>
          </ListItem>
        ))}
      </List>
      </div>
    </section>
  );
}
