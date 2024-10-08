import { FC } from "react";
import css from "./checklistInstanceChooser.module.scss";
import { useAppState } from "../contexts/appState";
import { randomId } from "../../utils";
import { useHomePageState } from "../contexts/homePage";
import ChecklistType from "../../types/checklist";

const ChecklistInstanceChooser: FC = () => {
  const { checklistsTemplates, setChecklistsTemplates } = useAppState();
  const { activeChecklistTemplateId, activeChecklistTemplate } =
    useHomePageState();

  const deleteActiveInstance = () => {
    const activeInstance = activeChecklistTemplate?.instances.find(
      (instance) => instance.id === activeChecklistTemplate.activeInstanceId
    );

    setChecklistsTemplates(
      checklistsTemplates.map((template: ChecklistType) =>
        template.id === activeChecklistTemplateId
          ? {
              ...template,
              instances: template.instances.filter(
                (instance) => instance.id !== activeInstance?.id
              ),
              activeInstanceId: "",
            }
          : template
      )
    );
  };

  const handleDeleteInstance = () => {
    const activeInstance = activeChecklistTemplate?.instances.find(
      (instance) => instance.id === activeChecklistTemplate.activeInstanceId
    );

    if (
      window.confirm(
        `Are you sure you want to delete '${activeInstance?.title}'?`
      )
    ) {
      deleteActiveInstance();
    }
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

    setChecklistsTemplates(
      checklistsTemplates.map((template: ChecklistType) =>
        template.id === activeChecklistTemplateId
          ? {
              ...template,
              instances: [
                ...template.instances,
                {
                  id: newId,
                  title: newInstanceName,
                  currentStepIndex: 0,
                  timesCompletedSteps: {},
                },
              ],
              activeInstanceId: newId,
            }
          : template
      )
    );
  };

  return (
    <div className={css.container}>
      <button
        disabled={activeChecklistTemplate == null}
        onClick={handleNewInstance}
      >
        New instance
      </button>
      <button
        disabled={
          activeChecklistTemplate == null ||
          activeChecklistTemplate.instances.length === 0
        }
        onClick={handleDeleteInstance}
      >
        X
      </button>
    </div>
  );
};

export default ChecklistInstanceChooser;
