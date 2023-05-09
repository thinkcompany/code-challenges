import { useState } from "react";
import WidgetFooter from "../WidgetFooter/WidgetFooter";
import WidgetForm from "../WidgetForm/WidgetForm";
import WidgetHeader from "../WidgetHeader/WidgetHeader";
import styles from "./Widget.module.css";

const Widget = () => {
  const [price, setPrice] = useState<number>();

  const handlePriceChange = (newPrice: number) => {
    setPrice(newPrice);
  };

  return (
    <div className={styles.container}>
      <WidgetHeader />
      <WidgetForm handlePriceChange={handlePriceChange} />
      <WidgetFooter price={price} />
    </div>
  );
};

export default Widget;
