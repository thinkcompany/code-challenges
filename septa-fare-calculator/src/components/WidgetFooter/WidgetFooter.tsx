import styles from "./WidgetFooter.module.css";

type WidgetFooterProps = {
  price?: number;
};

const WidgetFooter = (props: WidgetFooterProps) => {
  return (
    <div className={styles.container}>
      <div>Your fare will cost:</div>
      {props.price ? <div>${props.price}</div> : null}
    </div>
  );
};

export default WidgetFooter;
