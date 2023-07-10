import React from 'react';
import PropTypes from 'prop-types';

const Card = ({ word, isMatched, isFlipped, onClick }) => {
  const classNames = ['card'];
  if (isMatched) classNames.push('matched');
  if (isFlipped) classNames.push('flipped');

  return (
    <div className={classNames.join(' ')} onClick={onClick}>
      {word}
    </div>
  );
};

Card.propTypes = {
  word: PropTypes.string.isRequired,
  isMatched: PropTypes.bool.isRequired,
  isFlipped: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Card;
