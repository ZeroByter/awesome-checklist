import { createContext, useContext, FC, ReactNode, useState } from "react";
import Checklist from "../../types/checklist";

export enum AvailablePages {
  HomePage,
  SettingsPage,
}

type ContextType = {
  currentPage: AvailablePages;
  setCurrentPage: (newCurrentPage: AvailablePages) => void;

  checklistsTemplates: Checklist[];
  setChecklistsTemplates: (newChecklistsTemplates: Checklist[]) => void;

  checklistsInstances: Checklist[];
  setChecklistsInstances: (newChecklistsInstances: Checklist[]) => void;
};

export const AppStateContext = createContext<ContextType>({} as ContextType);

type Props = {
  children: ReactNode;
};

const AppStateContextProvider: FC<Props> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<AvailablePages>(
    AvailablePages.HomePage
  );

  const [checklistsTemplates, setChecklistsTemplates] = useState<Checklist[]>(
    []
  );

  const [checklistsInstances, setChecklistsInstances] = useState<Checklist[]>(
    []
  );

  return (
    <AppStateContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        checklistsTemplates,
        setChecklistsTemplates,
        checklistsInstances,
        setChecklistsInstances,
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
