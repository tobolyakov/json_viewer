//Core
import React, {Component, Fragment} from 'react'
import { string, object } from "prop-types";

// Components
import FileError from './error/index'
import Tree from './tree/index'

// Instuments
import './styles.css'

export default class TreeDom extends Component {
    static propTypes = {
        json:       object,
        dataUrl:    string,
    };

    constructor (props) {
        super(props);
        this.state = {};
        fetch(props.dataUrl)
            .then(response => {
                this.response = response.clone();
                return response.json();
            })
            .then(json => this.setState({json}))
            .catch(event => {
                if (event instanceof SyntaxError) {
                    return this.response
                        .text()
                        .then(raw => this.setState({
                            error: event.message,
                            raw
                        }))
                } else throw event
            })
    }

    render () {
        const { error, raw, json } = this.state;
        return (
            <Fragment>
                {error
                    ? <FileError {...{error, raw}}/>
                    : json
                        ? <Tree data={json}/>
                        : null
                }
            </Fragment>
        )
    }
}