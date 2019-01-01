import * as React from "react";
import { IInfo, IZone } from "../../domain";
import { getTotalPrice, PurchaseOption, TypeOption } from "../services/fares";
import "./App.css";

interface IState {
  info?: IInfo | null;
  zones: IZone[];
  selectedZone: number;
  selectedType: string;
  selectedPurchaseType: string;
  ridesCount?: number;
}

class App extends React.Component<{}, IState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      ridesCount: 1,
      selectedPurchaseType: PurchaseOption.Advance,
      selectedType: TypeOption.Anytime,
      selectedZone: 1,
      zones: []
    };
  }

  public componentDidMount() {
    fetch("/data/fares.json")
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            info: result.info,
            zones: result.zones
          });
        },
        error => {
          alert("Unable to load data");
        }
      );
  }

  public onZoneChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      selectedZone: Number(event.target.value)
    });
  };

  public onRidesCountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      ridesCount: event.target.value.length
        ? Number(event.target.value)
        : undefined
    });
  };

  public onTimeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      selectedType: event.target.value
    });
  };

  public onPurchaseChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      selectedPurchaseType: event.target.value
    });
  };

  public render() {
    const totalPrice = getTotalPrice(this.state.zones, {
      ridesCount: this.state.ridesCount,
      selectedPurchaseType: this.state.selectedPurchaseType,
      selectedType: this.state.selectedType,
      selectedZone: this.state.selectedZone
    });

    return (
      <div className="app">
        <header className="app-header">Regional Rail Fares</header>
        <div className="form-container">
          <div className="form-section">
            <h2>Where are you going?</h2>
            <div className="dropdown-menu">
              <select
                value={this.state.selectedZone}
                onChange={this.onZoneChange}
              >
                {this.state.zones &&
                  this.state.zones.map(zone => (
                    <option key={zone.zone} value={zone.zone}>
                      {zone.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>
          <div className="form-section">
            <h2>When are you riding?</h2>
            <div className="dropdown-menu">
              <select
                value={this.state.selectedType}
                onChange={this.onTimeChange}
              >
                <option value={TypeOption.Anytime}>Anytime</option>
                <option value={TypeOption.Weekday}>Weekdays</option>
                <option value={TypeOption.EveningWeekend}>
                  Evening weekends
                </option>
              </select>
            </div>
            {this.state.info && (
              <p className="info-text">
                {this.state.info[this.state.selectedType]}
              </p>
            )}
          </div>
          <div className="form-section">
            <h2>Where will you purchase the fair?</h2>
            <div className="shop-select">
              <div>
                <input
                  type="radio"
                  name="purschase"
                  id={PurchaseOption.Advance}
                  value={PurchaseOption.Advance}
                  checked={
                    this.state.selectedPurchaseType === PurchaseOption.Advance
                  }
                  onChange={this.onPurchaseChange}
                />
                <label htmlFor={PurchaseOption.Advance}>Station Kiosk</label>
              </div>
              <div>
                <input
                  type="radio"
                  name="purchase"
                  id={PurchaseOption.Onboard}
                  value={PurchaseOption.Onboard}
                  checked={
                    this.state.selectedPurchaseType === PurchaseOption.Onboard
                  }
                  onChange={this.onPurchaseChange}
                />
                <label htmlFor={PurchaseOption.Onboard}>Onboard</label>
              </div>
            </div>
          </div>
          <div className="form-section">
            <h2>How many rides will you need?</h2>
            <input
              className="rides-count"
              type="number"
              min="1"
              value={this.state.ridesCount ? this.state.ridesCount : ""}
              onChange={this.onRidesCountChange}
            />
            <p className="info-text">
              A 10-Trip Ticket saves money and adds convenience
            </p>
          </div>
        </div>
        <div className="result">
          <h2 className="total-price-text">Your fair will cost</h2>
          <div className="total-price">
            {totalPrice ? `$${totalPrice}` : ""}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
