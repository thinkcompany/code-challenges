import React, { useEffect, useState, createContext } from "react";
import "./App.css";
import {
  Header,
  Section,
  Price,
  Dropdown,
  Radio,
  Input,
  HelperText,
} from "./components";

const AppContext = createContext(undefined);

const App = () => {
  const [data, setData] = useState(null);
  const [zone, setZone] = useState("");
  const [infoType, setInfoType] = useState("");
  const [purchaseType, setPurchaseType] = useState("");
  const [tickets, setTickets] = useState(1);
  const [price, setPrice] = useState(0);
  const url =
    "https://raw.githubusercontent.com/thinkcompany/code-challenges/master/septa-fare-calculator/fares.json";

  // Initialize application and set data
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          setData(data);
          setZone(data.zones[0].name);
          setInfoType(Object.keys(data.info)[0]);
          setPurchaseType("Station Kiosk");
          // Ran out of time. Ideally find the index of the fare for the ride time selected
          setTickets(data.zones[0].fares[4].trips);
          setPrice(data.zones[0].fares[4].price);
        } else {
          throw new Error("There was an error processing your request.");
        }
      } catch (error) {
        console.log("Fetch error: ", error);
      }
    })();
  }, []);

  // Calculate price on update to form fields
  useEffect(() => {
    if (zone && infoType && purchaseType && tickets) {
      const selectedZone = data.zones.filter((item) => item.name === zone);
      const selectedPurchase =
        purchaseType === "Station Kiosk"
          ? "advance_purchase"
          : "onboard_purchase";

      if (selectedZone) {
        // Price is independent of purchase type when riding time is set to "Anytime"
        const price =
          infoType === "Anytime" || infoType === "anytime"
            ? selectedZone[0].fares.filter(
                (item) =>
                  item.type ===
                  infoType
                    .split(" ")
                    .map((word) => word.charAt(0).toLowerCase() + word.slice(1))
                    .join(" ")
                    .replace(" ", "_")
              )[0].price
            : selectedZone[0].fares.filter(
                (item) =>
                  item.type ===
                    infoType
                      .split(" ")
                      .map(
                        (word) => word.charAt(0).toLowerCase() + word.slice(1)
                      )
                      .join(" ")
                      .replace(" ", "_") && item.purchase === selectedPurchase
              )[0].price;

        // Set price and trips to max when ride time is set to "Anytime"
        if (infoType === "Anytime" || infoType === "anytime") {
          setTickets(10);
          setPrice(price);
        } else {
          setPrice(price * tickets);
        }
      }
    }
  }, [zone, infoType, purchaseType, tickets, data, price]);

  return (
    <div className="App">
      <div className="App-form">
        {/* Control app state with createContext/useContext hooks */}
        <AppContext.Provider
          value={{
            data,
            zone,
            setZone,
            infoType,
            setInfoType,
            purchaseType,
            setPurchaseType,
            tickets,
            setTickets,
            price,
            setPrice,
            url,
          }}
        >
          <Header />
          <Section prompt="Where are you going?">
            <Dropdown type="zone" />
          </Section>
          <Section prompt="When are you riding?">
            <Dropdown type="info" />
            <HelperText />
          </Section>
          <Section prompt="Where will you purchase the fare?">
            <Radio value="Station Kiosk" id="kiosk" />
            <Radio value="Onboard" id="onboard" />
          </Section>
          <Section prompt="How many rides will you need?">
            <Input />
          </Section>
          <Price price={price} />
        </AppContext.Provider>
      </div>
    </div>
  );
};

export default App;
export { AppContext };
