import { ChangeEvent, FC } from "react";
import ChecklistItemType from "../../types/checklistItem";
import css from "./checklistItem.module.scss";
import { useAppState } from "../contexts/appState";

type Props = {
  checklistId: string;
  item: ChecklistItemType;
};

const ChecklistItem: FC<Props> = ({ checklistId, item }) => {
  const { checklistsTemplates, setChecklistsTemplates } = useAppState();

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const editedChecklistsTemplates = checklistsTemplates.map(
      (loopChecklistTemplate) => {
        if (loopChecklistTemplate.id === checklistId) {
          return {
            ...loopChecklistTemplate,
            items: loopChecklistTemplate.items.map((loopItem) => {
              if (loopItem.id === item.id) {
                return { ...loopItem, text: e.target.value };
              } else {
                return loopItem;
              }
            }),
          };
        } else {
          return loopChecklistTemplate;
        }
      }
    );

    setChecklistsTemplates(editedChecklistsTemplates);
  };

  const handleDelete = () => {
    const editedChecklistsTemplates = checklistsTemplates.map(
      (loopChecklistTemplate) => {
        if (loopChecklistTemplate.id === checklistId) {
          return {
            ...loopChecklistTemplate,
            items: loopChecklistTemplate.items.filter(
              (loopItem) => loopItem.id !== item.id
            ),
          };
        } else {
          return loopChecklistTemplate;
        }
      }
    );

    setChecklistsTemplates(editedChecklistsTemplates);
  };

  return (
    <div className={css.container}>
      <input
        placeholder="Title"
        value={item.text}
        onChange={handleTitleChange}
      />
      <button onClick={handleDelete}>X</button>
    </div>
  );
};

export default ChecklistItem;
