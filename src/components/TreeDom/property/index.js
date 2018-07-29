//Core
import React from 'react';

// Components
import { property_comma, properties } from '../tree/';

// Instruments
import './styles.css';

const lengthLimit = 10;

const Property = ({ name, data, compact, last }) => {

    const Tag = compact ? 'span' : 'div';

    const type = typeof data;

    const _getType = () => {
        if (type === 'boolean'){
            if (data === true) {
                return "true"
            } else {
                return "false"
            }
        } else if (data === null) {
            return "null"
        } else {
            return (
                compact && type === 'string' && data.length > lengthLimit ? data.slice(0, lengthLimit) + properties : data
            )
        }
    };

    return (
        <Tag className={`property-item`}>
            <span className="property-name">{name}</span>
            <span className={ `property-${type}` }>
                { _getType()}
            </span>
            {!last && property_comma}
        </Tag>
    )
};

export default Property
