import { ChangeEvent, FC } from "react";
import { useAppState } from "../../contexts/appState";
import { useHomePageState } from "../../contexts/homePage";
import css from "./style.module.scss";

const ChecklistInstancesDropdown: FC = () => {
  const { checklistsInstances } = useAppState();
  const { activeChecklistInstance, setActiveChecklistInstance } =
    useHomePageState();

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setActiveChecklistInstance(e.target.value);
  };

  const renderOptions = checklistsInstances.map((option) => {
    return (
      <option key={option.id} value={option.id}>
        {option.title}
      </option>
    );
  });

  return (
    <div className={css.container}>
      <select
        disabled={checklistsInstances.length === 0}
        value={activeChecklistInstance}
        onChange={handleSelectChange}
      >
        {renderOptions}
      </select>
    </div>
  );
};

export default ChecklistInstancesDropdown;
