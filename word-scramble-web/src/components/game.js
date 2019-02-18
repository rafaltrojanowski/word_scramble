import React from 'react'
import Card  from './Card'
import { connect } from 'react-redux'

const mapStateToProps = state => {
  return { ...state }
}

const mapDispatchToProps = dispatch => {
  return {
    removeWord : () => dispatch({type: 'REMOVE_WORD'}),
    addWord: (scrambledWord) => dispatch({
      type: "ADD_WORD",
      scrambledWord
    })
  }
}

class Game extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      isHighlighted: false,
      typedKey: null
    }
  }

  render() {
    let { word, scrambledWord } = this.props
    let { isHighlighted, typedKey } = this.state

    return (
      <div>
        {this.renderGame(word, scrambledWord, isHighlighted)}
        {this.renderInfo(typedKey)}
        {this.renderInput()}
      </div>
    )
  }

  renderGame = (word, scrambledWord, isHighlighted) => {
    if (!scrambledWord) return (<p>Loading...</p>)

    return(
      <div>
        {scrambledWord.map(function (letter, index) {
          return (
            <Card
              letter={letter}
              answer={word.split("")[index]}
              isHighlighted={isHighlighted}
              key={index}>
            </Card>
          )
        })}
      </div>
    )
  }

  renderInfo = (typedKey) => {
    return(
      <div style={{justifyContent: 'center', alignItems: 'center'}}>
        <p style={{fontSize: 10}}>
          {typedKey}
        </p>
      </div>
    )
  }

  renderInput = () => {
    return(
      <div style={{}}>
        <input
          autoCapitalize={'none'}
          autoFocus
          onKeyDown={ this.onKeyDown }
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        />
      </div>
    )
  }

  componentDidMount(){
    let scrambledWord = this.shuffle(this.props.word.split(""))
    this.props.addWord(scrambledWord)
  }

  handleInput(key) {
    let { scrambledWord, cursorPosition } = this.props
    let letterIndex = scrambledWord.indexOf(key.toLowerCase(), cursorPosition)

    if(letterIndex != -1) {
      let newScrambledWord = this.arrayMove(scrambledWord, letterIndex, cursorPosition)
      this.props.addWord(newScrambledWord)
      this.setState({ typedKey: key })
    } else {
      this.setState({ typedKey: `Not found: ${key}. Try again!` })
    }
  }

  handleBackspace() {
    let cursorPosition = this.props.cursorPosition
    if(cursorPosition > 0) {
      this.props.removeWord ()
      this.setState({ isHighlighted: false })
    }
  }

  toggleHighlight() { this.setState({ isHighlighted: !this.state.isHighlighted }) }

  onKeyDown = (e) => {
    let { key } = e

    switch(key) {
      case 'Enter':
        this.toggleHighlight()
        break;
      case 'Backspace':
        this.handleBackspace(key)
        break;
      default:
        this.handleInput(key)
    }
  }

  // https://gomakethings.com/how-to-shuffle-an-array-with-vanilla-js/
  shuffle = array => {
    let currentIndex = array.length;
    let temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  // https://stackoverflow.com/a/5306832/1590134
  arrayMove = (arr, oldIndex, newIndex) => {
    if (newIndex >= arr.length) {
        let k = newIndex - arr.length + 1;
        while (k--) {
            arr.push(undefined);
        }
    }
    arr.splice(newIndex, 0, arr.splice(oldIndex, 1)[0]);

    return arr
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Game)
