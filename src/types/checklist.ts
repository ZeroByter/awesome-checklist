import ChecklistItemType from "./checklistItem";

type ChecklistType = {
  id: string;
  title: string;
  items: ChecklistItemType[];
};

export default ChecklistType;
