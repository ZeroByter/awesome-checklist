import { FC } from "react";
import ChecklistItemType from "../../types/checklistItem";
import css from "./task.module.scss";
import { useHomePageState } from "../contexts/homePage";
import classNames from "classnames";

type Props = {
  task: ChecklistItemType;
  index: number;
  activeTaskIndex: number;
};

const ChecklistTask: FC<Props> = ({ task, index, activeTaskIndex }) => {
  const { activeChecklistTemplate } = useHomePageState();

  const activeChecklistInstance = activeChecklistTemplate?.instances.find(
    (instance) => instance.id === activeChecklistTemplate.activeInstanceId
  );

  const timeCompletedTask = activeChecklistInstance?.timesCompletedSteps
    ? activeChecklistInstance?.timesCompletedSteps[task.id]
    : undefined;

  return (
    <div
      key={task.id}
      className={css.container}
      data-complete={index < activeTaskIndex}
      data-active={index === activeTaskIndex}
    >
      <div>{index + 1}. </div>
      {activeTaskIndex !== index || (
        <div className={css.emojiContainer}>
          <div className={classNames(css.fingerEmoji, css.firstFingerEmoji)}>
            👉
          </div>
        </div>
      )}
      <div className={css.text}>{task.text}</div>
      {activeTaskIndex !== index || (
        <div className={css.emojiContainer}>
          <div className={css.fingerEmoji}>👈</div>
        </div>
      )}
      <div className={css.spacer}></div>
      <div className={css.timeCompleted}>
        {timeCompletedTask
          ? new Date(timeCompletedTask).toLocaleTimeString()
          : undefined}
      </div>
    </div>
  );
};

export default ChecklistTask;
