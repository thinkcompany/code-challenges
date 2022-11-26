import React, { Fragment } from 'react';
import './WhereToPurchase.scss';

const WhereToPurchase = (props) => {
  const { info, setSelectedVenue, selectedVenue } = props;
  const whereToBuy = Object.keys(info).slice(3, 5);

  const handleLocation = (e) => {
    setSelectedVenue(e.target.value);
  };

  const displayVenueHelperText = (type) => {
    let text;
    switch (type) {
      case 'advance_purchase':
        text = info.advance_purchase;
        break;
      case 'onboard_purchase':
        text = info.onboard_purchase;
        break;
      default:
        break;
    }

    return text;
  };

  return (
    <div class="where-section">
      <h4>Where will you purchase the fare?</h4>
      <form>
        {whereToBuy.map((where) => (
          <Fragment>
            <label for={where}>
              <input
                type="radio"
                id="station"
                name="where"
                value={where}
                onChange={handleLocation}
              />
              {where === 'advance_purchase' ? 'Station Kiosk' : 'Onboard'}
            </label>
            <br />
          </Fragment>
        ))}
      </form>
      <p className="helper-text2">{displayVenueHelperText(selectedVenue)}</p>
    </div>
  );
};

export default WhereToPurchase;
