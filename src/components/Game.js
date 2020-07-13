import React, { Component } from 'react'
import shotglass from "../images/shotglass.jpg";

class Game extends Component {
  constructor(props){
    super(props)
    this.state = {
      result: '',
    };
    this.coinToss = this.coinToss.bind(this);
  }
  coinToss() {
      if (Math.random() < 0.5) {
        this.setState({ result: "heads" });
        console.log("heads");
      } else {
        this.setState({ result: "tails" });
        console.log("tails");
      }
  }

  render() {
    return (
      <div>
        <div>
          <Coinflip coinFlip={this.coinToss} outcome={this.state.result}/>
        </div>
        <div class="board" >
          <div class="tiles" id="tile1">tiles</div>
          <div class="tiles" id="tile2">tiles</div>
          <div class="tiles" id="tile3">tiles</div>
          <div  id="tile4"> < Shotglass /> </div>
          <div class="tiles" id="tile5">tiles</div>
          <div class="tiles" id="tile6">tiles</div>
          <div class="tiles" id="tile7">tiles</div>
        </div>
        <div>
          {this.state.result}
        </div>
      </div>
    )
  }
}


//------------child--------------------------------

class Coinflip extends React.Component {

 render() {
   return (
     <div>
       <div id="coin" className={this.props.outcome}>
         <div class="side-a">
           <h2>TAIL</h2>
         </div>
         <div className="side-b">
           <h2>HEAD</h2>
         </div>
       </div>
       <h1>Flip a coin</h1>
       <button id="btn" onClick={this.props.coinFlip}>
         Coin Toss
       </button>
     </div>
   );
 }
}

//-----------childs-------------------------------

class Shotglass extends Component {
  render() {
    return <div>
      <img id="shotglass" src={shotglass}/>
    </div>
  }
}

export default Game

{/*
https://codepen.io/gaearon/pen/gWWZgR?editors=0010


//Set value of a const to = URL
const marker 4
then in the state do an
if  (heads) = true
  setvalue = false for the one im on
   marker -1
  setState value = true
  tile to left tile to right
  else {
    setvalue = false for the one im on
    marker + 1
    setstate value = true
    to the other side.
  }
*/}