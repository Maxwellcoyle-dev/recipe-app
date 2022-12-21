export const savedRecipesReducer = (savedRecipes, action) => {
  switch (action.type) {
    case "loacal-storage-recover-saved-list": {
      return action.recipe;
    }
    case "save-recipe": {
      const found = savedRecipes?.some(
        (rec) => rec.label === action.recipe.label
      );
      if (!found) {
        return [
          {
            id: Math.floor(Math.random() * 10000),
            recipe: action.recipe,
            note: "",
            showNoteBox: false,
          },
          ...savedRecipes,
        ];
      } else {
        return savedRecipes;
      }
    }

    case "delete-recipe": {
      console.log(action);
      return savedRecipes?.filter((rec) => rec.recipe.label !== action.label);
    }

    case "note-box-toggle": {
      return savedRecipes?.map((rec) => {
        if (rec.showNoteBox) {
          console.log(rec.showNoteBox);
          return { ...rec, showNoteBox: false };
        }
        if (rec.id === action.id) {
          return { ...rec, showNoteBox: true };
        }
        return rec;
      });
    }

    case "update-note": {
      return savedRecipes?.map((rec) => {
        if (rec.id === action.id) {
          return { ...rec, note: action.note };
        }
        return rec;
      });
    }

    case "clear-note": {
      return savedRecipes?.map((rec) => {
        if (rec.id === action.id) {
          return { ...rec, note: "", showEditView: false };
        }
        return rec;
      });
    }

    case "save-note": {
      return savedRecipes?.map((rec) => {
        if (rec.id === action.id) {
          return { ...rec, showNoteBox: false };
        }
        return rec;
      });
    }

    case "label-box-toggle": {
      return savedRecipes?.map((rec) => {
        if (rec.showLabelBox) {
          return { ...rec, showLabelBox: false };
        }
        if (rec.id === action.id) {
          return { ...rec, showLabelBox: true };
        }
        return rec;
      });
    }

    case "update-new-label": {
      console.log(action);
      return savedRecipes?.map((rec) => {
        if (rec.id === action.id) {
          return {
            ...rec,
            labels: [{ label: action.labelText, color: "" }, ...rec.labels],
          };
        }
        return rec;
      });
    }

    case "add-new-label": {
      return savedRecipes?.map((rec) => {
        if (rec.id === action.id) {
          return { ...rec, showLabelBox: false };
        }
        return rec;
      });
    }

    case "clear-label": {
      return savedRecipes?.map((rec) => {
        if (rec.label === action.recipe.label) {
          return { ...rec, note: "", showEditView: false };
        }
        return rec;
      });
    }
    default: {
      break;
    }
  }
};
