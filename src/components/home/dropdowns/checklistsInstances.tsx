import { ChangeEvent, FC } from "react";
import { useAppState } from "../../contexts/appState";
import { useHomePageState } from "../../contexts/homePage";
import css from "./style.module.scss";

const ChecklistInstancesDropdown: FC = () => {
  const { checklistsTemplates, setChecklistsTemplates } = useAppState();
  const { activeChecklistTemplate } = useHomePageState();

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setChecklistsTemplates(
      checklistsTemplates.map((template) =>
        template.id === activeChecklistTemplate?.id
          ? {
              ...template,
              activeInstanceId: e.target.value,
            }
          : template
      )
    );
  };

  const renderOptions = activeChecklistTemplate?.instances.map((instance) => {
    return (
      <option key={instance.id} value={instance.id}>
        {instance.title} -{" "}
        {activeChecklistTemplate.items[instance?.currentStepIndex].text}
      </option>
    );
  });

  return (
    <div className={css.container}>
      Instance:
      <select
        disabled={
          !activeChecklistTemplate ||
          activeChecklistTemplate?.instances.length === 0
        }
        value={activeChecklistTemplate?.activeInstanceId}
        onChange={handleSelectChange}
      >
        {renderOptions}
      </select>
    </div>
  );
};

export default ChecklistInstancesDropdown;
