//Core
import React, { Component, Fragment } from 'react'

// Components
import Property from '../property/index'

// Instuments
import './styles.css'

export const properties_limit = 3,
    properties = '...',
    property_comma = ',',
    treeType = {
        array: '[]',
        object: '{}'
    };

export default class Tree extends Component {

    static defaultProps = {
        depth: 0,
        hideKey: false
    };

    constructor (props) {
        super(props);
        this.state = { open: !props.depth }
    }

    isObject = value => typeof value === 'object' && value != null;

    toggle = () => this.setState(({open}) => ({open: !open}));

    render () {
        const { open } = this.state;
        const { name, data, depth, last, compact, hideKey } = this.props;
        const type = data instanceof Array ? 'array' : 'object';
        const keys = Object.keys(data);
        console.log(depth);

        const _renderChildren = (compact, sliced) => (key, index, source) => {

            const Component = this.isObject(data[key]) ? Tree : Property;

            return (
                <Component
                    compact={ compact }
                    name={ key }
                    key={ key }
                    data={ data[key] }
                    depth={ depth + 1 }
                    last={ index === source.length - 1 && !sliced }
                    hideKey={ source.length === 1 }
                />
            )
        };

        return compact ? (
            <span className="object">
                {!hideKey && <span className="object-name">{name}</span>}
                {treeType[type][0] + (keys.length && properties) + treeType[type][1]}
                {!last && property_comma}
            </span>
        ) : (
            <div className={!depth && 'tree-root'}>
                <button className="tree-header" onClick={this.toggle} disabled={!keys.length || !depth}>
                    {!!depth && <span className={`object-arrow ${open && 'object-arrow--open'}`}/>}
                    {name && <span className="object-name">{name}</span>}
                    {!!keys.length && <span className="object-counter">{keys.length}</span>}
                    {treeType[type][0]}
                    {!open &&
                        <Fragment>
                            {keys.slice(0, properties_limit).map(_renderChildren(true, keys.length > properties_limit))}
                            {keys.length > properties_limit && <span>{properties}</span>}
                            {treeType[type][1]}
                            {!last && property_comma}
                        </Fragment>
                    }
                </button>
                {open && (
                    <Fragment>
                        <div className="tree-content">
                            {keys.map(_renderChildren())}
                        </div>
                        <div className="tree-footer">
                            {treeType[type][1]}
                            {!last && !!depth && property_comma}
                        </div>
                    </Fragment>
                )}
            </div>
        )
    }
}
