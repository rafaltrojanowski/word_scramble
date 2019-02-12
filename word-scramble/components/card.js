import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default class Card extends React.Component {

  render() {
    let { letter, answer, isHighlighted } = this.props
    let status = letter == answer ? 1 : 0

    if (isHighlighted) {
      text = <Text style={ status ? styles.greenText : styles.redText }>{letter}</Text>
    } else {
      text = <Text style={ styles.blackText}>{letter}</Text>
    }

    return (
      <View>{text}</View>
    )
  }
}

const styles = StyleSheet.create({
  blackText: {
    fontFamily: 'Cochin',
    fontSize: 50,
    fontWeight: 'bold',
  },
  greenText: {
    fontFamily: 'Cochin',
    fontSize: 50,
    fontWeight: 'bold',
    color: 'green'
  },
  redText: {
    fontFamily: 'Cochin',
    fontSize: 50,
    fontWeight: 'bold',
    color: 'red'
  }
});
