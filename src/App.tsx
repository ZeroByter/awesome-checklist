import { FC } from "react";
import AppStateContextProvider from "./components/contexts/appState";
import Header from "./components/shared/header";
import Router from "./components/shared/router";
import css from "./app.module.scss";

const App: FC = () => {
  return (
    <AppStateContextProvider>
      <div className={css.container}>
        <Header />
        <Router />
      </div>
    </AppStateContextProvider>
  );
};

export default App;
