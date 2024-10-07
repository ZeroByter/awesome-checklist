import {
  createContext,
  useContext,
  FC,
  ReactNode,
  useState,
  useEffect,
  useRef,
} from "react";
import ChecklistType from "../../types/checklist";
import { randomId } from "../../utils";

const LOCAL_STORAGE_KEY = "ac_app_state";

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
  const enableSavingRef = useRef(false);

  const [currentPage, setCurrentPage] = useState<AvailablePages>(
    AvailablePages.HomePage
  );

  const [checklistsTemplates, setChecklistsTemplates] = useState<
    ChecklistType[]
  >([]);

  useEffect(() => {
    const timeoutHandle = window.setTimeout(() => {
      enableSavingRef.current = true;
    }, 100);

    return () => {
      window.clearTimeout(timeoutHandle);
    };
  }, []);

  useEffect(() => {
    const localStorageData = window.localStorage.getItem(LOCAL_STORAGE_KEY);

    if (!localStorageData) {
      setChecklistsTemplates([
        {
          id: randomId(),
          title: "Checklist #1",
          items: [
            {
              id: randomId(),
              text: "Task #1",
            },
            {
              id: randomId(),
              text: "Task #2",
            },
            {
              id: randomId(),
              text: "Task #3",
            },
          ],
          instances: [],
          activeInstanceId: "",
        },
        {
          id: randomId(),
          title: "Checklist #2",
          items: [
            {
              id: randomId(),
              text: "A single task",
            },
          ],
          instances: [],
          activeInstanceId: "",
        },
      ]);

      console.log("test");
      return;
    }

    setChecklistsTemplates(JSON.parse(localStorageData ?? "[]"));
  }, []);

  useEffect(() => {
    if (enableSavingRef.current) {
      window.localStorage.setItem(
        LOCAL_STORAGE_KEY,
        JSON.stringify(checklistsTemplates)
      );
    }
  }, [checklistsTemplates]);

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
