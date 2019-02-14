import React from 'react'
import { Text, View } from 'react-native'
import Card  from './card'
import { Keyboard, TextInput } from 'react-native'
import { connect } from 'react-redux'

mapStateToProps = state => {
  return { ...state }
}

mapDispatchToProps = dispatch => {
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
    let splitedWord = word.split("")

    if (!scrambledWord) return (<Text>Loading...</Text>)

    return (
      <View>
        <View style={{flexDirection:'row', flexWrap:'wrap'}}>
          {scrambledWord.map(function (letter, index) {
            return (
              <Card
                letter={letter}
                answer={splitedWord[index]}
                isHighlighted={isHighlighted}
                key={index}>
              </Card>
            )
          })}
        </View>

        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontSize: 10}}>
            {typedKey}
          </Text>
        </View>

        <View style={{display: 'none'}}>
         <TextInput
            autoFocus
            onKeyPress={({ nativeEvent }) => {
              this.handleKeyPress(nativeEvent.key)
            }}
            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          />
        </View>
      </View>
    )
  }

  componentDidMount(){
    let scrambledWord = this.shuffle(this.props.word.split(""))
    this.props.addWord(scrambledWord)
  }

  handleInput(key) {
    let { scrambledWord, cursorPosition } = this.props
    letterIndex = scrambledWord.indexOf(key.toLowerCase(), cursorPosition)

    if(letterIndex != -1) {
      newScrambledWord = this.arrayMove(scrambledWord, letterIndex, cursorPosition)
      this.props.addWord(newScrambledWord)
      this.setState({ typedKey: key })
    } else {
      this.setState({ typedKey: `Not found: ${key}. Try again!` })
    }
  }

  handleBackspace() {
    cursorPosition = this.props.cursorPosition
    if(cursorPosition > 0) {
      this.props.removeWord ()
      this.setState({ isHighlighted: false })
    }
  }

  toggleHighlight() { this.setState({ isHighlighted: !this.state.isHighlighted }) }

  handleKeyPress = (key) => {
    switch(key) {
      case '?': // TODO: that should be Enter ideally
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
