const WidgetForm = () => {
  return (
    <div>
      <div>
        {/* data.zones.zone */}
        <p>Where are you going?</p>
        <select name={"zone"}>
          <option value="1">Zone 1</option>
          <option value="2">Zone 2</option>
          <option value="3">Zone 3</option>
          <option value="4">Zone 4</option>
          <option value="5">Zone 5</option>
        </select>
      </div>
      <div>
        {/* data.zones.zone["zone"].fares.type */}
        <p>When are you riding?</p>
        <select name={"time"}>
          <option value="1">times</option>
        </select>
      </div>
      <div>
        {/* data.zones.zone["zone"].fares.purchase */}
        <p>Where will you purchase the fare?</p>
        <input
          type="radio"
          id="advanced_purchase"
          name="fare_purchase"
          value="advanced_purchase"
        />
        <label htmlFor="advanced_purchase">Station Kiosk</label>
        <input
          type="radio"
          id="onboard_purchase"
          name="fare_purchase"
          value="onboard_purchase"
        />
        <label htmlFor="onboard_purchase">Onboard</label>
      </div>
      <div>
        {/* data.zones.zone["zone"].fares.trips */}
        <p>How many rides will you need?</p>
        <input value="" />
      </div>
    </div>
  );
};

export default WidgetForm;
