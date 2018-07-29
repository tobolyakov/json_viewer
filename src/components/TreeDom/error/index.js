//Core
import React from 'react';

// Instruments
import './styles.css';

const limit = 15;

const FileError = ({ error, raw }) => {
    const index = +error.match(/\d+$/)[0];
    const isNearStart = index < limit;
    const isNearEnd = index + limit > raw.length;

    return (
        <div className="file-error">
            <p className="message">{ error }</p>
            <p className="code">
                { isNearStart ? null : '...' }
                { index && raw.slice(isNearStart ? 0 : index - limit, index - 1) }
                <span>{ raw[index] }</span>
                { index < raw.length - 1 && raw.slice(index + 1, isNearEnd ? raw.length : index + limit) }
                { isNearEnd ? null : '...' }
            </p>
        </div>
    )
};

export default FileError;
