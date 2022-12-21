import React from "react";
import styles from "../../../styles/pages/myRecipes/myRecipes.module.css";
import { ColorItem } from "./ColorItem";

export const LabelColorPicker = () => {
  const colors = [
    { color: "yellow", hex: "#ffff00" },
    { color: "limeGreen", hex: "#32cd32" },
    { color: "green", hex: "#008000" },
    { color: "blue", hex: "#0000ff" },
    { color: "darkBlue", hex: "#00008b" },
    { color: "purple", hex: "#800080" },
    { color: "pink", hex: "#ffc0cb" },
    { color: "gray", hex: "#808080" },
    { color: "red", hex: "#ff0000" },
  ];

  return (
    <div className={styles.colorPicker}>
      <h4>Pick a color</h4>
      <div className={styles.colorPickerSelectors}>
        {colors.map((item, index) => {
          return <ColorItem color={item} key={index} />;
        })}
      </div>
    </div>
  );
};
