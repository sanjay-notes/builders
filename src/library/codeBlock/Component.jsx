import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';

export default class CodeBlock extends React.Component {
    render() {
        return (
            <SyntaxHighlighter language={this.props.language}>
		        {this.props.children}
            </SyntaxHighlighter>
        );
    }
}