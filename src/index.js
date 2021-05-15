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

    buwwuify(input, censored) {
        var bullshit = revealBullshit(input, censored);

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
                <button onClick={() => this.buwwuify(document.getElementsByName('input-box')[0].value, document.getElementsByName('censorCheckbox')[0].checked)}>
                    Disrupt the competition with some Buwwushit
                </button>
				<input type="checkbox" id="censorCheckbox" name="censorCheckbox" value="censored" />
				<label for="censorCheckbox"> Censored?</label>
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
