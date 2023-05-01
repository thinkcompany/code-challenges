import React, { useContext } from "react";
import { AppContext } from "../App";

const HelperText = () => {
  const { data, infoType } = useContext(AppContext);
  return (
    // reformat string to match json props
    <p>
      {data &&
        data.info[
          infoType
            .split(" ")
            .map((word) => word.charAt(0).toLowerCase() + word.slice(1))
            .join(" ")
            .replace(" ", "_")
        ]}
    </p>
  );
};

export default HelperText;
