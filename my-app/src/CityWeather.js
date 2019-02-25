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
        console.log(cityId);
        fetch('http://api.openweathermap.org/data/2.5/forecast?id='+cityId+'&units=metric&appid='+APIID+'')
          .then(res => res.json())
          .then(data => {
              console.log(data)
            // this.setState({
            //   cityWeather: data.list
            // })
          })
          
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps.match.params.id);
        let cityId = nextProps.match.params.id
        fetch('http://api.openweathermap.org/data/2.5/forecast?id='+cityId+'&units=metric&appid='+APIID+'')
          .then(res => res.json())
          .then(data => {
              console.log(data)
            // this.setState({
            //   cityWeather: data.list
            // })
          })
    }

    render() {
        let {match} = this.props;
        return(
            <div>
                <p>{match.params.city}</p>
                <p>{match.params.id}</p>
            </div>
        )
    }
}

export default CityWeather;