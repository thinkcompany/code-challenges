const { createElement, Fragment, useEffect, useState } = React;
const e = createElement;

const FareWidget = () => {
  const [zones, setZones] = useState([
    {
      name: "CCP/1",
      zone: 1,
      fares: [
        {
          type: "weekday",
          purchase: "advance_purchase",
          trips: 1,
          price: 4.75,
        },
      ],
    },
  ]);
  const [formState, setFormState] = useState({
    zone: 1,
    time: "weekday",
    purchaseLocation: "advance_purchase",
    rides: 0,
  });
  const [fareTypes, setFareTypes] = useState([
    {
      type: "weekday",
      purchase: "advance_purchase",
      trips: 1,
      price: 4.75,
    },
  ]);

  const [fare, setFare] = useState({
    type: "weekday",
    purchase: "advance_purchase",
    trips: 1,
    price: 4.75,
  });

  const [cost, setCost] = useState(0);

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    var ajaxRequest = new XMLHttpRequest();
    ajaxRequest.onreadystatechange = function () {
      if (ajaxRequest.readyState == 4) {
        if (ajaxRequest.status == 200) {
          var response = JSON.parse(ajaxRequest.responseText);
          setZones(response.zones);
        }
      }
    };
    ajaxRequest.open("GET", "../fares.json");
    ajaxRequest.send();
  }, []);

  useEffect(() => {
    const foundZone = zones.find(
      (zone) => parseInt(formState.zone) === zone.zone
    );
    const filteredZone = foundZone.fares.filter(
      (fareObject) => fareObject.purchase === formState.purchaseLocation
    );
    setFareTypes(filteredZone);

    const foundFare = filteredZone.find((fare) => fare.type === formState.time);
    setFare(foundFare);
  }, [formState, zones]);

  useEffect(() => {
    const totalCost = fare.price * parseInt(formState.rides);
    setCost(totalCost);
  }, [formState]);

  return (
    <Fragment>
      <section className="fare_widget">
        <div className="header">
          <img className="logo" src="./img/septa-logo.png" alt="Septa Logo" />
          <h1>Regional Rail Fares</h1>
        </div>
        <div className="form_field">
          <h1>Where Are You Going?</h1>
          <select
            className="dropdown"
            id="zoneSelect"
            name="zone"
            value={formState.zone}
            onChange={handleChange}
          >
            {zones.map((singleZone, index) => {
              return (
                <option key={`zone${index}`} value={singleZone.zone}>
                  {singleZone.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="form_field">
          <h1>When Are You Riding?</h1>
          <select
            className="dropdown"
            id="timeSelect"
            name="time"
            value={formState.time}
            onChange={handleChange}
          >
            {fareTypes.map((singleFare, index) => {
              return (
                <option key={`zone${index}`} value={singleFare.type}>
                  {singleFare.type}
                </option>
              );
            })}
          </select>
        </div>
        <div className="form_field">
          <h1>Where Will You Purchase the Fares?</h1>
          <label>
            Onboard
            <input
              type="radio"
              name="purchaseLocation"
              value="onboard_purchase"
              checked={formState.purchaseLocation === "onboard_purchase"}
              onChange={handleChange}
            />
          </label>
          <label>
            Advance
            <input
              type="radio"
              name="purchaseLocation"
              value="advance_purchase"
              checked={formState.purchaseLocation === "advance_purchase"}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="form_field">
          <h1>How Many Rides Will You Need?</h1>
          <input
            type="number"
            name="rides"
            value={formState.rides}
            onChange={handleChange}
          />
        </div>
        <div className="footer">
          <h1>Your Fare Will Cost</h1>
          <h1 className="total_cost">$ {cost}</h1>
        </div>
      </section>
    </Fragment>
  );
};

const domContainer = document.querySelector("#fare_widget_container");
ReactDOM.render(e(FareWidget), domContainer);
