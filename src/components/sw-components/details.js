import SwapiService from "../../services/swapi-service";
import {Record} from "../item-details/item-details";
import ItemDetails from "../item-details";
import React from "react";

const swapiService = new SwapiService()

const {
    getPerson,
    getStarship,
    getPersonImage,
    getStarshipImage,
    getPlanet,
    getPlanetImage
} = swapiService;

const PersonDetails = ({itemId}) => {
    return (
        <ItemDetails itemId={itemId}
                     getData={getPerson}
                     getImageUrl={getPersonImage}>
            <Record field="gender" label="Gender"/>
            <Record field="birthYear" label="Birth Year"/>
            <Record field="eyeColor" label="Eye Color"/>
        </ItemDetails>
    )
};

const PlanetDetails = ({itemId}) => {
    return(
        <ItemDetails itemId={itemId}
                     getData={getPlanet}
                     getImageUrl={getPlanetImage}>
            <Record field="population" label="Population"/>
            <Record field="rotationPeriod" label="Rotation Period"/>
            <Record field="diameter" label="Diameter"/>
        </ItemDetails>
    )
};

const StarshipDetails = ({itemId}) => {
    return(
        <ItemDetails itemId={itemId}
                     getData={getStarship}
                     getImageUrl={getStarshipImage}>
            <Record field="model" label="Model"/>
            <Record field="length" label="Length"/>
            <Record field="costInCredits" label="Cost"/>
        </ItemDetails>
    )
};

export {
    PersonDetails,
    PlanetDetails,
    StarshipDetails
}