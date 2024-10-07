import { createContext, useContext, FC, ReactNode, useState } from "react";
import { useAppState } from "./appState";
import ChecklistType from "../../types/checklist";

export enum AvailablePages {
  HomePage,
  SettingsPage,
}

type ContextType = {
  activeChecklistTemplate?: ChecklistType;
  activeChecklistTemplateId: string | undefined;
  setActiveChecklistTemplateId: (
    newActiveChecklistTemplateId: string | undefined
  ) => void;
};

export const HomePageContext = createContext<ContextType>({} as ContextType);

type Props = {
  children: ReactNode;
};

const HomePageContextProvider: FC<Props> = ({ children }) => {
  const { checklistsTemplates } = useAppState();

  const [activeChecklistTemplateId, setActiveChecklistTemplateId] =
    useState<string>();

  const activeChecklistTemplate = checklistsTemplates.find(
    (template) => template.id === activeChecklistTemplateId
  );

  return (
    <HomePageContext.Provider
      value={{
        activeChecklistTemplate,
        activeChecklistTemplateId,
        setActiveChecklistTemplateId,
      }}
    >
      {children}
    </HomePageContext.Provider>
  );
};

export default HomePageContextProvider;

export const useHomePageState = () => {
  return useContext(HomePageContext);
};
