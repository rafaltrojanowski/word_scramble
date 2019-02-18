import React from 'react';

export default class Card extends React.Component {

  render() {
    let { letter, answer, isHighlighted } = this.props
    let status = letter == answer ? 1 : 0
    let text

    if (isHighlighted) {
      text = <p style={ status ? styles.greenText : styles.redText }>{letter}</p>
    } else {
      text = <p style={ styles.blackText}>{letter}</p>
    }

    return (
      <div>{text}</div>
    )
  }
}

const styles = {
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
}
