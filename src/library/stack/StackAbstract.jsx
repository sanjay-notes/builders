import React from 'react';
import PropTypes from 'prop-types';
import StackManager from './StackManager'

export default class StackAbstract extends React.Component {
    constructor(props){
        super(props);
        this.isMountStage = true;
        this.pushStackMessage(this.props.identifier,'Constructor', 'mount', props.enable);
    }

    pushStackMessage(identifier, message, type, enable){
        if(enable){
            StackManager.pushStackMessage(identifier,message, type);
        }
    }

    componentWillReceiveProps(nextProps){
        this.pushStackMessage(nextProps.identifier, 'componentWillReceiveProps', 'update', nextProps.enable);
        this.isMountStage = false;
    }

    componentWillMount(){
        this.pushStackMessage(this.props.identifier, 'componentWillMount','mount', this.props.enable);
    }


    shouldComponentUpdate(){
        this.pushStackMessage(this.props.identifier, 'shouldComponentUpdate' ,'update', this.props.enable);
        return true;
    }

    componentWillUpdate(){
        this.pushStackMessage(this.props.identifier, 'componentWillUpdate', 'update', this.props.enable);
    }

    render(){
        const type = this.isMountStage ? 'mount' : 'update';
        this.pushStackMessage(this.props.identifier, 'render', type, this.props.enable);
    }

    componentDidMount(){
        this.pushStackMessage(this.props.identifier, 'componentDidMount', 'mount', this.props.enable);
    }

    componentDidUpdate(){
        this.pushStackMessage(this.props.identifier, 'componentDidUpdate', 'update', this.props.enable);
    }

    componentWillUnmount(){
        this.pushStackMessage(this.props.identifier, 'componentWillUnmount', 'unmount', this.props.enable);
    }
}

StackAbstract.propTypes = {
    identifier: PropTypes.string,
    enable: PropTypes.bool
};

StackAbstract.defaultProps = {
    enable: true
};
