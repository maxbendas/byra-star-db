import React, {Component} from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ItemDetails from '../item-details';
// import ItemList from '../item-list';

import './app.css';
import ErrorIndicator from "../error-indicator";
import SwapiService from "../../services/swapi-service";
import Row from "../row/row";
import {Record} from "../item-details/item-details";
import ItemList from "../item-list";

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

        const { getPerson,
            getStarship,
            getPersonImage,
            getStarshipImage,
            getAllPeople,
            getAllPlanets } = this.swapiService;


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
            <div className="stardb-app">
                <Header/>
                <ItemList
                    getData={getAllPeople}
                    onItemSelected={() => {}}>

                    { ({name}) => <span>{name}</span> }
                </ItemList>

                <ItemList
                    getData={getAllPlanets}
                    onItemSelected={() => {}}>

                    { ({name}) => <span>{name}</span> }
                </ItemList>

                {/*<Row*/}
                {/*    left={personDetails}*/}
                {/*    right={starshipDetails}/>*/}

                {/*{planet}*/}
                {/*<div className="row mb2 button-row">*/}
                {/*    <button*/}
                {/*        className="toggle-planet btn btn-warning btn-lg"*/}
                {/*        onClick={this.toggleRandomPlanet}>*/}
                {/*        Toggle Random Planet*/}
                {/*    </button>*/}
                {/*    <ErrorButton/>*/}
                {/*</div>*/}

                {/*<PeoplePage/>*/}

                {/*<div className="row mb2 people-page">*/}
                {/*    <div className="col-md-6">*/}
                {/*        <ItemList onItemSelected={this.onPersonSelected}*/}
                {/*                  getData={this.swapiService.getAllPlanets}*/}
                {/*                  renderItem={(item) => item.name}/>*/}
                {/*    </div>*/}
                {/*    <div className="col-md-6">*/}
                {/*        <ItemDetails personId={this.state.selectedPerson}/>*/}
                {/*    </div>*/}
                {/*</div>*/}

                {/*<div className="row mb2 people-page">*/}
                {/*    <div className="col-md-6">*/}
                {/*        <ItemList onItemSelected={this.onPersonSelected}*/}
                {/*                  getData={this.swapiService.getAllStarships}*/}
                {/*                  renderItem={(item) => item.name}/>*/}
                {/*    </div>*/}
                {/*    /!*<div className="col-md-6">*!/*/}
                {/*    /!*    <ItemDetails personId={this.state.selectedPerson}/>*!/*/}
                {/*    /!*</div>*!/*/}
                {/*</div>*/}
            </div>
        );
    }
}

export default App;