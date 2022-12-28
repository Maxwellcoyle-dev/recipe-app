import { useContext, useState } from "react";
import styles from "../../../styles/pages/myRecipes/myRecipes.module.css";
import { myRecipesContext } from "../../../context/myRecipesContext";
import { TiDelete } from "react-icons/ti";

export const CardFilterLabel = ({ label, id }) => {
  const [hover, setHover] = useState(false);
  const { selectedLabel, setSelectedLabel } = useContext(myRecipesContext);

  const handleLabelSelect = () => {
    if (id === selectedLabel) {
      setSelectedLabel(null);
    } else {
      setSelectedLabel(id);
    }
  };

  return id === selectedLabel ? (
    <div
      className={styles.selectedCardFilterLabel}
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={handleLabelSelect}
    >
      <p>{label}</p>
      <TiDelete className={styles.closeIcon} />
    </div>
  ) : (
    <div
      className={styles.cardFilterLabel}
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={handleLabelSelect}
    >
      <p>{label}</p>
    </div>
  );
};
