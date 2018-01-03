import React from 'react';
import './style.css';

export default class Blockquote extends React.Component {
    render() {
        return (
            <div className="blockquote">
                {this.props.children}
            </div>
        );
    }
}