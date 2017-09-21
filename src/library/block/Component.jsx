import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

export default class Block extends React.Component {
    render() {
        const htmlType = this.props.htmlType;
        const borderStyle = this.props.color ? {borderColor:this.props.color} : null;
        const htmlTypeStyle = this.props.color ? {backgroundColor:this.props.color} : null;
        const className = this.props.className ? `block-container ${this.props.className}` : 'block-container';
        return (
            <div className="elem" style={borderStyle}>
                <span className="label" style={htmlTypeStyle}>&lt;{htmlType}></span>
                    <div className={className}>{this.props.children}</div>
                <span className="endlabel" style={htmlTypeStyle}>&lt;/{htmlType}></span>
            </div>
        );
    }
}

Block.propTypes = {
    htmlType: PropTypes.string,
    color: PropTypes.string
};

Block.defaultProps = {
    htmlType: 'div'
};

