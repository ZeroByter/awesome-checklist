import { ChangeEvent, FC } from "react";
import { useAppState } from "../../contexts/appState";
import { useHomePageState } from "../../contexts/homePage";
import css from "./style.module.scss";

const ChecklistTemplatesDropdown: FC = () => {
  const { checklistsTemplates } = useAppState();
  const { activeChecklistTemplateId, setActiveChecklistTemplateId } =
    useHomePageState();

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setActiveChecklistTemplateId(e.target.value);
  };

  const renderOptions = checklistsTemplates.map((option) => {
    return (
      <option key={option.id} value={option.id}>
        {option.title}
      </option>
    );
  });

  return (
    <div className={css.container}>
      Checklist:
      <select
        disabled={checklistsTemplates.length === 0}
        value={activeChecklistTemplateId}
        onChange={handleSelectChange}
      >
        {renderOptions}
      </select>
    </div>
  );
};

export default ChecklistTemplatesDropdown;
