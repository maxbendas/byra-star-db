import React, {Component} from 'react';

import './item-details.css';
import SwapiService from "../../services/swapi-service";
import Spinner from "../spinner";
import ErrorButton from "../error-button";

const Record = ({item, field, label})=>{
    return(
        <li className="list-group-item">
            <span className="term">{label}</span>
            <span>{field}</span>
        </li>
    )
}

export {
    Record
}

export default class ItemDetails extends Component {

    swapiService = new SwapiService()

    state = {
        item: {},
        loading: true
    }

    componentDidMount() {
        this.updateItem()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.itemId !== prevProps.itemId) {
            this.updateItem()
        }
    }

    onItemLoaded = (item) => {
        this.setState({item, loading: false})
    }

    updateItem() {
        const {itemId, getData, getImageUrl} = this.props
        if (!itemId) {
            return;
        }
        getData(itemId)
            .then((item) => {
                this.setState({
                    item,
                    loading: false,
                    image: getImageUrl(item)
                })
            })
    };

    render() {

        const {item, loading, image} = this.state;
        const record = React.Children
            .map(this.props.children, (child, idx)=>{
                return <li>{idx}</li>;
            });
        const spinner = loading ? <Spinner/> : null;
        const content = !loading ? <ItemView record={record}
                                             item={item}
                                             image={image}/> : null;

        if (!this.state.item) {
            return <span>Select a item from a list</span>
        }
        return (
            <div className="item-details card">
                {spinner}
                {content}
            </div>
        )
    }
}

const ItemView = ({item, image, record}) => {

    const {name, gender, birthYear, eyeColor} = item

    return (
        <React.Fragment>

            <img className="item-image"
                 src={image}
            alt="item"/>
            {/*`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`*/}
            <div className="card-body">
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    {record}
                </ul>
                <ErrorButton/>
            </div>

        </React.Fragment>
    )
}