import { useContext, useState } from "react";
import styles from "../../../styles/pages/myRecipes/myRecipes.module.css";
import { myRecipesContext } from "../../../context/myRecipesContext";

export const CardFilterLabel = ({ label, color, id }) => {
  const [hover, setHover] = useState(false);
  const { selectedLabel, setSelectedLabel } = useContext(myRecipesContext);

  const handleLabelSelect = () => {
    if (id === selectedLabel) {
      setSelectedLabel(null);
    } else {
      setSelectedLabel(id);
    }
  };

  return (
    <div
      className={styles.cardFilterLabel}
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={handleLabelSelect}
      style={{ borderColor: hover || (selectedLabel === id && color.hex) }}
    >
      <p style={{ color: color.hex }}>{label}</p>
    </div>
  );
};
