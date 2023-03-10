import { toast } from "react-toastify";

const recipeSaved = () => {
  toast.success("Recipe saved ♥", {
    toastId: "saved",
    draggable: true,
    closeOnClick: true,
  });
};

const recipeDeleted = () => {
  toast.success("Recipe deleted", {
    toastId: "deleted",
    draggable: true,
    closeOnClick: true,
  });
};

const noteAdded = () => {
  toast.success("Note saved ++ ", {
    toastId: "note-added",
    draggable: true,
    closeOnClick: true,
  });
};

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
        recipeSaved();
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
      return savedRecipes?.filter((rec) => {
        recipeDeleted();
        return rec.recipe.label !== action.label;
      });
    }

    case "note-box-toggle": {
      console.log(action);
      return savedRecipes?.map((rec) => {
        if (rec.showNoteBox) {
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
          noteAdded();
          return { ...rec, showNoteBox: false };
        }
        return rec;
      });
    }

    default: {
      break;
    }
  }
};
