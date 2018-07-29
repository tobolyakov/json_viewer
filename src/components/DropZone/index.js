//Core
import React, {Component, Fragment} from 'react'
import Dropzone from 'react-dropzone'

// Instruments
import './styles.css'

export default class DropZone extends Component {
    state = {
        active: false,
    };

    onDragEnter = () => this.setState({ active: true });

    onDragLeave = () => this.setState({ active: false });

    onDrop = (accepted, rejected) => accepted.length && this.props.onDrop(accepted[0]) && this.setState({ accepted, rejected });

    render () {
        const { active } = this.state;
        const { children } = this.props;

        return (
            <Dropzone
                onDrop={ this.onDrop }
                onDragEnter={ this.onDragEnter }
                onDragLeave={ this.onDragLeave }
                accept="application/json"
                className={`dropzone ${children && 'dropzone--children'}`}
                activeClassName="dropzone--active"
                acceptClassName="dropzone__overlay--accept"
                rejectClassName="dropzone__overlay--reject"
                disableClick
                key={children && children.props.dataUrl}
            >
                {
                    ({isDragActive, isDragReject, acceptedFiles, rejectedFiles}) => {
                        let content = 'Try dropping some json here.';

                        if (isDragActive) {
                            content = "This file is authorized"
                        } else if (isDragReject) {
                            content = "This file is not authorized";
                        } else if (acceptedFiles.length || rejectedFiles.length) {
                            content = `Accepted ${acceptedFiles.length}, Rejected ${rejectedFiles.length} files`;
                        }

                        return (
                            <Fragment>
                                {children || content}
                                <div className={`dropzone__overlay ${active && 'dropzone__overlay--active'}`}>
                                    {content}
                                </div>
                            </Fragment>
                        )
                    }
                }
            </Dropzone>
        )
    }
}