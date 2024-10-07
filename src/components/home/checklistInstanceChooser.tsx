import { FC } from "react";
import css from "./checklistInstanceChooser.module.scss";
import { useAppState } from "../contexts/appState";
import { randomId } from "../../utils";
import { useHomePageState } from "../contexts/homePage";

const ChecklistInstanceChooser: FC = () => {
  const { checklistsTemplates, setChecklistsTemplates } = useAppState();
  const { activeChecklistTemplateId } = useHomePageState();

  const handleDeleteInstance = () => {
    // TODO: delete actively selected instance - show instance name in confirm
  };

  const handleNewInstance = () => {
    const newInstanceName = prompt("New checklist name");

    if (
      newInstanceName == null ||
      newInstanceName.replace(/ /g, "").length === 0
    ) {
      return;
    }

    const newId = randomId();

    const editedTemplates = structuredClone(checklistsTemplates);

    editedTemplates.map((template) =>
      template.id === activeChecklistTemplateId
        ? {
            ...template,
            instances: [
              ...template.instances,
              {
                id: newId,
                title: newInstanceName,
                currentStepIndex: 0,
              },
            ],
            activeInstanceId: newId,
          }
        : template
    );

    setChecklistsTemplates(editedTemplates);
  };

  return (
    <div className={css.container}>
      <button onClick={handleNewInstance}>New instance</button>
      <button onClick={handleDeleteInstance}>X</button>
    </div>
  );
};

export default ChecklistInstanceChooser;
