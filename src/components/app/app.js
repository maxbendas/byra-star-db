import React, {Component} from 'react';
import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorBoundary from "../error-boundary/error-boundary";
import ErrorIndicator from "../error-indicator";
import {SwapiServiceProvider} from "../swapi-service-context";
import SwapiService from "../../services/swapi-service";
import DummySwapiService from "../../services/dummy-swapi-service";
import {BrowserRouter as Router, Route} from "react-router-dom";

import './app.css';
import {PeoplePage, PlanetPage, StarshipPage} from "../pages";
import PersonDetails from "../sw-components/person-details";
import StarshipDetails from "../sw-components/starship-details";


class App extends Component {

    state = {
        hasError: false,
        swapiService: new SwapiService()
    }

    onServiceChange = () => {
        this.setState(({swapiService}) => {
            const Service = swapiService instanceof SwapiService ?
                DummySwapiService : SwapiService;
            return {
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
                    <Router>
                        <div className="stardb-app">
                            <Header onServiceChange={this.onServiceChange}/>
                            <RandomPlanet/>
                            <Route path="/"
                                   render={() => <h2>Welcome to StarDB</h2>}
                                   exact/>

                            <Route path="/people" component={PeoplePage} exact/>
                            <Route path="/people/:id"
                                   render={({match}) => {
                                       const {id} = match.params;
                                       return <PersonDetails itemId={id}/>
                                   }}/>

                            <Route path="/planets" component={PlanetPage}/>
                            <Route path="/starships" component={StarshipPage} exact/>
                            <Route path="/starships/:id"
                                   render={({match}) => {
                                       const {id} = match.params;
                                       return <StarshipDetails itemId={id}/>
                                   }}/>

                        </div>
                    </Router>
                </SwapiServiceProvider>
            </ErrorBoundary>
        );
    }
}

export default App;