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
        <div className="content">
        {
          Object.keys(cityWeather).map((key) => (
            <ul>
              <caption> {cityWeather[key].name} </caption>
              <li> Weather: {cityWeather[key].weather[0].main} - {cityWeather[key].weather[0].description} </li>
            </ul>
          ))
        }
        </div>
      </div>
    );
  }
}

export default App;
