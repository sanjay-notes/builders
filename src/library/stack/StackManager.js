 class StackManager {
    constructor(){
        this.stacks = {};
        this.callback = null;
        this.order = 0;
    }

     updateOrder( ){
         this.order = this.order + 1;
     }

     getOrder(){
        return this.order;
     }


     getStack(id){
        const stack = this.stacks;
        if (stack[id]) {
            return stack[id]
        }
        else{
            stack[id] = [];
            return stack[id]
        }
    }


     pushStackMessage(id, message, type){
        const stack = this.stacks;
        if(stack){
            if(!stack[id]){
                stack[id] = []
            }

            this.updateOrder();
            stack[id].push({
                message: message,
                order: this.order,
                type: type
            });
        }
     }

     removeStack(id){
         const stack = this.stacks;
         stack[id] = undefined;
     }

     getStacks(type){
         return this.stacks;
     }

     clearStacks(type){
         this.stacks = {};
         this.order = 0;
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