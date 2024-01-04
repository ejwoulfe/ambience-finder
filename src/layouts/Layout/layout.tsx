import { Outlet } from "react-router-dom";

import { useEffect, useState } from "react";
import Navigation from "../../components/navigation/navigation";
import whiteHeadphones from "../../assets/white-headphones.svg";
import SearchBar from "../../components/search-bar/search-bar";

interface LayoutProps {
  focusModeActive: boolean;
}
export default function Layout(props: LayoutProps) {
  const [searchActive, setSearchActive] = useState<boolean>(false);
  const { focusModeActive } = props;

  return (
    <>
      {focusModeActive ? <div className="focus-overlay"></div> : null}
      <main>
        <Navigation />
        {searchActive ? (
          <span className="page__title">
            <img src={whiteHeadphones} alt="headphones" />
            <h1>Videos List</h1>
            <img src={whiteHeadphones} alt="headphones" />
          </span>
        ) : (
          <span className="page__title">
            <img src={whiteHeadphones} alt="headphones" />
            <h1>Ambience Finder</h1>
            <img src={whiteHeadphones} alt="headphones" />
          </span>
        )}

        <SearchBar setSearchActive={setSearchActive} />

        <Outlet />
      </main>
    </>
  );
}
