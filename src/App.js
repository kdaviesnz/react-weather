import React, { Component } from 'react';
import './App.css';
import PropTypes from 'prop-types';


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            city:"Auckland",
            weather:""
        }
    }

    componentDidMount() {
        this.fetchWeather();
    }

    fetchWeather() {
        fetch('http://api.openweathermap.org/data/2.5/weather?q=' + this.state.city + '&APPID=8acf7ec0bbf3ac88c92ea572a7de348a')
            .then(response => response.json())
            .then(weatherObj => {
                const weather = 'Weather for ' + this.state.city + ': ' + weatherObj.weather[0].description;
                this.setState({
                    weather
                })
            })
    }

    render() {

        const City = (props) =>
            <select onChange={props.onChange} value={props.currentCity}>
                <option value="Auckland">Auckland</option>
                <option value="Berlin">Berlin</option>
                <option value="Los Angeles">Los Angeles</option>
                <option value="London">London</option>
                <option value="New York">New York</option>
                <option value="Paris">Paris</option>
                <option value="San Francisco">San Francisco</option>
                <option value="Sydney">Sydney</option>
            </select>


        const changeCity = (e) => {
            this.setState({
                    city:e.target.options[e.target.selectedIndex].value,
                    weather:""
                }
            );
        }

        const getWeather = () => {
            console.log(this.state.city);
            console.log("Got the weather!");
            this.fetchWeather();
        };

        const Button = (props) => <button onClick={props.onClick}>Get the weather!</button>;
        const WeatherDetails = (props) => <p>{props.details}</p>
        const currentCity = this.state.city;

        return (
            <div className="App">
                <p>
                    <City onChange={changeCity} currentCity={currentCity} />
                </p>
                <Button onClick={getWeather}/>
                <WeatherDetails details={this.state.weather}/>
            </div>
        );
    }
}

App.propTypes = {
    city:  PropTypes.string,
    weather: PropTypes.string
}


export default App;
