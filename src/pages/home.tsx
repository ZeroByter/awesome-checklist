import { FC } from "react";
import ChecklistTemplatesDropdown from "../components/home/dropdowns/checklistsTemplates";
import ChecklistInstancesDropdown from "../components/home/dropdowns/checklistsInstances";
import css from "./home.module.scss";
import ChecklistInstanceChooser from "../components/home/checklistInstanceChooser";

const HomePage: FC = () => {
  const handleBackTask = () => {};

  const handleNextTask = () => {
    //TODO: move to next task in instance,
    //TODO: if already at next task and pressed, open confirm to delete task (and also change button text from 'next' to 'done')
  };

  return (
    <div className={css.container}>
      <div className={css.header}>
        <ChecklistTemplatesDropdown />
        <ChecklistInstancesDropdown />
        <ChecklistInstanceChooser />
      </div>
      <div className={css.tasks}>
        <div>test1</div>
        <div>test1</div>
        <div>test1</div>
        <div>test1</div>
        <div>test1</div>
        <div>test1</div>
        <div>test1</div>
        <div>test1</div>
        <div>test1</div>
        <div>test1</div>
        <div>test1</div>
        <div>test1</div>
        <div>test1</div>
      </div>
      <div className={css.buttons}>
        <button className={css.next} onClick={handleNextTask}>
          next
        </button>
        <button className={css.back} onClick={handleBackTask}>
          back
        </button>
      </div>
    </div>
  );
};

export default HomePage;
