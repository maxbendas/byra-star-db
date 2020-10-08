import React from "react";
import SwapiService from "../../services/swapi-service";
import {withData, withSwapiService} from "../hoc-helpers";
import ItemList from "../item-list";

const swapiService = new SwapiService();

const {
    getAllPeople,
    getAllPlanets,
    getAllStarships
} = swapiService;

const withChildFunction = (Wrapped, fn) => {
    return (props) => {
        return (
            <Wrapped {...props}>
                {fn}
            </Wrapped>
        )
    }
}

const renderName = ({name}) => <span>{name}</span>;
const renderNameAndModel = ({name, model}) => <span>{name}({model})</span>;

const mapPersonMethodsToProps = (swapiService) => {
    return {
        getData: swapiService.getAllPeople
    };
};

const mapPlanetMethodsToProps = (swapiService) => {
    return {
        getData: swapiService.getAllPlanets
    };
};

const mapStarshipMethodsToProps = (swapiService) => {
    return {
        getData: swapiService.getAllStarships
    };
};

const PersonList = withSwapiService(withData(
    withChildFunction(ItemList, renderName)), mapPersonMethodsToProps);

const PlanetList = withSwapiService(withData(
    withChildFunction(ItemList, renderName)), mapPlanetMethodsToProps);

const StarshipList = withSwapiService(withData(
    withChildFunction(ItemList, renderNameAndModel)), mapStarshipMethodsToProps);

export {
    PersonList,
    PlanetList,
    StarshipList
};

