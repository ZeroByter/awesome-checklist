import { FC, useEffect } from "react";
import ChecklistTemplatesDropdown from "../components/home/dropdowns/checklistsTemplates";
import ChecklistInstancesDropdown from "../components/home/dropdowns/checklistsInstances";
import css from "./home.module.scss";
import ChecklistInstanceChooser from "../components/home/checklistInstanceChooser";
import { useAppState } from "../components/contexts/appState";
import { useHomePageState } from "../components/contexts/homePage";
import ChecklistTask from "../components/home/task";

const HomePage: FC = () => {
  const { checklistsTemplates, setChecklistsTemplates } = useAppState();
  const {
    activeChecklistTemplate,
    activeChecklistTemplateId,
    setActiveChecklistTemplateId,
  } = useHomePageState();

  useEffect(() => {
    if (!activeChecklistTemplateId && checklistsTemplates.length > 0) {
      setActiveChecklistTemplateId(checklistsTemplates[0].id);
    }
  }, [
    activeChecklistTemplateId,
    checklistsTemplates,
    setActiveChecklistTemplateId,
  ]);

  const activeChecklistInstance = activeChecklistTemplate?.instances.find(
    (instance) => instance.id === activeChecklistTemplate.activeInstanceId
  );

  useEffect(() => {
    if (
      activeChecklistTemplate &&
      activeChecklistTemplate.instances.length > 0 &&
      activeChecklistInstance == null
    ) {
      setChecklistsTemplates(
        checklistsTemplates.map((template) =>
          template.id === activeChecklistTemplate?.id
            ? {
                ...template,
                activeInstanceId: activeChecklistTemplate.instances[0].id,
              }
            : template
        )
      );
    }
  }, [
    activeChecklistInstance,
    activeChecklistTemplate,
    checklistsTemplates,
    setChecklistsTemplates,
  ]);

  const handleBackTask = () => {
    setChecklistsTemplates(
      checklistsTemplates.map((template) =>
        template.id === activeChecklistTemplateId
          ? {
              ...template,
              instances: template.instances.map((instance) =>
                instance.id === template.activeInstanceId
                  ? {
                      ...instance,
                      currentStepIndex: Math.max(
                        0,
                        (instance.currentStepIndex - 1) %
                          activeChecklistTemplate!.items.length
                      ),
                    }
                  : instance
              ),
            }
          : template
      )
    );
  };

  const handleNextTask = () => {
    if (
      activeChecklistInstance?.currentStepIndex ===
      activeChecklistTemplate!.items.length - 1
    ) {
      if (
        window.confirm(
          `Checklist done! Delete '${activeChecklistInstance.title}'?`
        )
      ) {
        setChecklistsTemplates(
          checklistsTemplates.map((template) =>
            template.id === activeChecklistTemplateId
              ? {
                  ...template,
                  instances: template.instances.filter(
                    (instance) => instance.id !== template.activeInstanceId
                  ),
                  activeInstanceId: "",
                }
              : template
          )
        );
      }

      return;
    }

    setChecklistsTemplates(
      checklistsTemplates.map((template) =>
        template.id === activeChecklistTemplateId
          ? {
              ...template,
              instances: template.instances.map((instance) =>
                instance.id === template.activeInstanceId
                  ? {
                      ...instance,
                      currentStepIndex:
                        (instance.currentStepIndex + 1) %
                        activeChecklistTemplate!.items.length,
                    }
                  : instance
              ),
            }
          : template
      )
    );
  };

  const activeTaskIndex = activeChecklistInstance?.currentStepIndex ?? -1;

  const renderTasks = activeChecklistTemplate?.items.map((task, index) => {
    return (
      <ChecklistTask
        key={task.id}
        task={task}
        index={index}
        activeTaskIndex={activeTaskIndex}
      />
    );
  });

  return (
    <div className={css.container}>
      <div className={css.header}>
        <ChecklistTemplatesDropdown />
        <ChecklistInstancesDropdown />
        <ChecklistInstanceChooser />
      </div>
      <div className={css.tasks}>{renderTasks}</div>
      <div className={css.buttons}>
        <button
          disabled={activeChecklistInstance == null}
          className={css.back}
          onClick={handleBackTask}
        >
          back
        </button>
        <button
          disabled={activeChecklistInstance == null}
          className={css.next}
          onClick={handleNextTask}
        >
          next
        </button>
      </div>
    </div>
  );
};

export default HomePage;
