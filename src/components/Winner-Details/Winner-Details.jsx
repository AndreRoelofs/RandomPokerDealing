import React from 'react';
import propTypes from 'prop-types';
import './Winner-Details.scss';

const WinnerDetails = ({ winner }) => {
  if (winner == null) {
    return <div />;
  }
  return (
    <div className="winner-container">
      <h3 className="winner-name">
        {winner.name}
      </h3>
      <h3 className="winner-label">
        Won with a score of
        {' '}
        {winner.score}
      </h3>
    </div>
  );
};

WinnerDetails.propTypes = {
  winner: propTypes.shape({ name: '', score: 0 }).isRequired,
};

export default WinnerDetails;
