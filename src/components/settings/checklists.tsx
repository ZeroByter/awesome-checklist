import { FC } from "react";
import Checklist from "./checklist";
import { useAppState } from "../contexts/appState";
import { randomId } from "../../utils";
import css from "./checklists.module.scss";

const Checklists: FC = () => {
  const { checklistsTemplates, setChecklistsTemplates } = useAppState();

  const createNewChecklistTemplate = () => {
    setChecklistsTemplates([
      ...structuredClone(checklistsTemplates),
      {
        id: randomId(),
        title: "New checklist",
        items: [],
        activeInstanceId: "",
        instances: [],
      },
    ]);
  };

  const renderChecklistsTemplates = checklistsTemplates.map(
    (checklistTemplate) => {
      return (
        <Checklist
          key={checklistTemplate.id}
          checklistTemplate={checklistTemplate}
        />
      );
    }
  );

  return (
    <div className={css.container}>
      <div>
        <button onClick={createNewChecklistTemplate}>add</button>
      </div>
      <div className={css.checklistsTemplates}>{renderChecklistsTemplates}</div>
    </div>
  );
};

export default Checklists;
