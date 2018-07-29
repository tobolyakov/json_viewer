//Core
import React, {Component} from 'react'

//Components
import DropZon from '../DropZone'
import TreeDom from '../TreeDom'

// Instruments
import logo from './logo.svg'
import './styles.css'

export default class App extends Component {

    state = { file: null };

    handleDrop = file => this.setState(state => ({...state, file}));

    render () {
        const { file } = this.state;

        return (
            <div className="app">
                <header className="app-header">
                    <img src={logo} className="app-logo" alt="logo" />
                    <h1 className="app-title">JSON viewer</h1>
                </header>

                <main className="App-content">
                    <DropZon onDrop={this.handleDrop}>
                        { file && <TreeDom dataUrl={ file.preview }/> }
                    </DropZon>
                </main>
            </div>
        )
    }
};
