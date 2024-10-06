import { FC } from "react";
import css from "./checklistInstanceChooser.module.scss";

const ChecklistInstanceChooser: FC = () => {
  const handleDeleteInstance = () => {
    // TODO: delete actively selected instance - give instance name in confirm
  };

  const handleNewInstance = () => {
    const newInstanceName = prompt("New checklist name");
    console.log(newInstanceName);

    // TODO: Create new instance
  };

  return (
    <div className={css.container}>
      <button onClick={handleNewInstance}>New instance</button>
      <button onClick={handleDeleteInstance}>X</button>
    </div>
  );
};

export default ChecklistInstanceChooser;
