import './SeptaWidget.css'
import logo from '../../img/logo.svg';

const SeptaWidget = () => {
  return (
    <div className="septa-widget">
      <div className="septa-widget-header">
        <img src={logo} alt="septa logo" className="septa-widget-header-logo" />
        <h1 style={{whiteSpace: 'nowrap'}}>Regional Rail Fares</h1>
      </div>
    </div>
  );
}

export default SeptaWidget;