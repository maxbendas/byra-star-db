import {Record} from "../item-details/item-details";
import ItemDetails from "../item-details";
import React from "react";
import {withSwapiService} from "../hoc-helpers";

const PersonDetails = (props) => {
    return (
                        <ItemDetails {...props}>
                            <Record field="gender" label="Gender"/>
                            <Record field="birthYear" label="Birth Year"/>
                            <Record field="eyeColor" label="Eye Color"/>
                        </ItemDetails>
    )
};

const mapMethodsToProps = (swapiService) =>{
    return {
        getData: swapiService.getPerson,
        getImageUrl: swapiService.getPersonImage
    }
}

export default withSwapiService(PersonDetails, mapMethodsToProps);