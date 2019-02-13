import React from 'react'
import { Text, View } from 'react-native'
import Card  from './card'
import { Keyboard, TextInput } from 'react-native'
import { connect } from 'react-redux'

mapStateToProps = state => {
  return {
    cursorPosition: state.cursorPosition
  }
}

mapDispatchToProps = dispatch => {
  return {
    increasePosition: () => dispatch({type: "INCREASE_POSITION"}),
    decreasePosition: () => dispatch({type: "DECREASE_POSITION"})
  }
}

class Game extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      isHighlighted: false,
    }
  }

  render() {
    let { word } = this.props
    let { scrambledWord, isHighlighted } = this.state
    let splitedWord = word.split("")

    if (!scrambledWord) return (null)

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

        <View>
          <Text>
            {this.props.cursorPosition}
          </Text>
        </View>

        <View>
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
    this.setState({
      scrambledWord,
    })
  }

  handleInput(letter) {
    let { scrambledWord } = this.state
    let { cursorPosition } = this.props
    letterIndex = scrambledWord.indexOf(letter.toLowerCase(), cursorPosition)

    if(letterIndex != -1) {
      this.arrayMove(scrambledWord, letterIndex, cursorPosition)
    } else {
      // console.warn('Try again')
    }
  }

  handleBackspace() {
    cursorPosition = this.props.cursorPosition
    if(cursorPosition > 0) { this.props.decreasePosition() }
  }

  handleHighlight() {
    this.setState({
      isHighlighted: true
    })
  }

  handleKeyPress = (key) => {
    switch(key) {
      case '?':
        this.handleHighlight()
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

    this.setState({
      scrambledWord: arr,
    })

    this.props.increasePosition()

    return arr
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Game)
