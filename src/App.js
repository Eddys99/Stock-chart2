import React, { useState } from 'react';
import FetchStock from './stockApp';
import ReactDOM from 'react-dom';
import './App.css';

let itemLsit = [];

function App() {
  const [symbol, setSymbol] = useState('');

  const changeSearchSymbol = () => {
    setSymbol('');
    setSymbol(document.getElementById("input").value);
  }

  const searchByFavSymbol = (element) => {
    setSymbol('');
    setSymbol(element.currentTarget.id);
  }

  const addSymbolToFavList = () => {
    itemLsit.push(document.getElementById("input").value);
    let objectList = itemLsit.map((element) => 
      <h4 key = { element } id = { element } onClick = { searchByFavSymbol }> { element } </h4>
    )
    ReactDOM.render(
      objectList,
      document.getElementById("favList")
    );
  }
  
  return (
    <div>
      <div id = "inputSymbol">
        <h4> Introduce the desired stock symbol </h4>
        <input id = "input"></input>
        <button className = "btn btn-primary" onClick = { changeSearchSymbol }> Search </button>
        <button className = "btn btn-primary" onClick = { addSymbolToFavList }> Add to favorite </button>
      </div>
      <div id = "stockChart">
        <FetchStock symbol = { symbol }/>
      </div>
      <h2> Favorite List </h2>
      <hr></hr>
      <div id = "favList">
      </div>
    </div>
  );
}

export default App;