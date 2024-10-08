type ChecklistInstanceType = {
  id: string;
  title: string;
  currentStepIndex: number;
  timesCompletedSteps?: { [stepId: string]: number };
};

export default ChecklistInstanceType;
