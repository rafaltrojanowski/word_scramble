import React from 'react';
import { Text, View } from 'react-native';

export default class Card extends React.Component {

  render() {
    let { letter } = this.props

    return (
      <View>
        <Text>{letter}</Text>
      </View>
    )
  }
}
