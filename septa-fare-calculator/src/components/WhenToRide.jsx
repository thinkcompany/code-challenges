import React from 'react';
import { weekendLabel } from '../utils/utils';
import './WhenToRide.scss';

const WhenToRide = (props) => {
  const { info, selectedTime, setSelectedTime } = props;

  const handleTime = (e) => {
    setSelectedTime(e.target.value);
  };

  const timesToRender = Object.keys(info).slice(0, 3);

  const displayWhenRidingHelperText = (type) => {
    let text;
    switch (type) {
      case 'anytime':
        text = info.anytime;
        break;
      case 'weekday':
        text = info.weekday;
        break;
      case 'evening_weekend':
        text = info.evening_weekend;
        break;
      default:
        break;
    }

    return text;
  };

  return (
    <div className="when-section">
      <h4>When are you riding?</h4>
      <select
        placeholder="[---Select Day---]"
        className="when-input-select"
        id="zone-input-select"
        onChange={handleTime}
      >
        <option disabled selected value="">
          [---Select Day---]
        </option>
        {timesToRender.map((time) => {
          return <option value={time}>{weekendLabel(time)}</option>;
        })}
      </select>
      <p className="helper-text">{displayWhenRidingHelperText(selectedTime)}</p>
    </div>
  );
};

export default WhenToRide;
