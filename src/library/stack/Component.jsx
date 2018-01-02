import React from 'react';
import stackManager from './StackManager';
import './style.css';

export default class Stack extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			renderLater:true,
			stackStep: 0,
			displayAnimationFrame: stackManager.showAnimationFrame
		};
		this.renderLater = this.renderLater.bind(this);
		this.decrementStackStep = this.decrementStackStep.bind(this);
		this.incrementStackStep = this.incrementStackStep.bind(this);
		this.handleShowAllSteps = this.handleShowAllSteps.bind(this);
		this.toggleAnimationFrame = this.toggleAnimationFrame.bind(this);
		stackManager.hookCallback(this.renderLater)
		if(props.clear){
			this.clearAllSteps();
		}
	}

	componentWillReceiveProps(nextProps){
		if(nextProps.clear){
			this.clearAllSteps();
		}
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

	toggleAnimationFrame(){
		this.setState({
			displayAnimationFrame:  stackManager.toggleAnimationFrame()
		})
	}

	componentDidMount(){
		stackManager.trigger();
	}

	renderStackItem(stackObject, includeSpace, index){
		const message = stackObject.message;
		const type = "[" + stackObject.type + "]";
		const order = stackObject.order + ". ";

		const styleObject = {};
		if(stackObject.type === 'event'){
			styleObject.color = "grey";
		}

		let spaceUI = null;
		if(includeSpace){
			spaceUI = <div style={{marginBottom:"8px"}}></div>
        }

		return (
            <li  key={index}>
                {spaceUI}
                <div className="stack-item" style={styleObject}>
                    <div className="stack-item-order">{order}</div>
                    <div className="stack-item-type">{type}</div>
                    <div className="stack-item-message">{message}</div>
                </div>
            </li>
		)
    }

	renderStack(stack, stackStep){
        let prevOrderNumber;
		return stack.map((stackObject, stackIndex) => {
			if(stackStep > 0 && stackStep < stackObject.order){
				return null;
			}
			let includeSpace = false;
			if(prevOrderNumber === undefined){
				prevOrderNumber = stackObject.order;
            }

            if(stackObject.order  == prevOrderNumber + 1) {
	            includeSpace = false;
	            prevOrderNumber = stackObject.order;
            } else if(stackObject.order  > prevOrderNumber + 1 ){
	            includeSpace = true;
	            prevOrderNumber = undefined;
            }
			return this.renderStackItem(stackObject, includeSpace, stackIndex)

		})
    }

	renderStacks(stacks, stackStep){
		const stackIds = Object.keys(stacks);
		return stackIds.map((id, index)=>{
			const stack = stacks[id];
			const ui = this.renderStack(stack, stackStep)
			return (
                <div key={index} className="stack-container-item">
                    <h4>{id}</h4>
                    <ul>{ui}</ul>
                </div>);
		});
    }

	render(){
		let ui = null;

		const {renderLater, stackStep, displayAnimationFrame} = this.state;

		const animationFrameButtonName = displayAnimationFrame ? 'Hide': 'Show'

		if(!renderLater){
			const stacks = stackManager.getStacks();
			ui = this.renderStacks(stacks, stackStep);
		}

		return (<div className="stack-container">
            <div className="stack-controller-container">
                <button onClick={this.decrementStackStep}>Prev step</button>
                <div>
                    <button onClick={this.handleShowAllSteps}>Show All steps</button>
                    <button onClick={this.clearAllSteps}>Clear</button>
	                <button onClick={this.toggleAnimationFrame}>{animationFrameButtonName} Animation Frame</button>
                </div>
                <button onClick={this.incrementStackStep}>Next step</button>
            </div>

            <div className="stack-message-container">
				{ui}
            </div>
        </div>)
	}
}


