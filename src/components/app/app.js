import React, {Component} from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ItemDetails from '../item-details';

import './app.css';
import ErrorIndicator from "../error-indicator";
import SwapiService from "../../services/swapi-service";
import DummySwapiService from "../../services/dummy-swapi-service";
import {SwapiServiceProvider} from "../swapi-service-context";
import {Record} from "../item-details/item-details";

import {PersonList, StarshipList, PlanetList, PlanetDetails, PersonDetails, StarshipDetails} from "../sw-components";
import ErrorBoundary from "../error-boundary/error-boundary";


class App extends Component {

    swapiService = new SwapiService();

    state = {
        showRandomPlanet: true,
        selectedPerson: 5,
        hasError: false
    }

    toggleRandomPlanet = () => {
        this.setState((state) => {
            return {
                showRandomPlanet: !state.showRandomPlanet
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
        const {showRandomPlanet} = this.state
        const planet = showRandomPlanet ? <RandomPlanet/> : null;

        const {
            getPerson,
            getStarship,
            getPersonImage,
            getStarshipImage,
            getAllPeople,
            getAllPlanets
        } = this.swapiService;


        const personDetails = (
            <ItemDetails itemId={11}
        getData={getPerson}
        getImageUrl={getPersonImage}>
            <Record field="gender" label="Gender"/>
            <Record field="birthYear" label="Birth Year"/>
            <Record field="eyeColor" label="Eye Color"/>
            </ItemDetails>
        )

        const starshipDetails = (
            <ItemDetails itemId={10}
                         getData={getStarship}
                         getImageUrl={getStarshipImage}>
                <Record field="model" label="Model"/>
                <Record field="length" label="Length"/>
                <Record field="costInCredits" label="Cost"/>
            </ItemDetails>
        )

        return (
            <ErrorBoundary>
                <SwapiServiceProvider value={this.swapiService}>
                <div className="stardb-app">
                    <Header/>
                    <PersonDetails itemId={10}/>
                    <PlanetDetails itemId={10}/>
                    <StarshipDetails itemId={10}/>
                    <PersonList/>
                    <StarshipList/>
                    <PlanetList/>
                </div>
                </SwapiServiceProvider>
            </ErrorBoundary>
        );
    }
}

export default App;