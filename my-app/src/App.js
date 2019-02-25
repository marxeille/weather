import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import cityList from './city.list.json'
import {APIID} from './constant'
import Lodash from 'lodash'

class App extends Component {

  constructor(props) {
    super(props);
        this.state = {
          cityWeather : ''
        }
  }

  componentDidMount() {

    let cities = Lodash.shuffle(cityList).slice(0,10); 

    let cityIds = '';
    let j = 0;

    cities.map(city => {
      if (j == 0) {
        cityIds += city.id; 
      } else {
        cityIds += ',' + city.id; 
      }
      j++;
    });
    fetch('http://api.openweathermap.org/data/2.5/group?id='+cityIds+'&units=metric&appid='+APIID+'')
      .then(res => res.json())
      .then(data => {
        this.setState({
          cityWeather: data.list
        })
      })
      
  }
  
  render() {
    let {cityWeather}  = this.state;
    return (
      <div className="App">
        <header className="App-header"> 
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
