import React from 'react';
import PropTypes from 'prop-types';
import stackManager from './StackManager'

export default class StackAbstract extends React.Component {
    constructor(props){
        super(props);
        this.isMountStage = true;
        this.pushStackMessage(this.props.identifier,'Constructor', 'mount');
    }

    pushStackMessage(identifier, message, type, triggerNow){
        triggerNow = triggerNow === undefined ? false : triggerNow;
        stackManager.pushStackMessage(identifier,message, type, triggerNow);
    }

    componentWillReceiveProps(nextProps){
        this.pushStackMessage(nextProps.identifier, 'componentWillReceiveProps', 'update');
        this.isMountStage = false;
    }

    componentWillMount(){
        this.pushStackMessage(this.props.identifier, 'componentWillMount','mount');
    }


    shouldComponentUpdate(){
        this.pushStackMessage(this.props.identifier, 'shouldComponentUpdate' ,'update');
        return true;
    }

    componentWillUpdate(){
        this.pushStackMessage(this.props.identifier, 'componentWillUpdate', 'update');
    }

    render(){
        const type = this.isMountStage ? 'mount' : 'update';
        this.pushStackMessage(this.props.identifier, 'render', type);
    }

    componentDidMount(){
        this.pushStackMessage(this.props.identifier, 'componentDidMount', 'mount');
    }

    componentDidUpdate(){
        this.pushStackMessage(this.props.identifier, 'componentDidUpdate', 'update');
    }

    componentWillUnmount(){
        this.pushStackMessage(this.props.identifier, 'componentWillUnmount', 'unmount');
    }
}

StackAbstract.propTypes = {
    identifier: PropTypes.string
};


