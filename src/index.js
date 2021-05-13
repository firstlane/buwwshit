// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';

// class Square extends React.Component {
//     render() {
//       return (
//         <button className="square"
//                 onClick={() => this.props.onClick()}>
//           {this.props.value}
//         </button>
//       );
//     }
//   }
  
//   class Board extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             squares: Array(9).fill(null),
//         };
//     }

//     handleClick(i) {
//         const squares = this.state.squares.slice();
//         squares[i] = 'X';
//         this.setState({squares: squares});
//     }

//     renderSquare(i) {
//       return (<Square value={this.state.squares[i]}
//                      onClick={() => this.handleClick(i)}
//              />);
//     }
  
//     render() {
//       const status = 'Next player: X';
  
//       return (
//         <div>
//           <div className="status">{status}</div>
//           <div className="board-row">
//             {this.renderSquare(0)}
//             {this.renderSquare(1)}
//             {this.renderSquare(2)}
//           </div>
//           <div className="board-row">
//             {this.renderSquare(3)}
//             {this.renderSquare(4)}
//             {this.renderSquare(5)}
//           </div>
//           <div className="board-row">
//             {this.renderSquare(6)}
//             {this.renderSquare(7)}
//             {this.renderSquare(8)}
//           </div>
//         </div>
//       );
//     }
//   }
  
//   class Game extends React.Component {
//     render() {
//       return (
//         <div className="game">
//           <div className="game-board">
//             <Board />
//           </div>
//           <div className="game-info">
//             <div>{/* status */}</div>
//             <ol>{/* TODO */}</ol>
//           </div>
//         </div>
//       );
//     }
//   }
  
//   // ========================================
  
//   ReactDOM.render(
//     <Game />,
//     document.getElementById('root')
//   );
  

import React from 'react';
import ReactDOM from 'react-dom';
import Uwuifier from 'uwuifier';

class InputBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: "Place your corporate text here to be buwwupoopoo-ified.",
        };
    }

    updateText(newText) {
        console.log("newText:");
        console.log(newText);
        this.setState({text: newText});
        this.props.onChange(this.state.text);
    }

    render() {
        return (
            <textarea onChange={(newText) => this.updateText(newText)} name="input-box" rows="20" cols="100">
                {this.state.text}
            </textarea>
        );
    }
}

class OutputBox extends React.Component {
//function OutputBox(props) {
    render() {
        console.log("render OutputBox");
        //console.log(this.props.text);
        return (
            <textarea name="output-box" readOnly rows="20" cols="100">
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

    buwwuify() {
        const uwu = new Uwuifier();
        this.setState({outputText: uwu.uwuifySentence(this.state.inputText)});
        //this.state.outputText = uwu.uwuifySentence(this.state.inputText);
        console.log(this.state.outputText);
    }

    setOutput(text) {

    }

    getInput(text) {
        alert('getInput');
    }

    render() {
        return (
            <div>
                <div>
                    <InputBox key={1} onChange={(text) => this.setState({inputText: text})}/>
                </div>
                <button onClick={() => this.buwwuify()}>
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
