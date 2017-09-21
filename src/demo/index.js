import React from "react";
import { render } from "react-dom";
import {Block} from './../library';
import {StackAbstract} from './../library';

class App extends StackAbstract {
    constructor(props){
        super(props);
    }

    render(){

        return (<div >
                    <Block  htmlType="div">
                        <h3>Proptypes</h3>
                        <ul>
                            <li>Color</li>
                            <li>htmltype</li>
                        </ul>
                        <p>
                            In this example htmltype = div, and color is default value from css
                        </p>
                    </Block>
                </div>);
    }
}


render((<App></App>), document.getElementById("app"));

