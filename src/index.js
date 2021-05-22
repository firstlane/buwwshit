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

class Slider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            label: props.label,
            value: props.value,
        };
    }

    render() {
        return (
            <div>
                <label>{this.state.label}</label>
                <br/>
                <input type="range" min="0" max="100" step="0.01" value={this.state.value} />
                <br/>
            </div>
        );
    }
}

const ActionsInit      = 0.07;
const ExclamationsInit = 1;
const FacesInit        = 0.05;
const StuttersInit     = 0.1;
const WordsInit        = 1;

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            outputText:   "",
            actions:      ActionsInit,
            exclamations: ExclamationsInit,
            faces:        FacesInit,
            stutters:     StuttersInit,
            words:        WordsInit,
        };
    }

    buwwuify(input,
             actions      = ActionsInit,
             exclamations = ExclamationsInit,
             faces        = FacesInit,
             stutters     = StuttersInit,
             words        = WordsInit) {
        var bullshit = revealBullshit(input);

        const uwu = new Uwuifier({
            spaces: {
                faces:    faces,
                actions:  actions,
                stutters: stutters
            },
            words: words,
            exclamations: exclamations
        });

        const buwwushit = uwu.uwuifySentence(bullshit);
        this.setState({outputText: buwwushit});
    }

    render() {
        return (
            <div>
                <div>
                    <InputBox id="inputBox" key={1}/>
                </div>
                <div>
                    <Slider label="Actions" value={ActionsInit} />
                    <Slider label="Exclamations" value={ExclamationsInit} />
                    <Slider label="Faces" value={FacesInit} />
                    <Slider label="Stutters" value={StuttersInit} />
                    <Slider label="Words" value={WordsInit} />
                </div>
                <button onClick={() => this.buwwuify(document.getElementsByName('input-box')[0].value)}>
                    Disrupt the competition with some Buwwshit
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
