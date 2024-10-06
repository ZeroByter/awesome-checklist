import { FC } from "react";
import HomePage from "../../pages/home";
import { AvailablePages, useAppState } from "../contexts/appState";
import SettingsPage from "../../pages/settings";
import HomePageContextProvider from "../contexts/homePage";

const Router: FC = () => {
  const { currentPage } = useAppState();

  if (currentPage === AvailablePages.HomePage) {
    return (
      <HomePageContextProvider>
        <HomePage />
      </HomePageContextProvider>
    );
  } else {
    return <SettingsPage />;
  }
};

export default Router;
