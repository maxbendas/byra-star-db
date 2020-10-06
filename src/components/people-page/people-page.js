import React, {Component} from 'react';
import ItemList from "../item-list";
import ItemDetails from "../item-details";
import ErrorIndicator from "../error-indicator";
import SwapiService from "../../services/swapi-service";
import Row from "../row/row";
import ErrorBoundary from "../error-boundary/error-boundary";

class PeoplePage extends Component {
    swapiService = new SwapiService();
    state = {
        selectedPerson: 3
    }

    onPersonSelected = (id) => {
        this.setState({
            selectedPerson: id
        })
    }

    render() {
        if (this.state.hasError) {
            return <ErrorIndicator/>
        }

        const itemList = (
            <ItemList onItemSelected={this.onPersonSelected}
                      getData={this.swapiService.getAllPeople}>
                {(i) => `${i.name}(${i.birthYear})`}
            </ItemList>
        )

        const personDetails = (
            <ErrorBoundary>
            <ItemDetails personId={this.state.selectedPerson}/>
            </ErrorBoundary>
        )

        return (

                <Row left={itemList} right={personDetails}/>

        );
    }
}

export default PeoplePage;