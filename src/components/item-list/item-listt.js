import React, {Component} from 'react';
import './item-list.css';
import SwapiService from "../../services/swapi-service";
import withData from "../hoc-helpers";

const ItemList = (props) => {
    const {data, onItemSelected, children: renderLabel} = props;

    const items = data.map((item, idx) => {
        const {id} = item;
        const label = renderLabel(item);
        if (idx>4){
            return
        }
        return (
            <li className="list-group-item"
                key={id}
                onClick={() => onItemSelected(id)}>
                {label}
            </li>
        )
    })

    return (
        <ul className="item-list list-group">
            {items}
        </ul>
    );
}

export default ItemList;


