import styles from "../../../styles/pages/protein_carb_fat/pages.module.css";
import { TiDelete } from "react-icons/ti";

export const FilterLabel = ({ label, id, setLabelIndex, labelIndex }) => {
  const handleLabelSelect = () => {
    if (id === labelIndex) {
      setLabelIndex(null);
    } else {
      setLabelIndex(id);
    }
  };

  return labelIndex === id ? (
    <div className={styles.selectedCardFilterLabel} onClick={handleLabelSelect}>
      <p>{label}</p>
      <TiDelete className={styles.closeIcon} />
    </div>
  ) : (
    <div className={styles.cardFilterLabel} onClick={handleLabelSelect}>
      <p>{label}</p>
    </div>
  );
};
