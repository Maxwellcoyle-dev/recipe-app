import { useState } from "react";
import styles from "../../../styles/pages/protein_carb_fat/pages.module.css";

export const FilterLabel = ({
  label,
  color,
  id,
  setLabelIndex,
  labelIndex,
}) => {
  const [hover, setHover] = useState(false);

  const handleLabelSelect = () => {
    if (id === labelIndex) {
      setLabelIndex(null);
    } else {
      setLabelIndex(id);
    }
  };

  return (
    <div
      className={styles.cardFilterLabel}
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={handleLabelSelect}
      style={{ borderColor: hover || (labelIndex === id && color.hex) }}
    >
      <p style={{ color: color.hex }}>{label}</p>
    </div>
  );
};
