import React, { Component } from 'react';
import {APIID} from './constant'
import Lodash from 'lodash'

class CityWeather extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cityWeather: ''
        }
    }

    componentDidMount() {
        let {match} = this.props;
        let cityId = match.params.id
        fetch('http://api.openweathermap.org/data/2.5/forecast?id='+cityId+'&units=metric&appid='+APIID+'')
          .then(res => res.json())
          .then(data => {
            this.setState({
              cityWeather: data
            })
          })
          
    }

    componentWillReceiveProps(nextProps) {
        let cityId = nextProps.match.params.id
        fetch('http://api.openweathermap.org/data/2.5/forecast?id='+cityId+'&units=metric&appid='+APIID+'')
          .then(res => res.json())
          .then(data => {
            this.setState({
                cityWeather: data
            })
          })
    }

    renderList(list) {
        return (
            <div>
                <ul>
                    {
                        Lodash.map(list, function(weather){
                            return <li>{weather.dt_txt} : {weather.weather[0].main}</li>
                        })
                    }
                </ul>
            </div>
        )
    }

    render() {
        let {cityWeather} = this.state
        let cityName = '';
        if (cityWeather)  cityName = cityWeather.city.name
        return(
            <div>
                <p>Weather of <b>{cityName}</b> in next few days</p>
                
                {
                    this.renderList(cityWeather.list)
                }
                
            </div>
        )
    }
}

export default CityWeather;