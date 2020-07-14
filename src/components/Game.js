import React, { Component } from 'react'
const shotglass = "images/shotglass.jpeg";

class Game extends Component {
  constructor(props){
    super(props)
    this.state = {
      result: '',
      turnCounter: 0,
      tilesSize: 7,
      marker: 3,
      tiles: [] // [false, false,false,true,false,false, false]
    };
    this.coinToss = this.coinToss.bind(this);
    this.buildArray = this.buildArray.bind(this);
    this.generateTiles = this.generateTiles.bind(this);
  }

  // componentDidUpdate(prevProps, prevState){
  //   if(prevState.turnCounter !== this.state.turnCounter){
  //     this.buildArray()
  //   }
  // }

  coinToss() {
      let tossOutcome = "";
      if (Math.random() < 0.5) {
        tossOutcome = "heads";
        //this.setState({ result: “heads” }, this.buildArray);
      } else {
        tossOutcome = "tails";
        //this.setState({ result: “tails” }, this.buildArray);
      }
      this.setState({result: tossOutcome})
      console.log(this.state.result)
    }

  buildArray() {
    let tempMarker = this.state.marker
    let tempTiles = this.state.tiles
    let tempCounter = this.state.counter
    if (this.state.turnCounter % 2 === 0 && this.state.result === "heads" ){
      tempMarker++
      tempTiles = this.generateTiles ()
      console.log(this.generateTiles());

    } else if (this.state.turnCounter % 2 !== 0 && this.state.result === "heads") {
      tempMarker--
      tempTiles = this.generateTiles()
      console.log(this.generateTiles());
    }
    this.setState({tiles: tempTiles, turnCounter: tempCounter + 1, marker: tempMarker})
  }

  generateTiles() {
    const arrayTiles = [];
    for (let i = 0; i < this.state.tilesSize; i++) {
      if (i === this.state.marker) {
        arrayTiles.push(true);
      } else {
        arrayTiles.push(false);
      }
    }
    return arrayTiles
  }

  render() {
    return (
      <div>
        <div>
          <Coinflip coinFlip={this.coinToss} outcome={this.state.result}/>
        </div>
        <div class="board">
        < TileSet tiles={this.state.tiles} />
        </div>
        <div>
          {this.state.result}
        </div>
      </div>
    )
  }
}



//------------child--------------------------------

class TileSet extends Component {
   constructor(props){
   super(props)
   this.state = {
     tiles: []
   }
  }
   render() {
     return (
       <div>
          {this.props.tiles.map(tile => {
            return !tile ?
                <div class="tiles" id="tile_x">tiles</div>
              :
                <div id="tile4"> < Shotglass /> </div>
              }
          )}
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
