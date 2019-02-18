import React from 'react';
import './Card.css';

export default class Card extends React.Component {

  render() {
    let { letter, answer, isHighlighted } = this.props
    let status = letter == answer ? 1 : 0
    let className

    if (isHighlighted) {
      className = status ? 'card green' : 'card red'
    } else {
      className = 'card white'
    }

    return (
      <div className={className}>
        <div className="container">
          <p>{letter}</p>
        </div>
      </div>
    )
  }
}
