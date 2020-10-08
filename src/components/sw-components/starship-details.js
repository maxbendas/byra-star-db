import {Record} from "../item-details/item-details";
import ItemDetails from "../item-details";
import React from "react";
import {SwapiServiceConsumer} from "../swapi-service-context";
import {withSwapiService} from "../hoc-helpers";

const StarshipDetails = (props) => {
    return (
        <ItemDetails {...props}>
            <Record field="model" label="Model"/>
            <Record field="length" label="Length"/>
            <Record field="costInCredits" label="Cost"/>
        </ItemDetails>
    )
};

const mapMethodsToProps = (swapiService) => {
    return {
        getData: swapiService.getStarship,
        getImageUrl: swapiService.getStarshipImage
    }
};

export default withSwapiService(StarshipDetails, mapMethodsToProps)
