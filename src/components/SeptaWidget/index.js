import './SeptaWidget.css'
import logo from '../../img/logo.svg';
import Zone from '../form-sections/Zone';
import TravelTime from '../form-sections/TravelTime';
import Location from '../form-sections/Location';
import Quantity from "../form-sections/Quantity";

const SeptaWidget = () => {
  return (
    <div className="septa-widget">
      <div className="septa-widget-header">
        <img src={logo} alt="septa logo" className="septa-widget-header-logo" />
        <h2>Regional Rail Fares</h2>
      </div>
      <Zone />
      <TravelTime />
      <Location />
      <Quantity />
      <div className='septa-widget-footer'>
        
      </div>
    </div>
  );
}

export default SeptaWidget;