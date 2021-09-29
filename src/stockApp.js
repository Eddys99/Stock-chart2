import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';

function FetchStock({symbol}) {
    const [xValues, setX] = useState([]);
    const [yValues, setY] = useState([]);
    useEffect(() => {
        let apiKey = "K5EV9RG40Q8MPVZT";
        let API_Call = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${symbol}&outputsize=full&apikey=${apiKey}`;
        let stockChartXValues = [], stockChartYValues = [];
        fetch(API_Call)
            .then(
                function(response) {
                    return response.json();
                }
            )
            .then(
                function(data) {
                    for (var key in data['Time Series (Daily)']) {
                        stockChartXValues.push(key);
                        stockChartYValues.push(data['Time Series (Daily)'][key]['1. open']);
                    }
                    setX(stockChartXValues);
                    setY(stockChartYValues);
                }
            )
    }, [symbol] );
    return (
        <Plot
            data = {[{
                x: xValues,
                y: yValues,
                type: 'scatter',
                mode: 'lines+markers',
                marker: {color: 'red'},
            }]}
            layout ={{width: 960, height: 720, title: symbol + ' stock'}}
        />
    );
}

export default FetchStock;