
let framePrevOrder;
let animationFrameId;
let stackFrameEvent = true;

class StackManager {
    constructor(){
        this.stacks = {};
        this.callback = null;
        this.order = 0;
	    this.showAnimationFrame = true;
	    this.animationFrameListener = this.animationFrameListener.bind(this);
	    this.animationFrameListener();
    }

    toggleAnimationFrame(){
	    this.showAnimationFrame = !this.showAnimationFrame;
	    return  this.showAnimationFrame;
    }

    animationFrameListener(){
        if(stackFrameEvent && this.showAnimationFrame){
        	console.log('pushStackMessage', framePrevOrder, this.getOrder())
	        this.pushStackMessage('frame', 'onAnimationFrame', 'event', true)
        }
	    animationFrameId = window.requestAnimationFrame(this.animationFrameListener);
    }

    stopTracingAnimationFrame(){
	    animationFrameId = undefined;
	    framePrevOrder = undefined;
	    stackFrameEvent = false;
    }

	startTracingAnimationFrame(){
		stackFrameEvent = true;
	}

     incrementOrder(){
         this.order = this.order + 1;
     }

     getOrder(){
        return this.order;
     }

     pushStackMessage(id, message, type, triggerNow){
        const stack = this.stacks;
        if(stack){
            if(!stack[id]){
                stack[id] = []
            }

	        if(id === 'frame'){
                const currentOrder = this.getOrder();
		        if (framePrevOrder === currentOrder) {
			        this.stopTracingAnimationFrame();
			        return;
		        }
	        } else {
		        this.startTracingAnimationFrame();
            }

            this.incrementOrder();

	        if(id === 'frame') {
		        framePrevOrder = this.getOrder();
	        }

            stack[id].push({
                message: message,
                order: this.order,
                type: type
            });
            if(triggerNow){
                this.trigger()
            }
        }
     }

     removeStack(id){
         const stack = this.stacks;
         stack[id] = undefined;
     }

	getStacks(id){
		if(id && this.stacks[id]){
			return this.stacks[id];
		}
		return this.stacks;
	}

     clearStacks(triggerNow){
         this.stacks = {};
         this.order = 0;
         if(triggerNow){
             this.trigger()
         }
     }

     hookCallback(callback){
         this.callback = callback;
     }

     trigger(){
         this.callback && this.callback();
     }
}



const singletonInstance = new StackManager();
export default singletonInstance;