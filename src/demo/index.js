import React from "react";
import { render } from "react-dom";
import {Block} from './../library';
import {StackAbstract} from './../library';
import {Stack} from './../library';

class AppChildren extends StackAbstract {
    constructor(props){
        super(props);
    }

    render(){
        super.render();
        return (
            <div>
                <h3>Block</h3>
                <div style={{padding:"32px"}}>
                    <Block  htmlType="div" >
                        <h3>Proptypes</h3>
                        <ul>
                            <li>color:string</li>
                            <li>htmltype:string</li>
                        </ul>
                        <p>
                            In this example htmltype = div, and color is default value from css
                        </p>
                    </Block>
                </div>
                <hr/>
                <h3>StackAbstract</h3>
                <div style={{padding:"32px"}}>
                    <h3>Proptypes</h3>
                    <ul>
                        <li>identifier:string</li>
                    </ul>
                    <h3>API</h3>
                    <ul>
                        <li>pushStackMessage()</li>
                    </ul>
                    <p>
                        Stack Abstract is an abstract class which stacks the React Life cycle stage for the component that extends them
                        Only requirement you have to  call <b>super.lifecycle methods like super.render()</b> id you are implementing those methods</p>

                </div>
                <hr/>
                <h3>Stack</h3>
            </div>
        );
    }
}

class App extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div>
                <AppChildren identifier="child1"/>
                <AppChildren identifier="child2"/>
                <div style={{padding:"32px"}}>
                    <Stack/>
                    <p>UI interface to see the stack, number will represent the order in which they called</p>
                    <h4>Requirements</h4>
                    <ul>
                        <li>Render this instance as last instance in root element</li>
                    </ul>
                </div>
            </div>
        );
    }
}


render((<App></App>), document.getElementById("app"));

