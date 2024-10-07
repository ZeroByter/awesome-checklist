import { ChangeEvent, FC } from "react";
import ChecklistType from "../../types/checklist";
import { useAppState } from "../contexts/appState";
import css from "./checklist.module.scss";
import { randomId } from "../../utils";
import ChecklistItem from "./checklistItem";

type Props = {
  checklistTemplate: ChecklistType;
};

const Checklist: FC<Props> = ({ checklistTemplate }) => {
  const { checklistsTemplates, setChecklistsTemplates } = useAppState();

  const handleDeleteChecklistTemplate = () => {
    if (window.confirm("Are you sure you want to delete this checklist?")) {
      setChecklistsTemplates(
        checklistsTemplates.filter(
          (loopChecklistTemplate) =>
            loopChecklistTemplate.id !== checklistTemplate.id
        )
      );
    }
  };

  const handleNewItem = () => {
    const editedChecklistsTemplates = checklistsTemplates.map(
      (loopChecklistTemplate) => {
        if (loopChecklistTemplate.id === checklistTemplate.id) {
          return {
            ...loopChecklistTemplate,
            items: [
              ...loopChecklistTemplate.items,
              {
                id: randomId(),
                text: `New task`,
              },
            ],
          };
        } else {
          return loopChecklistTemplate;
        }
      }
    );

    setChecklistsTemplates(editedChecklistsTemplates);
  };

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const editedChecklistsTemplates = checklistsTemplates.map(
      (loopChecklistTemplate) => {
        if (loopChecklistTemplate.id === checklistTemplate.id) {
          return {
            ...loopChecklistTemplate,
            title: e.target.value,
          };
        } else {
          return loopChecklistTemplate;
        }
      }
    );

    setChecklistsTemplates(editedChecklistsTemplates);
  };

  const renderItems = checklistTemplate.items.map((item) => {
    return (
      <ChecklistItem
        key={item.id}
        checklistId={checklistTemplate.id}
        item={item}
      />
    );
  });

  return (
    <div className={css.container}>
      <div className={css.header}>
        <input
          placeholder="Title"
          value={checklistTemplate.title}
          onChange={handleTitleChange}
        />
        <button onClick={handleNewItem}>New Task</button>
        <button onClick={handleDeleteChecklistTemplate}>X</button>
      </div>
      <div className={css.items}>{renderItems}</div>
    </div>
  );
};

export default Checklist;
