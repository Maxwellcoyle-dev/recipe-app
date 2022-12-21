import React from "react";
import styles from "../../styles/statusComponents/statusComponents.module.css";
import { SpinnerCircular } from "spinners-react";

export const Loading = () => {
  return (
    <div className={styles.spinnerContainer}>
      <SpinnerCircular
        size={50}
        thickness={100}
        speed={100}
        color="rgb(242, 242, 242)"
        secondaryColor="rgb(115, 191, 134)"
      />
    </div>
  );
};
