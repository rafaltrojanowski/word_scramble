import React from 'react';
import './Card.scss';

import { connect } from 'react-redux'

const mapStateToProps = state => {
  return { ...state }
}

class Card extends React.Component {

  render() {
    let { letter, answer, isHighlighted, cursorPosition, index } = this.props
    let status = letter == answer ? 1 : 0
    let className

    if (isHighlighted) {
      className = status ? 'card green' : 'card red'
    } else {
      className = 'card white'
    }

    if(index < cursorPosition) {
      className = className + ' current'
    }

    return (
      <div className={className}>
        {letter}
      </div>
    )
  }
}

export default connect(mapStateToProps)(Card)
