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
		this.getStepValue = this.getStepValue.bind(this);
		stackManager.hookCallback(this.renderLater);
		this.renderedSteps = [];
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

	getStepValue(isIncrement = true){
		let stepValue;
		if(isIncrement){
			stepValue = this.state.stackStep < stackManager.getOrder() ?  this.state.stackStep + 1 :  this.state.stackStep;
		} else {
			stepValue = this.state.stackStep > 1 ? this.state.stackStep - 1 : 1;
		}

		if(this.renderedSteps && this.renderedSteps.length > 0) {
			const lastStep = this.renderedSteps[this.renderedSteps.length - 1]
			const firstStep = this.renderedSteps[0]
			while(this.renderedSteps.indexOf(stepValue) === -1){
				if(isIncrement){
					if(stepValue > lastStep){
						return lastStep;
					}
					stepValue++
				}else{
					if(stepValue < firstStep){
						return firstStep;
					}
					stepValue--
				}

			}
			return stepValue;
		}
		return stepValue;
	}

	incrementStackStep(){
		const stepValue = this.getStepValue();
		this.setState({
			stackStep:  stepValue
		})
	}

	decrementStackStep(){
		const stepValue = this.getStepValue(false);
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
			if(stackStep === 0){
				this.renderedSteps.push(stackObject.order);
			}
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

	renderStacks(stacks, stackStep, identifier, displayAnimationFrame){
		const stackIds = Object.keys(stacks);
		(stackStep === 0) && (this.renderedSteps = []);
		return stackIds.map((id, index)=>{
			if(identifier && id !== identifier){
				if(displayAnimationFrame){
					if(id !== 'frame'){
						return;
					}
				}else{
					return;
				}
			}

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
			ui = this.renderStacks(stacks, stackStep, this.props.identifier, displayAnimationFrame);
		}

		return (<div className="stack-container">
            <div className="stack-controller-container">
                <button className="stack-controller-prev" onClick={this.decrementStackStep}>&lt;</button>
                <div>
                    <button className="stack-controller-showall" onClick={this.handleShowAllSteps}>Show All steps</button>
                    <button className="stack-controller-clear" onClick={this.clearAllSteps}>Clear</button>
	                <button className="stack-controller-animation" onClick={this.toggleAnimationFrame}>{animationFrameButtonName} Animation Frame</button>
                </div>
                <button className="stack-controller-next" onClick={this.incrementStackStep}>&gt;</button>
            </div>

            <div className="stack-message-container">
				{ui}
            </div>
        </div>)
	}
}


