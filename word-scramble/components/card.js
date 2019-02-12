import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default class Card extends React.Component {

  render() {

    let { letter } = this.props

    return (
      <View>
        <Text style={styles.baseText}>{letter}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  baseText: {
    fontFamily: 'Cochin',
    fontSize: 50,
    fontWeight: 'bold'
  }
});
