import './SeptaWidget.css'
import logo from '../../img/logo.svg';
import Zone from '../form-sections/Zone';

const SeptaWidget = () => {
  return (
    <div className="septa-widget">
      <div className="septa-widget-header">
        <img src={logo} alt="septa logo" className="septa-widget-header-logo" />
        <h2>Regional Rail Fares</h2>
      </div>
      <Zone />
    </div>
  );
}

export default SeptaWidget;