import React from 'react';
import ReactDOM from 'react-dom';
import Uwuifier from 'uwuifier';
import findAndReplaceDOMText from 'findandreplacedomtext';
import { revealBullshit, revealDOMBullshit, revealDOMBullshitCensored } from './replace.js'
import urlRedirects from './redirects.js';

class InputBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: "",
        };
    }

    updateText(newText) {
        this.setState({text: newText});
        this.props.onChange(this.state.text);
    }

    render() {
        return (
            <textarea placeholder="Place your corporate text here to be buwwupoopoo-ified." onChange={(newText) => this.updateText(newText.target.value)} name="input-box" rows="20" cols="100">
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

const topLevelDiv = "buwwshitTopLevelDiv";

function uwuify({text}) {
    const uwu = new Uwuifier();
    let newText = uwu.uwuifySentence(revealBullshit(text));
    return newText;
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
        var htmlObject = document.createElement('div');
        htmlObject.id = topLevelDiv;
        htmlObject.innerHTML = input;
        var doc = new DOMParser().parseFromString(htmlObject.innerHTML, "text/html");

        if (doc.body.firstChild === doc.body.lastChild) {
            // User input plaintext
            const uwu = new Uwuifier();
            let newText = uwu.uwuifySentence(revealBullshit(input, censored));

            this.setState({outputText: newText});
        }
        else {
            // User input HTML

            // Remove newlines from input. This is a work-around
            // since findAndReplaceDOMText won't always match against
            // an entire section of text that has newlines in it.
            var docString = new XMLSerializer().serializeToString(doc);
            docString = docString.replace(/(\r\n|\n|\r)/gm, "");
            doc = new DOMParser().parseFromString(docString, "text/html");

            var findRegex = /.+/;

            if (censored) {
                findAndReplaceDOMText(doc.getRootNode(), {
                    preset: 'prose',
                    find: findRegex,
                    replace: revealDOMBullshitCensored
                });
            }
            else {
                findAndReplaceDOMText(doc.getRootNode(), {
                    preset: 'prose',
                    find: findRegex,
                    replace: revealDOMBullshit
                });
            }

            findAndReplaceDOMText(doc.getRootNode(), {
                preset: 'prose',
                find: findRegex,
                replace: uwuify
            });

            var anchors = doc.getElementsByTagName('a');
            for (var i = 0; i < anchors.length; i++) {
                var index = Math.floor(Math.random() * (0, urlRedirects.length - 1));
                anchors[i].href = urlRedirects[index];
            }

            var output = new XMLSerializer().serializeToString(doc);
            if (!output.startsWith("<!DOCTYPE html>"))
                output = "<!DOCTYPE html>" + output;
            this.setState({outputText: output});
        }
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
