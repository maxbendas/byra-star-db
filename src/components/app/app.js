import React, {Component} from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ItemList from '../item-list';
import PersonDetails from '../person-details';

import './app.css';
import ErrorButton from "../error-button";
import ErrorIndicator from "../error-indicator";
import PeoplePage from "../people-page";
import SwapiService from "../../services/swapi-service";

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
        const planet = showRandomPlanet ? <RandomPlanet/> : null

        return (
            <div>
                <Header/>
                {planet}
                <div className="row mb2 button-row">
                    <button
                        className="toggle-planet btn btn-warning btn-lg"
                        onClick={this.toggleRandomPlanet}>
                        Toggle Random Planet
                    </button>
                    <ErrorButton/>
                </div>
                <PeoplePage/>

                <div className="row mb2 people-page">
                    <div className="col-md-6">
                        <ItemList onItemSelected={this.onPersonSelected}
                        getData={this.swapiService.getAllPlanets}/>
                    </div>
                    <div className="col-md-6">
                        <PersonDetails personId={this.state.selectedPerson}/>
                    </div>
                </div>
                <div className="row mb2 people-page">
                    <div className="col-md-6">
                        <ItemList onItemSelected={this.onPersonSelected}
                                  getData={this.swapiService.getAllStarships}/>
                    </div>
                    <div className="col-md-6">
                        <PersonDetails personId={this.state.selectedPerson}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;