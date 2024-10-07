import { FC } from "react";
import ChecklistItemType from "../../types/checklistItem";
import css from "./task.module.scss";

type Props = {
  task: ChecklistItemType;
  index: number;
  activeTaskIndex: number;
};

const ChecklistTask: FC<Props> = ({ task, index, activeTaskIndex }) => {
  const renderText =
    index === activeTaskIndex
      ? `${index + 1}. 👉 ${task.text} 👈`
      : `${index + 1}. ${task.text}`;

  return (
    <div
      key={task.id}
      className={css.container}
      data-complete={index < activeTaskIndex}
      data-active={index === activeTaskIndex}
    >
      {renderText}
    </div>
  );
};

export default ChecklistTask;
