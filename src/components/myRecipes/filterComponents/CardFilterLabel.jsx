import { useContext } from "react";
import styles from "../../../styles/pages/myRecipes/myRecipes.module.css";
import { myRecipesContext } from "../../../context/myRecipesContext";
import { TiDelete } from "react-icons/ti";

export const CardFilterLabel = ({ label, id }) => {
  const { selectedLabel, setSelectedLabel } = useContext(myRecipesContext);

  const handleLabelSelect = () => {
    if (id === selectedLabel) {
      setSelectedLabel(null);
    } else {
      setSelectedLabel(id);
    }
  };

  return id === selectedLabel ? (
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
