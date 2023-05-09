import { useForm } from "react-hook-form";
import useApi from "../../hooks/useApi";
import { Info } from "../../fares";
import { useEffect } from "react";
import styles from "./WidgetForm.module.css";

type WidgetFormProps = {
  handlePriceChange?: (newPrice: number) => void;
};

type FareSubmission = {
  zone: number;
  time: Info;
  farePurchase: string;
  trips: number;
};

const WidgetForm = (props: WidgetFormProps) => {
  //react-hook-form handles state, onChange, onSubmit, and validation seamlessly
  const { register, watch } = useForm<FareSubmission>();

  const { data } = useApi();

  useEffect(() => {
    console.log("data from api hook", data);
  }, [data]);

  //these are state variables handled by react-hook-form
  const zone = watch("zone");
  const time = watch("time");
  const farePurchase = watch("farePurchase");
  const trips = watch("trips");

  //whenever the variables change, I want a new price
  useEffect(() => {
    if (data && zone && time && farePurchase && trips) {
      console.log(
        "all data filled out in form: ",
        zone,
        time,
        farePurchase,
        trips
      );
      //find the selected zone
      //const _zone = data.zones[zone - 1];
      //find the fare with the type and purchase of what was selected
      //find the the price and trips from results
      //use input trips and multiply by price to get result
      //set final result in parent
      //props.handlePriceChange(finalPrice)
    }
  }, [data, zone, time, farePurchase, trips]);

  return (
    <form className={styles.container}>
      <div>
        {/* data.zones.zone */}
        <p>Where are you going?</p>
        <select {...register("zone")}>
          {data?.zones.map((z) => {
            return (
              <option key={z.zone} value={z.zone}>
                {z.name}
              </option>
            );
          })}
        </select>
      </div>
      <div>
        {/* data.zones[zone].fares.type */}
        {/* come back and remove duplicate values */}
        <p>When are you riding?</p>
        <select {...register("time")}>
          {data && data.zones && zone ? (
            data.zones[zone - 1].fares.map((fare, key) => {
              return (
                <option key={key} value={fare.type}>
                  {fare.type}
                </option>
              );
            })
          ) : (
            <option>Please select a zone</option>
          )}
        </select>
        {/* type error with time - come back to it */}
        {/* {time ? <p>{data?.info[time]}</p> : null} */}
      </div>
      <div className={styles.purchase}>
        {/* data.zones["zone"].fares.purchase */}
        <p>Where will you purchase the fare?</p>
        <div className={styles["radio-container"]}>
          <div>
            <input
              {...register("farePurchase")}
              type="radio"
              id="advanced_purchase"
              value="advanced_purchase"
            />
            <label htmlFor="advanced_purchase">Station Kiosk</label>
          </div>
          <div>
            <input
              {...register("farePurchase")}
              type="radio"
              id="onboard_purchase"
              value="onboard_purchase"
            />
            <label htmlFor="onboard_purchase">Onboard</label>
          </div>
        </div>
      </div>
      <div>
        {/* data.zones["zone"].fares.trips */}
        <p>How many rides will you need?</p>
        <input {...register("trips")} type="text" id="trips" />
      </div>
    </form>
  );
};

export default WidgetForm;
