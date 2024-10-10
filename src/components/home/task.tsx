import { FC } from "react";
import ChecklistItemType from "../../types/checklistItem";
import css from "./task.module.scss";
import { useHomePageState } from "../contexts/homePage";
import classNames from "classnames";
import pointLeft from "../../imgs/emojis/point_left.webp";
import pointRight from "../../imgs/emojis/point_right.webp";

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
        <img
          src={pointRight}
          alt="Point right"
          className={classNames(css.fingerEmoji, css.firstFingerEmoji)}
        />
      )}
      <div className={css.text}>{task.text}</div>
      {activeTaskIndex !== index || (
        <img src={pointLeft} alt="Point left" className={css.fingerEmoji} />
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
