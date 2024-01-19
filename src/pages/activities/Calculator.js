import React from 'react';
import "../../styles/pages/activities/calculator.css";

class Calculator extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        screenValue1: 0,
      }
      this.screenUpdate = this.screenUpdate.bind(this)
    }
    screenUpdate(a) {
      let r = '';
      let arr = [];
      let op = [];
      let temp = this.state.screenValue1.toString();
      if(a === "=") {
        console.log(temp)
        for (let j = 0; j < temp.length; j++) {
          if(temp[j] !== '/' && temp[j] !== 'x' && temp[j] !== '-' && temp[j] !== '+') {
            r = `${r}${temp[j]}`
          }
          else {
              op.push(temp[j])
              arr.push(r)
              r = ''
            }
        }
        console.log(arr)
        arr.push(r)
        if(arr[0] === '' && op[0] === '-') {
          arr[1]=`${op[0]}${arr[1]}`
          op.shift();
          arr.shift();
        }
        if(arr[0] === '') {
          arr[0] = 0
        }
        console.log(arr)
        r = '';
        for(let x1 = 0; x1 < arr.length; x1++) {
          arr[x1] = parseFloat(arr[x1])
        }
        console.log(arr)
        console.log(op)
        for(let x3 = 0; x3 < arr.length; x3++) {
          if(isNaN(arr[x3])) {
            arr[x3+1] = -arr[x3+1]
            arr.splice(x3, 1)
            op.splice(x3, 1)
          }
        }
        if(op.length === 0){
          return
        }
        for(let b = 0; b < op.length; b++) {
          if(op[b] === '/') {r = arr[0] / arr[1]; arr.shift();  arr[0] = r}
          if(op[b] === 'x') {r = arr[0] * arr[1]; arr.shift();  arr[0] = r}
          if(op[b] === '-') {r = arr[0] - arr[1]; arr.shift();  arr[0] = r}
          if(op[b] === '+') {r = arr[0] + arr[1]; arr.shift();  arr[0] = r}
          console.log(r)
        }
        console.log(r)
        if(this.state.screenValue1[0] === 0) {
          console.log('doin something funny')
        }
        r = r.toString()
        while(r.length > 15) {
          r = r.slice(0,-1)
        }
        this.setState ({
          screenValue1: r
        })
        return
      }
      if(a === 'clear') {
        this.setState ({
          screenValue1: 0
        })
        return
      }
      if(this.state.screenValue1.length === 15 || this.state.screenValue1 === 'Digit Limit Met!') {
        this.setState (state =>({
          screenValue1: 'Digit Limit Met!'
        }))
        return
      }
      if(a === '/' || a === 'x' || a === '-' || a === '+') {
        let x = this.state.screenValue1[this.state.screenValue1.length-1];
        if((a === '-' && x === '/') || (a === '-' && x === 'x') || (a === '-' && x === '+')) {
          x = this.state.screenValue1;
          this.setState ({
            screenValue1: `${x}${a}`
          })
          return;
        }
        if(x === '/' || x === 'x' || x === '-' || x === '+') {
          x = this.state.screenValue1;
          while(x[x.length-1] === '/' || x[x.length-1] === 'x' || x[x.length-1] === '-' || x[x.length-1] === '+') {
            x = x.slice(0,-1);
          }
          this.setState ({
            screenValue1: x
          })
        }
      }
      if(a === 0 && this.state.screenValue1 === 0) {
        this.setState ({
          screenValue1: 0
        })
      }
      else {
        if(this.state.screenValue1 === 0 && a !== '.') {
          this.setState ({
            screenValue1: a
          })
          return
        }
        if(a === '.' && temp.includes(".") === false) {
          this.setState (state =>({
        screenValue1: `${state.screenValue1}${a}`
      }))
          return
        }
        else if(a === '.') {
          let index = temp.length
          for(let h = index; h > 0; h--) {
            switch(temp[h]) {
              case '.': return;
              case '/': this.setState (state =>({
        screenValue1: `${state.screenValue1}${a}`
      }));
                return;
              case 'x': this.setState (state =>({
        screenValue1: `${state.screenValue1}${a}`
      }));
                return;
              case '-': this.setState (state =>({
        screenValue1: `${state.screenValue1}${a}`
      }));
                return;
              case '+': this.setState (state =>({
        screenValue1: `${state.screenValue1}${a}`
      }));
                return;
                default: return;
            }
          }
          return
        }
        if(a !== '.'){
        this.setState (state =>({
        screenValue1: `${state.screenValue1}${a}`
      }))
        }
      }
    }
    render() {
      return (
        <div id="calc-root">
          <div id="calc-background">
            {/*<img src="https://i.postimg.cc/9fJ8nJtr/Calculator.png"/>*/}
            <div id="calc-screen">
              <p id="display">{this.state.screenValue1}</p>
            </div>
            <div id="calc-buttons">
              <div onClick={() => this.screenUpdate('clear')}  className="calc-btn lg-buttons grey-buttons" id="clear"><p>AC</p></div>
              <div onClick={() => this.screenUpdate('/')}  className="calc-btn sm-buttons grey-buttons margin-left" id="divide"><p>/</p></div>
              <div onClick={() => this.screenUpdate('x')}  className="calc-btn sm-buttons orange-buttons margin-left" id="multiply"><p>x</p></div>
              <div onClick={() => this.screenUpdate(7)}  className="calc-btn sm-buttons grey-buttons margin-top" id="seven"><p>7</p></div>
              <div onClick={() => this.screenUpdate(8)}  className="calc-btn sm-buttons grey-buttons margin-left margin-top" id="eight"><p>8</p></div>
              <div onClick={() => this.screenUpdate(9)}  className="calc-btn sm-buttons grey-buttons margin-left margin-top" id="nine"><p>9</p></div>
              <div onClick={() => this.screenUpdate('-')}  className="calc-btn sm-buttons orange-buttons margin-left margin-top" id="subtract"><p>-</p></div>
               <div onClick={() => this.screenUpdate(4)}  className="calc-btn sm-buttons grey-buttons margin-top" id="four"><p>4</p></div>
              <div onClick={() => this.screenUpdate(5)}  className="calc-btn sm-buttons grey-buttons margin-left margin-top" id="five"><p>5</p></div>
              <div onClick={() => this.screenUpdate(6)}  className="calc-btn sm-buttons grey-buttons margin-left margin-top" id="six"><p>6</p></div>
              <div onClick={() => this.screenUpdate('+')}  className="calc-btn sm-buttons orange-buttons margin-left margin-top" id="add"><p>+</p></div>
              <div onClick={() => this.screenUpdate(1)}  className="calc-btn sm-buttons grey-buttons margin-top" id="one"><p>1</p></div>
              <div onClick={() => this.screenUpdate(2)}  className="calc-btn sm-buttons grey-buttons margin-left margin-top" id="two"><p>2</p></div>
              <div onClick={() => this.screenUpdate(3)}  className="calc-btn sm-buttons grey-buttons margin-left margin-top" id="three"><p>3</p></div>
              <div onClick={() => this.screenUpdate('=')}  className="calc-btn lg-button-vert orange-buttons margin-left margin-top" id="equals"><p>=</p></div>
              <div onClick={() => this.screenUpdate(0)} className="calc-btn lg-buttons grey-buttons" id="zero"><p>0</p></div>
              <div  onClick={() => this.screenUpdate('.')}  className="calc-btn sm-buttons grey-buttons margin-left" id="decimal"><p>.</p></div>
            </div>
          </div>
        </div>
      )
    }
  }

export default Calculator;