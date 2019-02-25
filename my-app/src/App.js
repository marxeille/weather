import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import cityList from './city.list.json'
import CityWeather from './CityWeather' 
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
    console.log(cityWeather);
    return (
      <div className="App">
        <div className="content">
        {
          <Router>
          <div>
          {Object.keys(cityWeather).map((key) => (
            <ul>
              <h3><Link to={'/' + cityWeather[key].name.toLowerCase().replace(/ /g,'') + '/' + cityWeather[key].id}>{cityWeather[key].name}</Link></h3>
              <li> Weather: {cityWeather[key].weather[0].main} - {cityWeather[key].weather[0].description} </li>
            </ul>
          ))}
          <Route path="/:city/:id" component={CityWeather} />
          </div>
          </Router>
        }
        </div>
      </div>
    );
  }
}

export default App;
