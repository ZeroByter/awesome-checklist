import { createContext, useContext, FC, ReactNode, useState } from "react";

export enum AvailablePages {
  HomePage,
  SettingsPage,
}

type ContextType = {
  activeChecklistTemplate: string | undefined;
  setActiveChecklistTemplate: (newActiveChecklistTemplate: string) => void;

  activeChecklistInstance: string | undefined;
  setActiveChecklistInstance: (newActiveChecklistInstance: string) => void;
};

export const HomePageContext = createContext<ContextType>({} as ContextType);

type Props = {
  children: ReactNode;
};

const HomePageContextProvider: FC<Props> = ({ children }) => {
  const [activeChecklistTemplate, setActiveChecklistTemplate] =
    useState<string>();

  const [activeChecklistInstance, setActiveChecklistInstance] =
    useState<string>();

  return (
    <HomePageContext.Provider
      value={{
        activeChecklistTemplate,
        setActiveChecklistTemplate,

        activeChecklistInstance,
        setActiveChecklistInstance,
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
