import React, { Fragment } from 'react';
import './Total.scss';

const Total = (props) => {
  const { totalFarePrice } = props;

  return (
    <div class="total-section">
      {totalFarePrice && (
        <Fragment>
          <h3 className="fare-cost-label">Your fare will cost</h3>
          <p className="fare-cost-price">{`$${totalFarePrice}`}</p>
        </Fragment>
      )}
    </div>
  );
};

export default Total;
