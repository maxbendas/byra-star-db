import React, {Component} from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorBoundary from "../error-boundary/error-boundary";
import ErrorIndicator from "../error-indicator";
import {SwapiServiceProvider} from "../swapi-service-context";
import SwapiService from "../../services/swapi-service";
import DummySwapiService from "../../services/dummy-swapi-service";

import './app.css';
import {PeoplePage, PlanetPage, StarshipPage} from "../pages";


class App extends Component {

    state = {
        hasError: false,
        swapiService: new SwapiService()
    }

    onServiceChange = ()=>{
        this.setState(({swapiService})=>{
            const Service = swapiService instanceof SwapiService ?
                DummySwapiService : SwapiService;
            return{
                swapiService: new Service()
            }
        })
    }



    componentDidCatch(error, errorInfo) {
        this.setState({hasError: true})
    }

    render() {
        if (this.state.hasError) {
            return <ErrorIndicator/>
        }

        return (
            <ErrorBoundary>
                <SwapiServiceProvider value={this.state.swapiService}>
                <div className="stardb-app">
                    <Header onServiceChange={this.onServiceChange}/>
                    <RandomPlanet/>
                    <PeoplePage/>
                    <PlanetPage/>
                    <StarshipPage/>
                </div>
                </SwapiServiceProvider>
            </ErrorBoundary>
        );
    }
}

export default App;