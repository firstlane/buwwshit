import React from 'react';
import ReactDOM from 'react-dom';
import Uwuifier from 'uwuifier';
import { revealBullshit } from './replace.js'

class InputBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: "Place your corporate text here to be buwwupoopoo-ified.",
        };
    }

    updateText(newText) {
        this.setState({text: newText});
        this.props.onChange(this.state.text);
    }

    render() {
        return (
            <textarea onChange={(newText) => this.updateText(newText.target.value)} name="input-box" rows="20" cols="100">
                {this.state.text}
            </textarea>
        );
    }
}

class OutputBox extends React.Component {
    render() {
        return (
            <textarea key={this.props.text} name="output-box" readOnly rows="20" cols="100">
                {this.props.text}
            </textarea>
        );
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputText: "",
            outputText: "",
        };
    }

    buwwuify(input) {
        var bullshit = revealBullshit(input);

        const uwu = new Uwuifier();

        const buwwushit = uwu.uwuifySentence(bullshit);
        this.setState({outputText: buwwushit});
    }

    render() {
        return (
            <div>
                <div>
                    <InputBox id="inputBox" key={1} onChange={(text) => this.setState({inputText: text})}/>
                </div>
                <button onClick={() => this.buwwuify(document.getElementsByName('input-box')[0].value)}>
                    Disrupt the competition with some Buwwushit
                </button>
                <div>
                    <OutputBox key={2} text={this.state.outputText}/>
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
