import ChecklistInstanceType from "./checklistInstance";
import ChecklistItemType from "./checklistItem";

type ChecklistType = {
  id: string;
  title: string;
  items: ChecklistItemType[];

  activeInstanceId: string;
  instances: ChecklistInstanceType[];
};

export default ChecklistType;
