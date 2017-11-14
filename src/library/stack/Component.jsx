import React from 'react';
import stackManager from './StackManager';
import './style.css';

export default class Stack extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            renderLater:true,
            stackStep: 0
        };
        this.renderLater = this.renderLater.bind(this);
        this.decrementStackStep = this.decrementStackStep.bind(this);
        this.incrementStackStep = this.incrementStackStep.bind(this);
        this.handleShowAllSteps = this.handleShowAllSteps.bind(this);
        stackManager.hookCallback(this.renderLater)
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            renderLater:true
        })
    }

    renderLater(){
        this.setState({
            renderLater:false
        })
    }

    incrementStackStep(){
        const stepValue = this.state.stackStep < stackManager.getOrder() ?  this.state.stackStep + 1 :  this.state.stackStep;
        this.setState({
            stackStep:  stepValue
        })
    }

    decrementStackStep(){
        const stepValue = this.state.stackStep > 1 ?  this.state.stackStep - 1 :  1;

        this.setState({
            stackStep:  stepValue
        })
    }

    handleShowAllSteps(){
        this.setState({
            stackStep:  0
        })
    }

    clearAllSteps(){
        stackManager.clearStacks(true);
    }

    componentDidMount(){
        stackManager.trigger();
    }

    render(){
        let ui = null;

        const {renderLater, stackStep} = this.state;

        if(!renderLater){

            const stacks = stackManager.getStacks();
            const stackIds = Object.keys(stacks);
            ui = stackIds.map((id, index)=>{
                const stack = stacks[id];
                return <div key={index} className="stack-container-item">
                    <h4>{id}</h4>
                    <ul>
                        {stack.map((stackObject, stackIndex)=>{
                            if(stackStep > 0 && stackStep < stackObject.order){
                                return null;
                            }
                            const message = stackObject.message;
                            const type = "[" + stackObject.type + "]";
                            const order = stackObject.order + ". ";
                            return (<li  key={stackIndex}>
                                <div className="stack-item">
                                    <div className="stack-item-order">{order}</div>
                                    <div className="stack-item-type">{type}</div>
                                    <div className="stack-item-message">{message}</div>
                                </div>
                            </li>);
                        })}
                    </ul>
                </div>
            });
        }

        return (<div className="stack-container">
            <div className="stack-controller-container">
                <button onClick={this.decrementStackStep}>Prev step</button>
                <div>
                 <button onClick={this.handleShowAllSteps}>Show All steps</button>
                 <button onClick={this.clearAllSteps}>Clear</button>
                </div>
                <button onClick={this.incrementStackStep}>Next step</button>
            </div>

            <div className="stack-message-container">
                {ui}
            </div>
        </div>)
    }
}


