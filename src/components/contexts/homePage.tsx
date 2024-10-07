import {
  createContext,
  useContext,
  FC,
  ReactNode,
  useState,
  useRef,
  useEffect,
} from "react";
import { useAppState } from "./appState";
import ChecklistType from "../../types/checklist";

const LOCAL_STORAGE_KEY = "ac_home_page_state";

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
  const enableSavingRef = useRef(false);

  const { checklistsTemplates } = useAppState();

  const [activeChecklistTemplateId, setActiveChecklistTemplateId] =
    useState<string>();

  useEffect(() => {
    const timeoutHandle = window.setTimeout(() => {
      enableSavingRef.current = true;
    }, 100);

    return () => {
      window.clearTimeout(timeoutHandle);
    };
  }, []);

  useEffect(() => {
    setActiveChecklistTemplateId(
      window.localStorage.getItem(LOCAL_STORAGE_KEY) ?? ""
    );
  }, []);

  useEffect(() => {
    if (enableSavingRef.current) {
      window.localStorage.setItem(
        LOCAL_STORAGE_KEY,
        activeChecklistTemplateId ?? ""
      );
    }
  }, [activeChecklistTemplateId]);

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
