import { FC } from "react";
import css from "./header.module.scss";
import { AvailablePages, useAppState } from "../contexts/appState";

const Header: FC = () => {
  const { currentPage, setCurrentPage } = useAppState();

  const gotoPage = (newPage: AvailablePages) => {
    return () => {
      setCurrentPage(newPage);
    };
  };

  const renderButtons =
    currentPage === AvailablePages.HomePage ? (
      <button onClick={gotoPage(AvailablePages.SettingsPage)}>Settings</button>
    ) : (
      <button onClick={gotoPage(AvailablePages.HomePage)}>Checklists</button>
    );

  return (
    <div className={css.container}>
      <div className={css.title}>Awesome Checklist</div>
      <div className={css.buttons}>{renderButtons}</div>
    </div>
  );
};

export default Header;
