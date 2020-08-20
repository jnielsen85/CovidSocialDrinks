import React, { Component } from 'react'
import shotglass from './images/shotglass3.png'
import { db } from './config/firebase'
class Game extends Component {
  constructor(props) {
    super(props)
    this.state = {
      result: '',
      Winner: '',
      displayWinner: false,
      turnCounter: 0,
      tilesSize: 7,
      marker: 3,
      tiles: [false, false, false, true, false, false, false], //this is used to provide the right true/false towards the shotglass images rendering
      player1Wins: 0,
      player2Wins: 0,
      users: ''
    }
    this.coinToss = this.coinToss.bind(this)
    this.buildArray = this.buildArray.bind(this)
    this.generateTiles = this.generateTiles.bind(this)
    this._handleClick = this._handleClick.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
  }

  coinToss() {
    //controls the heads and tails movement.
    this.setState({ result: '' })
    setTimeout(() => {
      let tossOutcome = ''
      if (Math.random() < 0.5) {
        tossOutcome = 'heads'
      } else {
        tossOutcome = 'tails'
      }
      this.setState({ result: tossOutcome }, this.buildArray)
    }, 0)
  }

  buildArray() {
    //probably the toughest function we created. This involved assigning a winner based on the counter. had to create temp variables that relate to the states of the global variables.
    //once a winner is found we then set a time out for the winning div to pop up + displaying overall counter for winner vs loser so the players know who has taken how many shots.
    let tCounter = this.state.turnCounter
    let tMarker = this.state.marker
    let tplayer1wins = this.state.player1Wins
    let tplayer2wins = this.state.player2Wins
    let player1 = 6
    let player2 = 0
    let winner = ''

    if (this.state.turnCounter % 2 === 0 && this.state.result === 'heads') {
      tMarker++
      if (tMarker === player1) {
        winner = 'player2'
      }
    } else if (
      this.state.turnCounter % 2 !== 0 &&
      this.state.result === 'heads'
    ) {
      tMarker--
      if (tMarker === player2) {
        winner = 'player1'
      }
    }

    this.setState(
      { marker: tMarker, turnCounter: tCounter + 1, Winner: winner },
      this.generateTiles
    )

    if (winner) {
      if (winner === 'player2') {
        tplayer1wins++
      } else {
        tplayer2wins++
      }

      setTimeout(() => {
        this.setState({
          displayWinner: true,
          player1Wins: tplayer1wins,
          player2Wins: tplayer2wins
        })
      }, 3000)
    }
  }

  generateTiles() {
    //generating the right amount of tiles
    const arrayTiles = []
    setTimeout(() => {
      for (let i = 0; i < this.state.tilesSize; i++) {
        if (i === this.state.marker) {
          arrayTiles.push(true)
        } else {
          arrayTiles.push(false)
        }
      }
      this.setState({ tiles: arrayTiles })
    }, 2050)
  }

  _handleClick(event) {
    this.setState({
      turnCounter: 0,
      marker: 3,
      users: '',
      result: '',
      Winner: '',
      displayWinner: false,
      tiles: [false, false, false, true, false, false, false]
    }, this.componentDidMount)
  }

  componentDidMount() {
    // this is connected to our database on Firebase. We have hard coded a seeding data that's fed into this function.
    db.collection('trivia')
      .get()
      .then((querySnapshot) => {
        let data = querySnapshot.docs.map((doc) => doc.data())
        let randomIndex =
          'Trivia' +
          (Math.floor(Math.random() * Math.floor(Object.keys(data[0]).length)) +
            1) //producing random facts based on their name. Each fact is named Trivia(number) and the Math.random + floor finds it up to the length of the object.
        data = data[0][randomIndex]
        this.setState({ users: data })
      })
  }

  render() {
    return (
      <div className="gamePage">
        <div className="p1">
          <h1>Player 1 : {this.state.player1Wins}</h1>
        </div>
        <div className="flip">
          <Coinflip coinFlip={this.coinToss} outcome={this.state.result} />
        </div>
        <div className="p2">
          <h1>Player 2 : {this.state.player2Wins}</h1>
        </div>
        <div className="spacer">
          {this.state.users}
        </div>
        <div className="gameBottom">
          <TileSet tiles={this.state.tiles} />
        </div>
        {this.state.displayWinner && (
          <WinDiv Winner={this.state.Winner} _handleClick={this._handleClick} />
        )}
      </div>
    )
  }
}

//------------child--------------------------------
class TileSet extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tiles: this.props.tiles
    }
  }

  render() {
    return (
      <div className="tiles">
        {this.props.tiles.map((tile) => {
          return !tile ? (
            <div className="tile_x"></div>
          ) : (
            <div className="tile_x">
              {' '}
              <Shotglass />{' '}
            </div>
          )
        })}
      </div>
    )
  }
}

//------------child--------------------------------
class Coinflip extends React.Component {
  render() {
    return (
      <div>
        <div
          id="coin"
          className={this.props.outcome}
          onClick={this.props.coinFlip}>
          <div className="side-a"></div>
          <div className="side-b"></div>
        </div>
        <h1 id="flipheader">Flip a coin</h1>
      </div>
    )
  }
}

//---------------child -----------------------
const WinDiv = (props) => (
  <div className="winner">
    <div className="drink"> {props.Winner} Drink!!</div>
    <div className="restart" onClick={props._handleClick}>
      Play Again
    </div>
  </div>
)

//-----------childs-------------------------------
class Shotglass extends Component {
  render() {
    return (
      <div>
        <img id="shotglass" src={shotglass} alt="" />
      </div>
    )
  }
}

export default Game
