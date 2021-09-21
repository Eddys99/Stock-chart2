import React from 'react';
import Plot from 'react-plotly.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import ReactDOM from 'react-dom';

let symbol;
let favoriteStocksSymbols = [];

class Stock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stockChartXValues: [],
      stockChartYValues: []
    };
  };

  searchThis() {
    symbol = document.getElementById('search').value;
    this.fetchStock();
  }

  favList() {
    let inputValue = document.getElementById('search').value;
    if (inputValue !== '') {
      favoriteStocksSymbols.push(inputValue);
    }
    let favListItems = favoriteStocksSymbols.map((element) =>
      <h4 key = { element } id = { element } onClick = { this.searchFavorite.bind(this) }> { element } </h4>
    );
    ReactDOM.render(
      favListItems,
      document.getElementById("favList")
    )
  }

  searchFavorite = (favElement) => {
    symbol = favElement.currentTarget.id;
    this.fetchStock();
  }

  fetchStock() {
    const pointerToThis = this;
    let API_Call = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${symbol}&outputsize=full&apikey=K5EV9RG40Q8MPVZT`;
    let stockChartXValuesFunction = [];
    let stockChartYValuesFunction = [];

    fetch(API_Call)
      .then(
        function(response) {
          return response.json();
        }
      )
      .then(
        function(data) {
          for (var key in data['Time Series (Daily)']) {
            stockChartXValuesFunction.push(key);
            stockChartYValuesFunction.push(data['Time Series (Daily)'][key]['1. open']);
          }
          pointerToThis.setState({
            stockChartXValues: stockChartXValuesFunction,
            stockChartYValues: stockChartYValuesFunction
          });
        }
      )
  }

  render() {
    return (
      <div>
        <div id = "buttons">
          <h2> Stock Chart </h2>
          <hr></hr>
          <br></br>
          <h4> Introduce stock symbol </h4>
          <input type = "text" id = "search" />
          <Button variant="primary" onClick = {this.searchThis.bind(this)}> Search </Button>
          <Button variant="primary" onClick = {this.favList.bind(this)}> Add to favorite </Button>
        </div>
        <Plot
          data = {[
            {
              x: this.state.stockChartXValues,
              y: this.state.stockChartYValues,
              type: 'scatter',
              mode: 'lines+markers',
              marker: {color: 'red'},
            }
          ]}
          layout ={{width: 960, height: 720, title: symbol + ' stock'}}
        />
      <br></br>
      <h2> Favorites list </h2>
      <hr></hr>
      <div id = "favList">
      </div>
      </div>
    )
  }
}

export default Stock;