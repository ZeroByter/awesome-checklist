import { createContext, useContext, FC, ReactNode, useState } from "react";
import ChecklistType from "../../types/checklist";
import ChecklistInstanceType from "../../types/checklistInstance";

export enum AvailablePages {
  HomePage,
  SettingsPage,
}

type ContextType = {
  currentPage: AvailablePages;
  setCurrentPage: (newCurrentPage: AvailablePages) => void;

  checklistsTemplates: ChecklistType[];
  setChecklistsTemplates: (newChecklistsTemplates: ChecklistType[]) => void;
};

export const AppStateContext = createContext<ContextType>({} as ContextType);

type Props = {
  children: ReactNode;
};

const AppStateContextProvider: FC<Props> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<AvailablePages>(
    AvailablePages.HomePage
  );

  const [checklistsTemplates, setChecklistsTemplates] = useState<
    ChecklistType[]
  >([]);

  return (
    <AppStateContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        checklistsTemplates,
        setChecklistsTemplates,
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
};

export default AppStateContextProvider;

export const useAppState = () => {
  return useContext(AppStateContext);
};
