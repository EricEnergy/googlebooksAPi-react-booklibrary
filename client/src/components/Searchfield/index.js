import React, { useState } from 'react';
import API from '../../utils/API'
import { List, ListItem } from "../List2";
import book from "./booky.png"


export default function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);

  function productSearch(e) {
    e.preventDefault();
    console.log(searchTerm)
    API.searchBook(searchTerm)
      .then(res => {
        setProducts(res.data);
      });
    console.log(products)
  }


  function myList(value) {
    console.log(value)
    var selectName = products.filter(a => a.id === value)

    API.saveBook({
      id: selectName[0].id,
      title: selectName[0].volumeInfo.title,
      author: selectName[0].volumeInfo.authors[0],
      image: selectName[0].volumeInfo.imageLinks.smallThumbnail,
      synopsis: selectName[0].volumeInfo.description
    })
    console.log(selectName)
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
      <form >
        <input id="searchBar" name="searchBar" type="search" onChange={(e) => setSearchTerm(e.target.value)} />
        <label htmlFor="searchBar"> Search </label>
        <button className="btn btn-primary" style={{ marginLeft: "20px" }} type="submit" onClick={(e) => productSearch(e)}>Search</button>
      </form>
      <br></br>
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

    </section>
  );
}
